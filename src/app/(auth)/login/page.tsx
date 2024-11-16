import LoginForm from "@/components/form/LoginForm";
import { Card } from "@/components/ui/card";
import Logo from "@/public/auth-img.jpg";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex justify-center items-center w-full">
        <Card className="rounded-none max-md:hidden h-[90vh] w-[700px] flex items-center justify-center bg-[#18181B]">
          <Image
            src={Logo}
            alt="Company Logo"
            className="mb-6 h-[93vh] w-[700px] pt-6"
          />
        </Card>

        <LoginForm />
      </div>
    </div>
  );
};

export default page;
