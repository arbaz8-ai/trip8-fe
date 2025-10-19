import * as Yup from "yup";

import TextField from "@/components/textField/TextField";

export enum fieldNames {
  name = "name",
  mobile = "mobile",
  email = "email",
}

export interface FieldValueType {
  [fieldNames.name]: string;
  [fieldNames.mobile]: string;
  [fieldNames.email]: string;
}

export const fields = [
  {
    name: fieldNames.name,
    placeholder: "Enter Full Name",
    component: TextField,
    color: "primary",
    label: "Full Name",
    colCount: 12,
  },
  {
    name: fieldNames.mobile,
    placeholder: "Enter Phone Number",
    component: TextField,
    color: "primary",
    label: "Phone Number",
    colCount: 12,
  },
  {
    name: fieldNames.email,
    placeholder: "Enter Email Address",
    component: TextField,
    color: "primary",
    label: "Email Address",
    colCount: 12,
  },
];

export const initialValues: FieldValueType = {
  [fieldNames.name]: "",
  [fieldNames.mobile]: "",
  [fieldNames.email]: "",
};

export const validationSchema = Yup.object({
  [fieldNames.name]: Yup.string().required("Full name is required"),
  [fieldNames.mobile]: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  [fieldNames.email]: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
});
