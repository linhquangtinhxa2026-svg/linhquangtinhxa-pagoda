import * as yup from "yup";
import type { InferType } from "yup";

import { CEREMONY_TYPE_COLOR_OPTIONS } from "@/lib/ceremonyTypeColors";

export const ceremonyTypeSchema = yup.object({
  label: yup.string().required("validation.labelRequired"),
  colorKey: yup
    .string()
    .oneOf(
      CEREMONY_TYPE_COLOR_OPTIONS.map((option) => option.key),
      "validation.colorRequired"
    )
    .required("validation.colorRequired"),
});

export type CeremonyTypeFormData = InferType<typeof ceremonyTypeSchema>;
