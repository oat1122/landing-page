"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Validation schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  phone: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .regex(/^[0-9-]{9,12}$/, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  email: z.string().min(1, "กรุณากรอกอีเมล").email("กรุณากรอกอีเมลให้ถูกต้อง"),
  message: z.string().min(1, "กรุณากรอกข้อความ"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface UseContactFormReturn {
  form: ReturnType<typeof useForm<ContactFormData>>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  onSubmit: (data: ContactFormData) => Promise<void>;
  completedFields: number;
  progressPercent: number;
}

export function useContactForm(): UseContactFormReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);

    setIsSubmitting(false);
    setSubmitSuccess(true);
    form.reset();

    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Calculate completed fields
  // eslint-disable-next-line react-hooks/incompatible-library
  const values = form.watch();
  const errors = form.formState.errors;
  const completedFields = Object.entries(values).filter(
    ([key, val]) => val && !errors[key as keyof ContactFormData],
  ).length;
  const progressPercent = (completedFields / 4) * 100;

  return {
    form,
    isSubmitting,
    submitSuccess,
    onSubmit,
    completedFields,
    progressPercent,
  };
}
