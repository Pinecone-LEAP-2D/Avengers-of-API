"use client";

import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchProfile } from "@/lib/fetchProfile";
import { useAuth } from "@/context/AuthContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter a email"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Please enter a password"),
});

export default function LoginPage() {
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-amber-400 flex flex-col justify-between p-10">
        <div className="text-black ml-20 mt-6 font-bold text-lg">
          ☕ Buy Me Coffee
        </div>

        <div className="flex flex-col justify-center items-center text-center flex-1">
          <Image src="/illustration.png" alt="Logo" width={240} height={240} />
          <h1 className="text-3xl font-bold mt-10">Fund your creative work</h1>
          <p className="font-extralight text-lg text-black mt-2">
            Accept support. Start a membership. Setup a shop. It’s easier
            <br /> than you think.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-10 relative">
        <div className="absolute top-16 right-20">
          <Link href="/signup">
            <Button variant="outline" size="sm">
              Sign up
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Welcome back</h2>
          {error && (
            <div className="w-full h-fit border border-red-400 px-[10px] py-[5px] rounded-[5px] text-red-400 mb-[10px] text-[15px] bg-red-100/50">
              {error}
            </div>
          )}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/user/login",
                  {
                    email: values.email,
                    password: values.password,
                  }
                );
                if (response.status === 200) {
                  localStorage.setItem("token", response.data.token);
                  setUser({
                    id: response.data.user.id,
                    email: response.data.user.email,
                    username: response.data.user.username,
                  });

                  // console.log("User set in context:", {
                  //   id: response.data.user.id,
                  //   email: response.data.user.email,
                  //   username: response.data.user.username,
                  // });

                  const res = await fetchProfile(response.data.user.id);
                  if (res === "No profile") {
                    router.push("create-profile");
                  } else {
                    router.push("home");
                  }
                }
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  const errorMessage =
                    err.response?.data?.message ||
                    "Login failed. Please try again.";
                  setError(errorMessage);
                } else {
                  setError("An unexpected error occurred.");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    placeholder="Enter email here"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Field
                    as={Input}
                    type="password"
                    name="password"
                    placeholder="Enter password here"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Continue"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
