import * as yup from "yup";
import type { InferType } from "yup";

export const prayerEventSchema = yup.object({
  type: yup.string().default(""),
  registrantName: yup.string().default(""),
  eventDate: yup.string().required("validation.dateRequired"),
  note: yup.string().default(""),
});

export type PrayerEventFormData = InferType<typeof prayerEventSchema>;
