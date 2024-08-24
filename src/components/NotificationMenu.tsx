"use client";

import { useState, useRef, useEffect } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";
import { useSession } from "next-auth/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";

const YourAppLayout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient && status === "authenticated" ? (
    <KnockProvider
      apiKey={"pk_test_8fGuyNLUoctEn3_WZrKyVXc3VaUSH5nq7rCKtYlESGs"}
      //@ts-ignore
      userId={session?.user.id}
    >
      <KnockFeedProvider feedId={"72ef0ae0-f25c-41a2-8085-ab780d58e779"}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  ) : (
    <BellIcon className="h-6 w-6" aria-hidden="true" />
  );
};

export default YourAppLayout;
