"use client";

import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type CountryDropProps = {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
};

export const CountryDrop = ({ field }: CountryDropProps) => {
  return (
    <FormItem>
      <FormLabel>Country</FormLabel>
      <CountryDropdown
        placeholder="Country"
        defaultValue={field.value}
        onChange={(country: Country) => field.onChange(country.alpha3)}
      />
      <FormMessage />
    </FormItem>
  );
};
