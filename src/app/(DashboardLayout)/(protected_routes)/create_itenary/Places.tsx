import React, { memo } from "react";

import { CircularProgress } from "@mui/material";
import { Field } from "formik";

interface PlacesProps {
  options?: {
    name: string;
    category: string[];
  }[];
  item: any;
  isLoading: boolean;
}

const Places = ({ options, item, isLoading = false }: PlacesProps) => {
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Field
      {...item}
      options={options?.map((place) => ({
        label: place?.name,
        value: place?.name,
      }))}
    />
  );
};

export default memo(Places);
