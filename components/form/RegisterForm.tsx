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
    <Card className="w-auto h-auto flex flex-col items-center justify-center rounded-none overflow-auto">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto">
            <div className="space-y-2 max-md:space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="max-md:h-[2rem]"
                        placeholder="Enter your full name ex Mikaella Rayno"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className="max-md:h-[2rem]"
                          placeholder="zppsu123"
                          {...field}
                        />
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
                        <Input
                          className="max-md:h-[2rem]"
                          placeholder="your student id"
                          {...field}
                        />
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
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        {[
                          "SELECT",
                          "COLLEGE OF TEACHER EDUCATION",
                          "BACHELOR OF ELEMENTARY EDUCATION",
                          "BACHELOR OF SECONDARY EDUCATION - MAJOR IN MATHEMATICS",
                          "BACHELOR OF SECONDARY EDUCATION - MAJOR IN ENGLISH",
                          "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION - MAJOR IN HOME ECONOMICS",
                          "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION - MAJOR IN INDUSTRIAL ARTS",
                          "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION - MAJOR IN INFORMATION COMMUNICATION TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN AUTOMOTIVE TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN CIVIL TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR DRAFTING TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN ELECTRICAL TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN ELECTRONICS TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN FOOD SERVICES MANAGEMENT",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN GARMENTS, FASHION, AND DESIGN",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN MECHANICAL TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN WELDING AND FABRICATION TECHNOLOGY",
                          "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN HEATING, VENTILATION, AND AIR-CONDITIONING TECHNOLOGY",
                          "DEPARTMENT OF PHYSICAL EDUCATION",
                          "BACHELOR OF PHYSICAL EDUCATION",
                          "BACHELOR OF SCIENCE IN EXERCISE AND SPORTS SCIENCES - MAJOR IN FITNESS AND SPORTS COACHING",
                          "BACHELOR OF SCIENCE IN EXERCISE AND SPORTS SCIENCES - MAJOR IN FITNESS AND SPORTS MANAGEMENT",
                          "COLLEGE OF MARITIME EDUCATION",
                          "BACHELOR OF SCIENCE IN MARINE ENGINEERING",
                          "COLLEGE OF ENGINEERING AND TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN CIVIL ENGINEERING",
                          "BACHELOR OF SCIENCE IN AUTOMOTIVE TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN ELECTRICAL TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN MECHANICAL TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN ELECTRONICS TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN COMPUTER TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN REFRIGERATION AND AIR-CONDITIONING TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN CIVIL TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN ARCHITECTURAL DRAFTING TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN FOOD TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN GARMENTS A TEXTILE TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN POWER PLANT ENGINEERING TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN MECHATRONICS TECHNOLOGY",
                          "COLLEGE OF INFORMATION COMPUTING SCIENCES",
                          "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
                          "BACHELOR OF SCIENCE IN INFORMATION SYSTEMS",
                          "COLLEGE OF ARTS HUMANITIES AND SOCIAL SCIENCES",
                          "BACHELOR OF SCIENCE IN DEVELOPMENT COMMUNICATION",
                          "BATSILYER NG SINING SA FILIPINO",
                          "BACHELOR OF SCIENCE IN FINE ARTS - MAJOR IN INDUSTRIAL ARTS",
                          "SCHOOL OF BUSINESS ADMINISTRATION",
                          "BACHELOR OF SCIENCE IN ENTREPRENEURSHIP",
                          "BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT",
                          "DIPLOMA OF TECHNOLOGY - AUTOMOTIVE ENGINEERING TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - CIVIL ENGINEERING TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - ELECTRICAL ENGINEERING TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - ELECTRONICS AND COMMUNICATION TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - FOOD SERVICES AND MANAGEMENT TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - GARMENTS, FASHION AND DESIGN TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - HOSPITALITY MANAGEMENT TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - INFORMATION TECHNOLOGY",
                          "DIPLOMA OF TECHNOLOGY - MECHANICAL ENGINEERING TECHNOLOGY",
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
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Status</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-2 border rounded-md"
                          {...field}
                        >
                          {[
                            "SELECT",
                            "STUDENT",
                            "GRADUATE_STUDENT",
                            "IRREGULAR",
                            "DROPOUT",
                            "RETURNEES",
                            "SHIFTER",
                            // "ADMIN",
                            // "SUPERADMIN",
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-md:gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="max-md:h-[2rem]"
                          placeholder="zppsu@gmail.com"
                          {...field}
                        />
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
                          className="max-md:h-[2rem]"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-md:gap-2">
                {/* Password Field */}
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="max-md:h-[2rem]"
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
                    className="absolute right-2 top-9 max-md:top-7"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            className="max-md:h-[2rem]"
                            type={confirmShowPassword ? "text" : "password"}
                            placeholder="Confirm your password"
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
                    className="absolute right-2 top-9 max-md:top-7"
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
                              // toast.error(error! ${error.message});
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
