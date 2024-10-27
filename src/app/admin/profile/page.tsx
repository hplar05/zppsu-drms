"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import AdminNavbar from "../_components/adminNavbar";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <div className="mt-2">
      <AdminNavbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="gap-2">
          <Card className="mb-4 dark:bg-[#18191A]">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {session?.user.image?.length ? (
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={session?.user.image}
                      alt="Profile picture"
                    />
                    <AvatarFallback>ZPPSU</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="w-32 h-32">
                    <AvatarFallback>ZPPSU</AvatarFallback>
                  </Avatar>
                )}

                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold">{session?.user.name}</h1>
                    <p className="text-muted-foreground">
                      {session?.user.studId}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>
                      Zamboanga Peninsula Polytechnic State University
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <LinkIcon className="w-4 h-4" />
                    <a
                      href="https://zppsu-drms.online"
                      className="hover:underline"
                    >
                      https://zppsu-drms.online
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-2 md:grid-cols-2">
            <Card className="mb-4 dark:bg-[#18191A]">
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    {session?.user.email}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Mobile Number</h3>
                  <p className="text-sm text-muted-foreground">
                    {session?.user.mobileNumber}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-4 dark:bg-[#18191A]">
              <CardHeader>
                <CardTitle>Education Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Course</h3>
                  <p className="text-sm text-muted-foreground">
                    {session?.user.course}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Student Number</h3>
                  <p className="text-sm text-muted-foreground">
                    {session?.user.studId}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-2 dark:bg-[#18191A]">
            <CardHeader>
              <CardTitle>Data Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Data privacy is a priority in our system, where we protect your
                personal information through advanced encryption and secure
                access controls. We ensure that only authorized users can access
                your data, safeguarding it from unauthorized use or breaches.
                Your data remains private and secure at every step of its
                storage and transmission.
              </p>
            </CardContent>
          </Card>

          {/* <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">E-commerce Platform</h3>
            <p className="text-sm text-muted-foreground">
              Built a scalable e-commerce platform using React, Node.js, and
              MongoDB.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Task Management App</h3>
            <p className="text-sm text-muted-foreground">
              Developed a real-time task management application using React and
              Firebase.
            </p>
          </div>
        </CardContent>
      </Card> */}
        </div>
      </div>
    </div>
  );
}
