import * as yup from "yup";
import type { InferType } from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("validation.emailInvalid").required("validation.emailRequired"),
  password: yup
    .string()
    .min(6, "validation.passwordMin")
    .required("validation.passwordRequired"),
});

export type LoginFormData = InferType<typeof loginSchema>;
