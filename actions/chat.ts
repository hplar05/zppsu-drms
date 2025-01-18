'use server'

import { authOptions } from '@/src/lib/auth'
import {  PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'

type Message = {
  id: string
  content: string
  senderId: string
  createdAt: Date
  sender: {
    name: string
    role: string
  }
}


const prisma = new PrismaClient()

export async function getNonAdminUsers() {
  const nonAdminUsers = await prisma.user.findMany({
    where: {
      role: { not: 'ADMIN' },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })
  return nonAdminUsers
}

export async function getMessagesForUser(userId: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Not authenticated')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user || user.role !== 'ADMIN') throw new Error('Not authorized')

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: user.id, recipientId: userId },
        { senderId: userId, recipientId: user.id },
      ],
    },
    include: {
      sender: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return messages
}

export async function sendMessageAsAdmin(recipientId: string, content: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Not authenticated')

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!admin || admin.role !== 'ADMIN') throw new Error('Not authorized')

  const message = await prisma.message.create({
    data: {
      content,
      senderId: admin.id,
      recipientId,
    },
    include: {
      sender: {
        select: {
          name: true,
        },
      },
    },
  })

  return message
}


export async function getUserMessages(): Promise<Message[]> {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Not authenticated')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) throw new Error('User not found')

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: user.id },
        { recipientId: user.id },
      ],
    },
    include: {
      sender: {
        select: {
          name: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return messages
}

export async function sendMessageAsUser(content: string): Promise<Message> {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Not authenticated')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) throw new Error('User not found')

  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  })

  if (!admin) throw new Error('No admin found')

  const message = await prisma.message.create({
    data: {
      content,
      senderId: user.id,
      recipientId: admin.id,
    },
    include: {
      sender: {
        select: {
          name: true,
          role: true,
        },
      },
    },
  })

  return message
}
