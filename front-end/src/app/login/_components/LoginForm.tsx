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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter a email"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Please enter a password"),
});

export default function LoginPage() {

  const router = useRouter();
  return (
    <div className="flex h-screen">
      {/* Left Side - Illustration & Text */}
      <div className="w-1/2 bg-amber-400 flex flex-col justify-between p-10">
        {/* Top Left Text */}
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

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 relative">
        {/* Top Right Navigation */}
        <div className="absolute top-16 right-20">
          <Link href="/signup">
            <Button variant="outline" size="sm">
              Sign up
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Welcome back</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async(values) => {
              try{
                const response = await axios.post("http://localhost:3000/user/login",{
                  email: values.email,
                  password: values.password
                })
                if(response.status === 200){
                  localStorage.setItem("token",response.data.token);
                  router.push("home");
                }
              }catch(err){
                console.log(err);
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
