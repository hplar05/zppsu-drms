"use client";

import { updateprofile } from "@/actions/editprofile";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@prisma/client";
import { useFormState } from "react-dom";

export function EditProfileForm({ user }: { user: User }) {
  const UpdateProfileWithId = updateprofile.bind(null, user.id);
  const [state, formAction] = useFormState(UpdateProfileWithId, null);

  return (
    <Card className="w-full max-w-md mx-auto dark:bg-[#18191A]">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update Profile.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              defaultValue={user.name}
            />
            <div>
              <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
            </div>
          </div>
          {/* <div className="flex justify-between gap-2">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter the username"
                defaultValue={user.username}
              />
              <div>
                <p className="mt-2 text-sm text-red-500">
                  {state?.Error?.username}
                </p>
              </div>
            </div>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">
            <Link href="/student/profile">Cancel</Link>
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
