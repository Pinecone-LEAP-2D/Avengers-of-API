import * as Yup from "yup";
import { object, string } from "yup";
import { z } from "zod";

export let profileSchema = object({
  name: string().min(6).required(),
  about: string().min(6).required(),
  media: string().min(8).required(),
});

export const secondProfileSchema = Yup.object({
  country: Yup.string().required("Country is required"),
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
    .required("Card number is required"),
  expires: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration must be in MM/YY format")
    .required("Expiration date is required"),
  year: Yup.string()
    .matches(/^\d{4}$/, "Year must be 4 digits")
    .required("Year is required"),
  cvc: Yup.string()
    .matches(/^\d{3,4}$/, "CVC must be 3 or 4 digits")
    .required("CVC is required"),
});
