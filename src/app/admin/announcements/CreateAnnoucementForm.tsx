"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { createAnnouncement } from "@/actions/announcement";
import { Textarea } from "@/components/ui/textarea";

export function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAnnouncement(title, body);
      setTitle("");
      setBody("");
      toast.success("Your announcement has been successfully created.");
      router.push("/admin/announcements");
    } catch (error) {
      toast.error("Failed to create announcement. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Announcement</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement Title"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium">
              Body
            </label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Announcement Body"
              required
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Create Announcement</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
