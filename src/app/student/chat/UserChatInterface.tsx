"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getUserMessages, sendMessageAsUser } from "@/actions/chat";

type Message = {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  sender: {
    name: string;
    role: string;
  };
};

export default function UserChatInterface() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        const fetchedMessages = await getUserMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        // Optionally, you can set an error state here and display it to the user
      }
    }
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const sentMessage = await sendMessageAsUser(newMessage);
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally, you can set an error state here and display it to the user
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="py-3">
        <CardTitle className="text-lg">Chat with Admin</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full px-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender.role !== "ADMIN"
                  ? "justify-end"
                  : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender.role !== "ADMIN"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } rounded-lg p-2 text-sm`}
              >
                <p className="font-semibold text-xs">{message.sender.name}</p>
                <p>{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-2">
        <div className="flex space-x-2 w-full">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
