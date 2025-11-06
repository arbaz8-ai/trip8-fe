import CounterField from "@/components/counterField/CounterField";
import RadioField from "@/components/radioField/RadioField";
import RangeField from "@/components/rangeField/RangeField";
import TextField from "@/components/textField/TextField";
// import TextField from "@/components/textField/TextField";

export enum fieldNames {
  children = "children",
  adults = "adults",
  requirement = "requirement",
  stay = "stay",
  car_type = "car_type",
  car_budget_range = "car_budget_range",
  quote_source = "quote_source",
}

export interface FieldValueType {
  [fieldNames.children]: number;
  [fieldNames.adults]: number;
  [fieldNames.requirement]: string;
  [fieldNames.stay]: string;
  [fieldNames.car_type]: string;
  [fieldNames.car_budget_range]: string;
  [fieldNames.quote_source]: string;
}

export const fields = [
  [
    {
      name: fieldNames.children,
      placeholder: "children",
      component: CounterField,
      colCount: 6,
      color: "primary",
      label: "Children",
    },
    {
      name: fieldNames.adults,
      placeholder: "Adults",
      component: CounterField,
      colCount: 6,
      color: "primary",
      label: "Adults",
    },
    {
      name: fieldNames.requirement,
      component: RadioField,
      colCount: 12,
      label: "Destination (One or More)",
      options: [
        {
          label: "Full Tour Package (Transport, Hotel)",
          value: "full_tour_package",
        },
        {
          label: "Car with Driver",
          value: "car_with_driver",
        },
        {
          label: "Self Drive Car",
          value: "self_drive_car",
        },
        {
          label: "Only Hotel",
          value: "only_hotel",
        },
        {
          label: "Self Drive Car + Hotel",
          value: "self_driver_plus_hotel",
        },
      ],
    },
  ],
  [
    {
      name: fieldNames.stay,
      component: RadioField,
      colCount: 12,
      label: "Hotel Category",
      options: [
        {
          label: "Basic",
          value: "basic",
        },
        {
          label: "3 Star",
          value: "star_3",
        },
        {
          label: "4 Star",
          value: "star_4",
        },
        {
          label: "5 Star",
          value: "star_5",
        },
      ],
    },
    {
      name: fieldNames.car_type,
      component: RadioField,
      colCount: 12,
      label: "Budget Range For Vehicle (with Driver)",
      options: [
        {
          label: "Hatchbook",
          value: "hatchbook",
        },
        {
          label: "Sedan",
          value: "Sedan",
        },
        {
          label: "Compact 7 Seater",
          value: "Seater_7_Compact",
        },
        {
          label: "Heavy 7 Seater",
          value: "Seater_7_Heavy",
        },
      ],
    },
    {
      name: fieldNames.car_budget_range,
      component: RangeField,
      colCount: 12,
      label: "Budget Range For Car (with Driver)",
      color: "primary",
    },
  ],
  [
    {
      name: fieldNames.quote_source,
      component: RadioField,
      colCount: 12,
      label: "From whom would you like to get quotes",
      options: [
        { label: "Individual Cab Drivers", value: "individual_cab_drivers" },
        { label: "Regular Tour Agencies", value: "regular_tour_agencies" },
        { label: "Premium Tour Agencies", value: "premium_tour_Agencies" },
        { label: "Mix of All of the Above", value: "mix_of_all_of_the_above" },
      ],
    },
  ],
];

export const reviewFields = [
  {
    name: fieldNames.children,
    placeholder: "children",
    component: CounterField,
    colCount: 6,
    color: "primary",
    label: "Children",
  },
  {
    name: fieldNames.adults,
    placeholder: "Adults",
    component: CounterField,
    colCount: 6,
    color: "primary",
    label: "Adults",
  },
  {
    name: fieldNames.requirement,
    component: TextField,
    colCount: 12,
    label: "Destination (One or More)",
    options: [
      {
        label: "Full Tour Package (Transport, Hotel)",
        value: "full_tour_package",
      },
      {
        label: "Car with Driver",
        value: "car_with_driver",
      },
      {
        label: "Self Drive Car",
        value: "self_drive_car",
      },
      {
        label: "Only Hotel",
        value: "only_hotel",
      },
      {
        label: "Self Drive Car + Hotel",
        value: "self_driver_plus_hotel",
      },
    ],
    select: true,
  },

  {
    name: fieldNames.stay,
    component: TextField,
    colCount: 12,
    label: "Hotel Category",
    options: [
      {
        label: "Basic",
        value: "basic",
      },
      {
        label: "3 Star",
        value: "star_3",
      },
      {
        label: "4 Star",
        value: "star_4",
      },
      {
        label: "5 Star",
        value: "star_5",
      },
    ],
    select: true,
  },
  {
    name: fieldNames.car_type,
    component: TextField,
    colCount: 12,
    label: "Budget Range For Vehicle (with Driver)",
    options: [
      {
        label: "Hatchbook",
        value: "hatchbook",
      },
      {
        label: "Sedan",
        value: "Sedan",
      },
      {
        label: "Compact 7 Seater",
        value: "Seater_7_Compact",
      },
      {
        label: "Heavy 7 Seater",
        value: "Seater_7_Heavy",
      },
    ],
    select: true,
  },
  {
    name: fieldNames.car_budget_range,
    component: RangeField,
    colCount: 12,
    label: "Budget Range For Car (with Driver)",
    color: "primary",
  },

  {
    name: fieldNames.quote_source,
    component: TextField,
    colCount: 12,
    label: "Budget Range For Vehicle (with Driver)",
    options: [
      { label: "Individual Cab Drivers", value: "individual_cab_drivers" },
      { label: "Regular Tour Agencies", value: "regular_tour_agencies" },
      { label: "Premium Tour Agencies", value: "premium_tour_Agencies" },
      { label: "Mix of All of the Above", value: "mix_of_all_of_the_above" },
    ],
    select: true,
  },
];

export const initialValues: FieldValueType = {
  [fieldNames.children]: 0,
  [fieldNames.adults]: 0,
  [fieldNames.requirement]: "full_tour_package",
  [fieldNames.stay]: "star_4",
  [fieldNames.car_type]: "Seater_7_Compact",
  [fieldNames.car_budget_range]: "5000",
  [fieldNames.quote_source]: "",
};
