"use client";

import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { profileSchema } from "@/utils/profileValidtion";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

// Props type has been removed as step logic is not used anymore

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

export const ProfileEdit = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [user, setUser] = useState<User>({ userId: 0 });

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

      await axios.post("http://localhost:3000/profile/", {
        name: values.name,
        about: values.about,
        socialMediaURL: values.social,
        avatarImage: res.data.secure_url,
        userId: user.userId,
      });
    } catch (err) {
      console.log("Upload failed or profile save error", err);
    }
  };

  return (
    <div className="w-auto h-fit gap-[25px] flex flex-col">
      <Formik
        initialValues={{ name: "", about: "", media: null, social: "" }}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <h2 className="mb-2 font-medium">Add photo</h2>
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
              <h2 className="mb-1 font-medium">Name</h2>
              <Field name="name" as={Input} placeholder="Enter your name" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-700 text-sm"
              />
            </div>

            <div>
              <h2 className="mb-1 font-medium">About</h2>
              <Field
                name="about"
                as="textarea"
                placeholder="Write about yourself"
                className="w-full p-3 border rounded-md resize-none h-[150px]"
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-red-700 text-sm"
              />
            </div>

            <div>
              <h2 className="mb-1 font-medium">Social URLs</h2>
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
  );
};

export default ProfileEdit;
