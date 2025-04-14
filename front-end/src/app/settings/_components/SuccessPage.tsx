"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const successSchema = z.object({
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message is too long"),
});

type SuccessFormValues = z.infer<typeof successSchema>;

export default function SuccessPage() {
  const initialValues: SuccessFormValues = {
    message: "",
  };

  const handleSubmit = (values: SuccessFormValues) => {
    console.log("Success form submitted:", values);
  };

  return (
    <Card className="w-auto">
      <CardContent className="p-6">
        <h1 className="text-lg font-bold mb-8">Success page</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(successSchema)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Confirmation message</Label>
                <Field
                  as={Textarea}
                  id="message"
                  name="message"
                  placeholder="Thank you for supporting me..."
                  className="resize-none h-28"
                />
                {errors.message && touched.message && (
                  <div className="text-sm text-red-500">{errors.message}</div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
