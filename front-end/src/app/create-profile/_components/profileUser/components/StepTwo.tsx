"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { secondProfileSchema } from "@/utils/profileValidtion";
import { CountryDrop } from "./countryDrop";

export const StepTwoProfileEdit = () => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    console.log(values);
    localStorage.setItem("step", "3");
    router.push("/next-step");
  };

  return (
    <div className="w-auto h-fit p-[20px] flex flex-col gap-[25px]">
      <div className="w-[510px] h-fit max-w-[672px] m-auto flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold">How would you like to be paid? </h1>
        <p className="text-gray-600">Enter location and payment details</p>

        <Formik
          initialValues={{
            country: "",
            firstName: "",
            lastName: "",
            cardNumber: "",
            expires: "",
            year: "",
            cvc: "",
          }}
          validationSchema={secondProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div>
                  <h2 className="mb-1">First Name</h2>
                  <Field
                    name="firstName"
                    as={Input}
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                </div>

                <div>
                  <h2 className="mb-1">Last Name</h2>
                  <Field
                    name="lastName"
                    as={Input}
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-1">Card Number</h2>
                <Field
                  name="cardNumber"
                  as={Input}
                  placeholder="Enter your card number"
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div className="flex gap-3">
                <div>
                  <h2 className="mb-1">Expiration Date (MM/YY)</h2>
                  <Field name="expires" as={Input} placeholder="MM/YY" />
                  <ErrorMessage
                    name="expires"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                </div>

                <div>
                  <h2 className="mb-1">Year</h2>
                  <Field name="year" as={Input} placeholder="Enter the year" />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                </div>

                <div>
                  <h2 className="mb-1">CVC</h2>
                  <Field name="cvc" as={Input} placeholder="Enter your CVC" />
                  <ErrorMessage
                    name="cvc"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </Form>
          )}
        </Formik>

        <Button
          onClick={() => {
            localStorage.removeItem("step");
            router.push("/finish");
          }}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default StepTwoProfileEdit;
