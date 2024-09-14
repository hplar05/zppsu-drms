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
import { EditProfileDialog } from "@/components/EditProfile";

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt="Profile picture"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">Software Developer</p>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <LinkIcon className="w-4 h-4" />
                <a href="https://johndoe.com" className="hover:underline">
                  https://johndoe.com
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Node.js</Badge>
                <Badge>TypeScript</Badge>
                <Badge>GraphQL</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Passionate software developer with 5+ years of experience in
            building web applications. Specializing in front-end development
            with React and back-end development with Node.js. Always eager to
            learn new technologies and solve complex problems.
          </p>
        </CardContent>
      </Card> */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Senior Developer at TechCorp</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4 mr-1" />
                2020 - Present
              </div>
            </div>
            <div>
              <h3 className="font-semibold">
                Full Stack Developer at WebSolutions
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4 mr-1" />
                2017 - 2020
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">MSc in Computer Science</h3>
              <p className="text-sm text-muted-foreground">
                Stanford University, 2017
              </p>
            </div>
            <div>
              <h3 className="font-semibold">BSc in Software Engineering</h3>
              <p className="text-sm text-muted-foreground">MIT, 2015</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
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
      </Card>

      <div className="flex justify-end">
        <EditProfileDialog />
      </div>
    </div>
  );
}
