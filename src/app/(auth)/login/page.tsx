import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";
import Logo from "@/public/auth-img.jpg";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 sm:p-8">
      <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src={Logo}
            alt="Company Logo"
            layout="fill"
            objectFit="cover"
            priority
            className="object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#800000]/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-sm">
              Sign in to access your account and manage your request documents.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
