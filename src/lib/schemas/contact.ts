import * as yup from "yup";
import type { InferType } from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("validation.nameRequired"),
  email: yup.string().email("validation.emailInvalid").required("validation.emailRequired"),
  phone: yup.string().default(""),
  message: yup.string().required("validation.messageRequired"),
});

export type ContactFormData = InferType<typeof contactSchema>;
