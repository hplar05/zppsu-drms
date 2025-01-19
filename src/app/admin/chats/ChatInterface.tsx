"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getMessagesForUser,
  getNonAdminUsers,
  sendMessageAsAdmin,
} from "@/actions/chat";
import { Search } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Message = {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  sender: {
    name: string;
  };
};

export default function AdminChatInterface() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchNonAdminUsers() {
      const nonAdminUsers = await getNonAdminUsers();
      setUsers(nonAdminUsers);
      setFilteredUsers(nonAdminUsers);
    }
    fetchNonAdminUsers();
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      if (selectedUser) {
        const fetchedMessages = await getMessagesForUser(selectedUser.id);
        setMessages(fetchedMessages);
      }
    }
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSendMessage = async () => {
    if (!selectedUser || !newMessage.trim()) return;

    const message = await sendMessageAsAdmin(selectedUser.id, newMessage);
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <div className="relative">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                selectedUser?.id === user.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                  />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <header className="bg-white border-b p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedUser.name}`}
                  />
                  <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">{selectedUser.role}</p>
                </div>
              </div>
            </header>
            <ScrollArea className="flex-1 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === session?.user?.id
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.senderId === session?.user?.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } rounded-lg p-3 break-words`}
                  >
                    <p className="font-semibold">{message.sender.name}</p>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <footer className="bg-white border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
