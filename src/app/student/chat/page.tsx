import React, { Suspense } from "react";
import UserChatInterface from "./UserChatInterface";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserChatInterface />
    </Suspense>
  );
};

export default page;
