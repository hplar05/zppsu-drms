"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UploadButton, UploadDropzone } from "@/src/lib/utils";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PhoneInput } from "../phone-input";
import { RegisterSchema } from "@/src/lib/validation/registerSchema";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  // const [imageKey, setImageKey] = useState("");
  const router = useRouter();
  // const phdefaultcode = "+63";
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      username: "",
      email: "",
      password: "",
      proofOfID: "",
      confirmPassword: "",
      studId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      const response = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          mobileNumber: values.mobileNumber,
          username: values.username,
          email: values.email,
          proofOfID: values.proofOfID,
          password: values.password,
          course: values.course,
          studId: values.studId,
          role: values.role,
        }),
      });

      if (response.ok) {
        toast.success("Successfully registered!");
        router.push("/login");
      } else if (response.status === 409) {
        const errorData = await response.json();
        toast.error(
          errorData.message || "A conflict occurred. Please try again."
        );
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!confirmShowPassword);
  };

  return (
    <Card className="w-[700px] h-[90vh] flex flex-col items-center justify-center rounded-none overflow-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Register
        </CardTitle>
        <CardDescription>
          Fill out all input forms to create a account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="your student id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Status</FormLabel>
                      <FormControl>
                        <select
                          className="rounded-sm border-gray-300 dark:border-white border flex overflow-auto"
                          {...field}
                        >
                          {[
                            "SELECT",
                            "STUDENT",
                            "GRADUATE_STUDENT",
                            "IRREGULAR",
                            "DROPOUT",
                            "RETURNEES",
                            "ADMIN",
                            "SUPERADMIN",
                          ].map((role) => (
                            <option key={role} value={role}>
                              {role.replace("_", " ")}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <select
                          className="rounded-sm border-gray-300 dark:border-white border flex"
                          {...field}
                        >
                          {[
                            "SELECT",
                            "BSIT",
                            "BSAT",
                            "BSET",
                            "BSEIexT",
                            "BSMT",
                            "BSCRACT",
                            "BSCompTech",
                            "BSEntrep",
                            "BSHM",
                            "BSInfoTech",
                            "BSMarE",
                            "BSDevcom",
                            "BFA",
                          ].map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="zppsu@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="add +63 at your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <PhoneInput /> */}
              </div>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 pt-8 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Re-Enter your password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Re-Enter your password"
                          type={confirmShowPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 pt-8 hover:bg-transparent"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={
                    confirmShowPassword ? "Hide password" : "Show password"
                  }
                >
                  {confirmShowPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="mx-auto mt-2">
              {imageUrl.length ? (
                <div className="flex justify-center items-center flex-col">
                  <FormLabel className="mb-1 text-right">
                    Image Uploaded
                  </FormLabel>
                  <img
                    alt="Done Upload"
                    src={imageUrl}
                    width={80}
                    height={80}
                    className="mb-1"
                  />
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setImageUrl("");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="proofOfID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">
                        Upload your proof of ID
                      </FormLabel>
                      <FormControl>
                        <div>
                          <UploadButton
                            appearance={{
                              button: {
                                background: "#800000",
                                color: "white",
                              },
                            }}
                            endpoint="imageUploader"
                            onClientUploadComplete={(res: any) => {
                              const imageUrl = res[0]?.url;
                              if (imageUrl) {
                                field.onChange(imageUrl);
                                toast.success("Image uploaded successfully");
                              }
                              if (res && res.length > 0 && res[0].url) {
                                setImageUrl(res[0].url);
                              } else {
                                console.error(
                                  "Please input a valid avatar image.",
                                  res
                                );
                              }
                            }}
                            onUploadError={(error: Error) => {
                              toast.error(`ERROR! ${error.message}`);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button className="w-full mt-6 bg-[#800000]" type="submit">
              Sign up
            </Button>
          </form>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
          <p className="text-center text-sm text-gray-600 mt-2">
            If you have an account, please&nbsp;
            <Link className="text-[#800000] hover:underline" href="/login">
              Login
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
