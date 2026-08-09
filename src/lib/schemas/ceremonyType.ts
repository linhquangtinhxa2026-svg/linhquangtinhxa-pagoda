import * as yup from "yup";
import type { InferType } from "yup";

import { CEREMONY_TYPE_COLOR_OPTIONS } from "@/lib/ceremonyTypeColors";
import { CEREMONY_TYPE_ICON_OPTIONS } from "@/lib/ceremonyTypeIcons";

const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export const ceremonyTypeSchema = yup.object({
  label: yup.string().required("validation.labelRequired"),
  colorKey: yup
    .string()
    .oneOf(
      CEREMONY_TYPE_COLOR_OPTIONS.map((option) => option.key),
      "validation.colorRequired"
    )
    .required("validation.colorRequired"),
  iconKey: yup
    .string()
    .oneOf(
      CEREMONY_TYPE_ICON_OPTIONS.map((option) => option.key),
      "validation.iconRequired"
    )
    .required("validation.iconRequired"),
  iconColor: yup
    .string()
    .matches(HEX_COLOR_PATTERN, "validation.hexColorInvalid")
    .required("validation.hexColorRequired"),
  important: yup.boolean().default(false).required(),
});

export type CeremonyTypeFormData = InferType<typeof ceremonyTypeSchema>;
