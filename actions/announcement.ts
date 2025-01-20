"use server"

import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth/next"



export async function createAnnouncement(title: string, body: string) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const announcement = await db.announcement.create({
    data: {
      title,
      body,
      adminId: session.user.id,
    },
  })

  return announcement
}

export async function getAnnouncements() {
  const announcements = await db.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  return announcements
}

