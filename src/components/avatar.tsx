"use client";

import React from "react";
import { Badge } from "@/src/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useSession } from "next-auth/react";

const UserAvatar = () => {
  const { data: session } = useSession();
  const avatarUrl = session?.user.image;
  const fallbackAvatarUrl =
    "https://utfs.io/f/c2fa4d72-0a3e-41c7-8e8f-62137a4ec5c6-1zbfv.jpg";
  const adminName = session?.user.name;

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatarUrl ?? fallbackAvatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{adminName}</h2>
      </div>
      <Badge className="flex justify-center items-center">
        {session?.user.role === "ADMIN" ? "ZZPSU ADMIN" : "ZZPSU STUDENT"}
      </Badge>
    </div>
  );
};

export default UserAvatar;
