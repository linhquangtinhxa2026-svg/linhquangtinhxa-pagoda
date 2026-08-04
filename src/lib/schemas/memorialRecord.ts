import * as yup from "yup";
import type { InferType } from "yup";

export const memorialRecordSchema = yup.object({
  full_name: yup.string().required("validation.nameRequired"),
  age_at_death: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "validation.ageInvalid")
    .nullable()
    .defined(),
  phone: yup.string().default(""),
  storage_location: yup.string().default(""),
  display_location: yup.string().default(""),
  private_info: yup.string().default(""),
});

export type MemorialRecordFormData = InferType<typeof memorialRecordSchema>;
