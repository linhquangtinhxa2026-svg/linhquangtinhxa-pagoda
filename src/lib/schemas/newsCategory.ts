import * as yup from "yup";
import type { InferType } from "yup";

const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export const newsCategorySchema = yup.object({
  label: yup.string().required("validation.labelRequired"),
  backgroundColor: yup
    .string()
    .matches(HEX_COLOR_PATTERN, "validation.hexColorInvalid")
    .required("validation.hexColorRequired"),
  textColor: yup
    .string()
    .matches(HEX_COLOR_PATTERN, "validation.hexColorInvalid")
    .required("validation.hexColorRequired"),
  order: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .min(0, "validation.orderInvalid")
    .required("validation.orderRequired"),
});

export type NewsCategoryFormData = InferType<typeof newsCategorySchema>;
