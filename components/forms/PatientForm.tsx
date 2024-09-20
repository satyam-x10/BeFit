// @ts-ignore
// @ts-nocheck

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import {
  checkUserExistsByEmail,
  createUser,
  getUser,
} from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false); // State to control visibility of full form

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const existingUser = await checkUserExistsByEmail(values.email);
      if (existingUser) {
        console.log("User already exists:");

        router.push(`/patients/${existingUser}`);
      } else {
        console.log("User does not exist");
      }

      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
      console.log("Creating new user:", user);

      const newUser = await createUser(user);
      console.log("New user created:", newUser);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 bg-black p-6 rounded-3xl"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Login to get your appointments</h1>
        </section>

        {/* Always show the email field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your login email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        {!showFullForm && (
          // Button to show the rest of the form
          <button
            type="button"
            onClick={() => setShowFullForm(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Create a new account
          </button>
        )}

        {/* Conditionally show the rest of the form if `showFullForm` is true */}
        {showFullForm && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Full name"
              placeholder="Enter your name"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone number"
              placeholder="Enter your contact number"
            />
            <button
              type="button"
              onClick={() => setShowFullForm(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Already have an account? Login
            </button>
          </>
        )}

        <SubmitButton isLoading={isLoading}>
          {showFullForm ? "Get Started" : "Login"}
        </SubmitButton>
      </form>
    </Form>
  );
};
