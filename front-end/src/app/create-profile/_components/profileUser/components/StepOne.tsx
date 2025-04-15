"use client";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { profileSchema } from "@/utils/profileValidtion";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

type StepOneProfileEditProps = {
  setStep: (step: number) => void;
};

type ProfileInfoTypes = {
  name: string;
  about: string;
  media: File | null;
  social: string;
};

type User = {
  email?: string;
  username?: string;
  userId: number;
};

export const StepOneProfileEdit = ({ setStep }: StepOneProfileEditProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    userId: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.token;
      if (token) {
        const decode = jwt.decode(token) as User;
        setUser(decode);
      }
    }
  }, []);

  const handleSubmit = async (values: ProfileInfoTypes) => {
    if (!values.media) return;

    const formData = new FormData();
    formData.append("file", values.media);
    formData.append("upload_preset", "coffee_pics");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtptrpft2/upload",
        formData
      );

      try {
        const response = await axios.post("http://localhost:3000/profile/", {
          name: values.name,
          about: values.about,
          socialMediaURL: values.social,
          avatarImage: res.data.secure_url,
          userId: user.userId,
        });
        console.log(response);
        setStep(2);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log("Upload failed");
    }

    // try {
    //   const response = await axios.post("/api/your-endpoint", formData);
    //   console.log("Upload success:", response.data);
    // } catch (err) {
    //   console.error("Upload failed:", err);
    // }
  };

  return (
    <div className="w-auto h-fit p-[20px] flex flex-col gap-[25px]">
      <div className="w-[510px] h-fit max-w-[672px] m-auto flex flex-col gap-6 p-6">
        <Formik
          initialValues={{ name: "", about: "", media: null, social: "" }}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <h1 className="font-bold text-2xl mb-6">
                  Complete your profile page
                </h1>
                <h2 className="mb-2">Add photo</h2>
                <div className="w-[160px] h-[160px] flex items-center justify-center border-dotted border-2 rounded-full overflow-hidden mb-4">
                  <Input
                    id="media"
                    name="media"
                    type="file"
                    accept="image/*"
                    className="opacity-0 absolute w-[160px] h-[160px] rounded-full cursor-pointer"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue("media", file);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      } else {
                        setPreview(null);
                      }
                    }}
                  />
                  <label htmlFor="media">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="rounded-full object-cover w-[160px] h-[160px]"
                      />
                    ) : (
                      <CameraIcon className="text-gray-400 w-8 h-8" />
                    )}
                  </label>
                </div>
                <ErrorMessage
                  name="media"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
              <div>
                <h2 className="mb-1">Name</h2>
                <Field name="name" as={Input} placeholder="Enter your name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div>
                <h2 className="mb-1">About</h2>
                <Field
                  name="about"
                  as={Input}
                  placeholder="Write about yourself"
                  component="textarea"
                  className="w-full p-3 border rounded-md resize-none"
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div>
                <h2 className="mb-1">Social URLs</h2>
                <Field name="social" as={Input} placeholder="Social URLs" />
                <ErrorMessage
                  name="social"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StepOneProfileEdit;

{
  /* <h1 className="font-bold text-xl">Complete your profile page</h1>

<h2 className="mb-2">Add photo</h2>
<div className="flex justify-start">
  <div className="w-[160px] h-[160px] flex items-center justify-center border-dotted border-2 rounded-full mx-auto mb-4">
    <Input className="hidden " id="picture" type="file" />
    <CameraIcon className="text-gray-400 w-8 h-8" />
  </div>
</div>
<div>
  <h2 className="mb-1">Name</h2>
  <Input type="text" placeholder="Enter your name here" />
</div>

<div>
  <h2 className="mb-1">About</h2>
  <Input type="text" placeholder="Write about yourself here" />
</div>

<div>
  <h2 className="mb-1">Social media URL</h2>
  <Input type="text" placeholder="https://" />
</div>
<div className="flex justify-end">
  <Button
    className="flex justify-center text-white bg-gray-300 w-[140px]"
    variant="outline"
  >
    Continue
  </Button>
</div> */
}
