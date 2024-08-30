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
    "https://utfs.io/f/9c2c5025-ae0d-4f81-a5d9-650573f7d0a6-b3d8py.jpg";
  const adminName = session?.user.name;
  const userEmail = session?.user.email;

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatarUrl ?? fallbackAvatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-base font-bold">{adminName}</h2>
          <h2 className="text-xs">{userEmail}</h2>
        </div>
      </div>
      <Badge className="flex justify-center items-center bg-[#800000] text-white">
        {session?.user.role === "ADMIN"
          ? "ZPPSU ADMIN"
          : session?.user.role === "GRADUATE_STUDENT"
          ? "GRADUATE STUDENT"
          : "ZZPSU STUDENT"}
      </Badge>
    </div>
  );
};

export default UserAvatar;
