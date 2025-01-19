"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  BookOpen,
  GraduationCap,
  Medal,
  FileText,
} from "lucide-react";
import { RegisterSchema } from "@/src/lib/validation/registerSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/src/lib/utils";

export default function RegisterForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      username: "",
      email: "",
      password: "",
      proofOfID: "",
      confirmPassword: "",
      studId: "",
      yearGraduated: "",
      otherCourse: "",
      // course: "",
      // role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          mobileNumber: values.mobileNumber,
          username: values.username,
          email: values.email,
          proofOfID: values.proofOfID,
          password: values.password,
          course: values.course,
          studId: values.studId,
          role: values.role,
          yearGraduated: values.yearGraduated,
          otherCourse: values.otherCourse,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-600">
          Fill out the form to register for an account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">First Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="First Name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Middle Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="Middle Name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Last Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="Last Name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="Choose a username"
                        {...field}
                      />
                    </div>
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
                  <FormLabel className="text-gray-700">Student ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="Enter your student ID"
                        {...field}
                      />
                    </div>
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
                <FormLabel className="text-gray-700">Course</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCourse(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out">
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "OTHERS",
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
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Other Course Field */}
          {selectedCourse === "OTHERS" && (
            <FormField
              control={form.control}
              name="otherCourse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Course (If not listed)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Medal
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="If your Course is not listed in Dropdown"
                        type="text"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Academic Status</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedRole(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out">
                      <SelectValue placeholder="Select your academic status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "STUDENT",
                      "GRADUATE_STUDENT",
                      "IRREGULAR",
                      "DROPOUT",
                      "RETURNEES",
                      "SHIFTER",
                      "ALUMNI",
                    ].map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year Graduated Field */}
          {(selectedRole === "ALUMNI" ||
            selectedRole === "GRADUATE_STUDENT") && (
            <FormField
              control={form.control}
              name="yearGraduated"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Year of Graduation for (Graduate/Alumni)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <GraduationCap
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="YYYY"
                        type="number"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="your.email@example.com"
                        type="email"
                        {...field}
                      />
                    </div>
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
                  <FormLabel className="text-gray-700">Mobile Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        placeholder="+63 your number"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 pr-10 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
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
                  <FormLabel className="text-gray-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        className="pl-10 py-2 pr-10 border-gray-300 focus:border-[#800000] focus:ring focus:ring-[#800000]/20 transition duration-150 ease-in-out"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-graygray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="proofOfID"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Upload Proof of ID
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    {imageUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          alt="Uploaded ID"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setImageUrl("");
                            field.onChange("");
                          }}
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res.length > 0 && res[0].url) {
                            setImageUrl(res[0].url);
                            field.onChange(res[0].url);
                            toast.success("Image uploaded successfully");
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`Upload failed: ${error.message}`);
                        }}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-[#800000] hover:bg-[#600000] text-white py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-medium text-[#800000] hover:text-[#600000]"
            href="/login"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
