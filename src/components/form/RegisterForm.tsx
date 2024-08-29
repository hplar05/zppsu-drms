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
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import GoogleSignInButton from "@/src/components/GoogleButton";
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

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(8, { message: "Minimum password length is 8 characters" })
      .max(20, { message: "Maximum password length is 20 characters" })
      .refine(
        (password) => {
          // reg-ex code, chat gpt generated: at least one lowercase letter, one uppercase letter, and one special character
          const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;
          return passwordPattern.test(password);
        },
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, and one special character.",
        }
      ),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    name: z.string().min(3, "name is required"),
    image: z.string(),
    mobileNumber: z.string().min(13, "mobile number is required").max(13),
    studId: z.string().min(5, "student id is required").max(15),
    course: z.string().min(4, "course is required").max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const RegisterForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const router = useRouter();
  const phdefaultcode = "+63";
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      username: "",
      email: "",
      password: "",
      image: "",
      confirmPassword: "",
      studId: "",
      course: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
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
        image: values.image,
        password: values.password,
        course: values.course,
        studId: values.studId,
      }),
    });
    if (response.ok) {
      toast.success("Successfully registered!");
      router.push("/login");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <Card className="w-full max-w-md text-base">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
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
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input placeholder="your course" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="mail@example.com" {...field} />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mx-auto mt-2">
              {imageUrl.length ? (
                <div className="flex justify-center items-center flex-col">
                  <FormLabel className="mb-2 text-right">
                    Image Uploaded
                  </FormLabel>
                  <Image
                    alt="Done Upload"
                    src={imageUrl}
                    width={100}
                    height={100}
                    className="mb-3"
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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">
                        Upload your Avatar Image (optional)
                      </FormLabel>
                      <FormControl>
                        <div>
                          <UploadButton
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
            <Button className="w-full mt-6" type="submit">
              Sign up
            </Button>
          </form>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
          <p className="text-center text-sm text-gray-600 mt-2">
            If you don&apos;t have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/login">
              Login
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
