import * as yup from "yup";
import type { InferType } from "yup";

export const newsSchema = yup.object({
  title: yup.string().required("validation.titleRequired"),
  slug: yup.string().required("validation.slugRequired"),
  description: yup.string().required("validation.descriptionRequired").max(500),
  content: yup.string().required("validation.contentRequired"),
  category: yup.string().required("validation.categoryRequired"),
  isPublished: yup.boolean().default(false),
  coverImage: yup
    .mixed<File | string>()
    .required("validation.coverImageRequired")
    .test("not-empty", "validation.coverImageRequired", (value) => !!value),
  gallery: yup.array(yup.mixed<File | string>().required()).default([]),
});

export type NewsFormData = InferType<typeof newsSchema>;
