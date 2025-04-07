"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex h-screen">
      {/* Left Side - Illustration & Text */}
      <div className="w-1/2 bg-amber-400 flex flex-col justify-between p-10">
        {/* Header */}
        <div className="text-black font-bold text-lg ml-20 mt-6">
          ☕ Buy Me Coffee
        </div>

        <div className="flex flex-col justify-center items-center text-center flex-1">
          <Image src="/illustration.png" alt="Logo" width={240} height={240} />
          <h1 className="text-3xl font-bold mt-10">Fund your creative work</h1>
          <p className="font-extralight text-lg text-black mt-2">
            Accept support. Start a membership. Setup a shop. It’s easier <br />
            than you think.
          </p>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 relative">
        {/* Top right switch button */}
        <div className="absolute top-16 right-20">
          <Link href={step === 1 ? "/login" : "/signup"}>
            <Button variant="outline" size="sm">
              {step === 1 ? "Log in" : "Sign up"}
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-1">
            {step === 1 ? "Create Your Account" : "Create Your Account"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {step === 1
              ? "Choose a username for your page"
              : "Enter your email and password"}
          </p>

          {step === 1 ? (
            // Step 1: Username Input
            <Formik
              initialValues={{ username: "" }}
              validationSchema={Yup.object({
                username: Yup.string()
                  .min(3, "Minimum 3 characters")
                  .required("Required"),
              })}
              onSubmit={() => setStep(2)}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Label>Username</Label>
                    <Field
                      as={Input}
                      type="text"
                      name="username"
                      placeholder="Enter username here"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    Continue
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            // Step 2: Email & Password Form
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string().email("Invalid email").required("Required"),
                password: Yup.string()
                  .min(6, "Minimum 6 characters")
                  .required("Required"),
              })}
              onSubmit={(values) => {
                console.log("User Registered:", values);
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
                      placeholder="Enter email"
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
                      placeholder="Enter password"
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
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
