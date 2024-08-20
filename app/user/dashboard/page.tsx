import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <div>
        <h2>welcome to userpage {session?.user?.name}</h2>
        <h2>
          <User />
        </h2>
      </div>
    );
  }

  return (
    <div>
      Please Login First <Link href="/login">Login</Link>
    </div>
  );
};

export default page;
