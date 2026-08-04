import * as yup from "yup";
import type { InferType } from "yup";

export const prayerEventSchema = yup.object({
  type: yup.string().default(""),
  registrantName: yup.string().default(""),
  subjectName: yup.string().default(""),
  phone: yup.string().required("validation.phoneRequired"),
  eventDate: yup.string().required("validation.dateRequired"),
  note: yup.string().default(""),
});

export type PrayerEventFormData = InferType<typeof prayerEventSchema>;
