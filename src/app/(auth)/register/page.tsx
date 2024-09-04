import RegisterForm from "@/components/form/RegisterForm";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/public/authimage.jpg";

const page = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex justify-center items-center w-full">
        <Card className="rounded-none max-md:hidden h-[90vh] w-[700px] flex items-center justify-center bg-[#18181B]">
          <Image
            src={Logo}
            alt="Company Logo"
            className="mb-6 h-[87vh] w-[700px]"
          />
        </Card>
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
