"use client";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { profileSchema } from "@/utils/profileValidtion";
import { useState } from "react";
type StepOneProfileEditProps = {
  setStep: (step: number) => void;
};

type ProfileInfoTypes = {
  name: string;
  about: string;
  media: File | null;
};

export const StepOneProfileEdit = ({ setStep }: StepOneProfileEditProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (values: ProfileInfoTypes) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("about", values.about);
    if (values.media) {
      formData.append("media", values.media);
      // <StepTwoProfileEdit />;
    }
    setStep(2);

    // try {
    //   const response = await axios.post("/api/your-endpoint", formData);
    //   console.log("Upload success:", response.data);
    // } catch (err) {
    //   console.error("Upload failed:", err);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[510px] h-[631px] max-w-[672px] m-auto flex flex-col gap-6 p-6 border rounded-xl shadow-md">
        <Formik
          initialValues={{ name: "", about: "", media: null }}
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
                <div className="w-[160px] h-[160px] flex items-center justify-center border-dotted border-2 rounded-full mb-4">
                  <Input
                    id="media"
                    name="media"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue("media", file);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <label htmlFor="media" className="cursor-pointer">
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
                  className="h-[130px] w-full text-start align-top p-3 border rounded-md resize-none"
                />
                <ErrorMessage
                  name="about"
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
