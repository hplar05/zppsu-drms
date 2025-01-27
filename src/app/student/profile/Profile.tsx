"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  MapPin,
  LinkIcon,
  Mail,
  Phone,
  Shield,
  User,
  BookOpen,
  GraduationCap,
  Hash,
} from "lucide-react";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card className="w-full overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <CardContent className="relative pt-16 pb-6 px-6">
            <Avatar className="absolute -top-16 left-6 w-32 h-32 border-4 border-white dark:border-gray-800">
              {session?.user.image ? (
                <AvatarImage src={session.user.image} alt="Profile picture" />
              ) : (
                <AvatarFallback>
                  <User className="w-16 h-16 text-gray-400" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{session?.user.name}</h1>
                <p className="text-muted-foreground">{session?.user.studId}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="px-3 py-1">
                  Student
                </Badge>
                {/* <Button variant="outline">Edit Profile</Button> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Zamboanga Peninsula Polytechnic State University</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <LinkIcon className="w-4 h-4" />
                <a href="https://zppsu-drms.online" className="hover:underline">
                  https://zppsu-drms.online
                </a>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <GraduationCap className="w-4 h-4" />
                <span>{session?.user.course}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Hash className="w-4 h-4" />
                <span>{session?.user.studId}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{session?.user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{session?.user.mobileNumber}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="privacy">Data Privacy</TabsTrigger>
            <TabsTrigger value="education">Education Info</TabsTrigger>
          </TabsList>
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Data Privacy Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Data privacy is a priority in our system, where we protect
                  your personal information through advanced encryption and
                  secure access controls. We ensure that only authorized users
                  can access your data, safeguarding it from unauthorized use or
                  breaches. Your data remains private and secure at every step
                  of its storage and transmission.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education Information</CardTitle>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
