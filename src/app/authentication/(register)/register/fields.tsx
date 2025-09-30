import * as Yup from "yup";

import TextField from "@/components/textField/TextField";

export enum fieldNames {
  fullname = "fullname",
  number = "number",
  source = "source",
}

interface FieldValueType {
  [fieldNames.fullname]: string;
  [fieldNames.number]: string;
  [fieldNames.source]: string;
}

export const fields = [
  {
    name: fieldNames.fullname,
    placeholder: "Enter Full Name",
    component: TextField,
    color: "primary",
    label: "Full Name",
  },
  {
    name: fieldNames.number,
    placeholder: "Enter WhatsApp Number",
    component: TextField,
    color: "primary",
    label: "WhatsApp Number",
  },
  {
    name: fieldNames.source,
    placeholder: "Enter Source",
    component: TextField,
    color: "primary",
    label: "Where did you hear about us",
    select: true,
    options: [
      { label: "Facebook", value: "facebook" },
      { label: "Instagram", value: "instagram" },
      { label: "Google", value: "google" },
      { label: "From Friend", value: "from_friend" },
    ],
  },
];

export const intialValues: FieldValueType = {
  [fieldNames.fullname]: "",
  [fieldNames.number]: "",
  [fieldNames.source]: "",
};

export const validationSchema = Yup.object({
  [fieldNames.fullname]: Yup.string().required("Full name is required"),
  [fieldNames.number]: Yup.string().required("WhatsApp number is required"),
  [fieldNames.source]: Yup.string().required("Source is required"),
});
