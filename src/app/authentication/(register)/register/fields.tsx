import * as Yup from "yup";

import TextField from "@/components/textField/TextField";

export enum fieldNames {
  name = "name",
  mobile_email = "mobile_email",
  source = "source",
}

export interface FieldValueType {
  [fieldNames.name]: string;
  [fieldNames.mobile_email]: string;
  [fieldNames.source]: string;
}

export const fields = [
  {
    name: fieldNames.name,
    placeholder: "Enter Full Name",
    component: TextField,
    color: "primary",
    label: "Full Name",
  },
  {
    name: fieldNames.mobile_email,
    placeholder: "Enter WhatsApp number",
    component: TextField,
    color: "primary",
    label: "WhatsApp number",
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
  [fieldNames.name]: "",
  [fieldNames.mobile_email]: "",
  [fieldNames.source]: "",
};

export const validationSchema = Yup.object({
  [fieldNames.name]: Yup.string().required("Full name is required"),
  [fieldNames.mobile_email]: Yup.string().required(
    "WhatsApp number is required"
  ),
  [fieldNames.source]: Yup.string().required("Source is required"),
});
