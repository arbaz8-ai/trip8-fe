import { FieldValueType } from "../../fields";
import { createContext } from "react";

export interface ReviewContextType {
  reviewData: FieldValueType;
  setReviewData?: (data: FieldValueType) => void;
}

export const ReviewContext = createContext<ReviewContextType | undefined>(
  undefined
);
