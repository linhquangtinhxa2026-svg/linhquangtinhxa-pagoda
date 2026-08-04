"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { InputField } from "@/components/form/InputField";
import { TextareaField } from "@/components/form/TextareaField";

export function ContactForm() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(t("contact.success"));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField control={control} name="name" label={t("contact.nameLabel")} placeholder={t("contact.namePlaceholder")} />
      <InputField control={control} name="email" label={t("contact.emailLabel")} placeholder={t("contact.emailPlaceholder")} type="email" />
      <InputField control={control} name="phone" label={t("contact.phoneLabel")} placeholder={t("contact.phonePlaceholder")} type="tel" />
      <TextareaField control={control} name="message" label={t("contact.messageLabel")} placeholder={t("contact.messagePlaceholder")} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3.5 bg-[#c4973a] hover:bg-[#d4aa55] text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer disabled:opacity-50"
      >
        {t("contact.submit")}
      </button>
    </form>
  );
}
