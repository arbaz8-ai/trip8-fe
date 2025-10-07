import { PreferredPriceType, TripInfo } from "@/types/itenary/Itenary";

import Adventure from "@/assets/icons/adventure.svg";
import Baggage from "@/assets/icons/baggage.svg";
import CheckboxField from "@/components/checkboxField/CheckboxField";
import CounterField from "@/components/counterField/CounterField";
import Diamond from "@/assets/icons/diamond.svg";
import Family_group from "@/assets/icons/family_group.svg";
import Group_family from "@/assets/icons/group_family.svg";
import Leisure from "@/assets/icons/leisure.svg";
import MultipleCardField from "@/components/multipleCardField/MultipleCardField";
import RadioField from "@/components/radioField/RadioField";
import TextField from "@/components/textField/TextField";

export enum fieldNames {
  starting = "starting",
  destination = "destination",
  days = "days",
  nights = "nights",
  trip_info = "trip_info",
  trip_goals = "trip_goals",
  itenary_type = "itenary_type",
  trip_types = "trip_types",
  preference = "preference",
  preferred_price = "preferred_price",
  age_group = "age_group",
  has_kids = "has_kids",
  place_preference = "place_preference",
  place_comment = "place_comment",
  additional_activity = "additional_activity",
  food_preference = "food_preference",
  food_budget = "food_budget",
  food_comment = "food_comment",
  places = "places",
  price = "price",
  status = "status",
  tags = "tags",
}

export type TripInfoFieldTypes = TripInfo;

export interface FieldValueType {
  [fieldNames.starting]: string;
  [fieldNames.destination]: string;
  [fieldNames.days]: number;
  [fieldNames.nights]: number;
  [fieldNames.trip_info]: TripInfoFieldTypes;
  [fieldNames.price]: number;
  [fieldNames.status]: "ACTIVE" | "INACTIVE";
  [fieldNames.tags]: { name: string; icon: any }[];
}

export const fields = [
  [
    {
      name: fieldNames.destination,
      placeholder: "Enter Your Destination",
      component: TextField,
      color: "primary",
      label: "Destination (One or More)",
    },
    {
      name: fieldNames.days,
      placeholder: "Enter Your Destination",
      component: CounterField,
      color: "primary",
      label: "Number of Days",
    },
    {
      name: `${fieldNames.trip_info}.${fieldNames.trip_goals}`,
      placeholder: "",
      component: TextField,
      color: "primary",
      label: "Write Your Trip goals",
      multiline: true,
      rows: 4,
    },
    {
      name: `${fieldNames.trip_info}.${fieldNames.itenary_type}`,
      component: RadioField,
      label: "What type of Itinerary do you  want?",
      options: [
        {
          label: "Hyper-Personalised (You’ll need to answer a few question)",
          value: "PERSONALISED",
        },
        {
          label:
            "Quick itinerary with popular tourist spot suggestions (Instant)",
          value: "INSTANT",
        },
      ],
    },
  ],
  [
    {
      name: `${fieldNames.trip_info}.${fieldNames.trip_types}`,
      component: MultipleCardField,
      label: "Select Your Trip Type (Multi Select)",
      options: [
        {
          label: "Adventure",
          value: "ADVENTURE",
          Icon: Adventure,
        },
        {
          label: "Leisure",
          value: "LEISURE",
          Icon: Leisure,
        },
        {
          label: "Family",
          value: "FAMILY",
          Icon: Family_group,
        },
        {
          label: "Honeymoon",
          value: "HONEYMOON",
          Icon: Baggage,
        },
        {
          label: "Off Beat",
          value: "OFF_BEAT",
          Icon: Group_family,
        },
        {
          label: "Luxury",
          value: "LUXURY",
          Icon: Diamond,
        },
      ],
    },
    {
      name: `${fieldNames.trip_info}.${fieldNames.preference}`,
      component: RadioField,
      label: "What’s Your Preference?",
      options: [
        {
          label: "Trip at Lowest Cost",
          value: "TRIP_AT_LOWEST_COST",
        },
        {
          label: "Value for Money Trip",
          value: "VALUE_FOR_MONEY_TRIP",
        },
        {
          label: "Superior experience at a little higher price",
          value: "SUPERIOR_EXPERIENCE_AT_A_LITTLE_HIGHER_PRICE",
        },
      ],
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.preferred_price}`,
      component: RadioField,
      label: "Preferred Price",
      options: [
        {
          label: "Relaxed",
          value: "RELAXED",
        },
        {
          label: "Balanced",
          value: "BALANCED",
        },
        {
          label: "Packed",
          value: "PACKED",
        },
      ],
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.age_group}`,
      component: RadioField,
      label: "Age Group",
      options: [
        {
          label: "Up to 25",
          value: "UP_TO_25",
        },
        {
          label: "25 to 35",
          value: "25_TO_35",
        },
        {
          label: "35 to 45",
          value: "35_TO_45",
        },
        {
          label: "45 to 55",
          value: "45_TO_55",
        },
        {
          label: "55+",
          value: "55+",
        },
      ],
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.has_kids}`,
      component: RadioField,
      label: "Travelling with Kids?",
      options: [
        {
          label: "Relaxed",
          value: "RELAXED",
        },
        {
          label: "Balanced",
          value: "BALANCED",
        },
      ],
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.place_preference}`,
      component: RadioField,
      label: "What type of places do you prefer?",
      options: [
        {
          label: "Crowded, Touristy",
          value: "CROWDED",
        },
        {
          label: "Off-Beat, Less Crowded",
          value: "OFF-BEAT",
        },
        {
          label: "Mix of Both",
          value: "MIX",
        },
      ],
    },
  ],
  [
    {
      name: `${fieldNames.trip_info}.${fieldNames.place_comment}`,
      component: TextField,
      label: "Additional Comments if any (Optional)",
      color: "primary",
      multiline: true,
      rows: 4,
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.additional_activity}`,
      component: CheckboxField,
      label: "Activity Interests (Select all Applicable)",
      options: [
        {
          label: "Tourist Places",
          value: "TOURIST_PLACES",
        },
        {
          label: "Bungee Jumping",
          value: "BUNGEE_JUMPING",
        },
        {
          label: "River Boating",
          value: "RIVER_BOATING",
        },
        {
          label: "Trekking",
          value: "TREKKING",
        },
        {
          label: "Shopping",
          value: "SHOPPING",
        },
        {
          label: "Culture & Heritage",
          value: "CULTURE_HERITAGE",
        },
        {
          label: "Wild Life",
          value: "WILD_LIFE",
        },
        {
          label: "Camping",
          value: "CAMPING",
        },
        {
          label: "Zipline",
          value: "ZIPLINE",
        },
      ],
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.food_preference}`,
      component: RadioField,
      label: "Restaurant Preference",
      options: [
        {
          label: "Veg",
          value: "VEG",
        },
        {
          label: "Pure Veg",
          value: "PURE_VEG",
        },
        {
          label: "Non-Veg",
          value: "NON_VEG",
        },
        {
          label: "Local Cuisines",
          value: "LOCAL_CUISINES",
        },
      ],
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.food_budget}`,
      component: RadioField,
      label: "Food Budget",
      options: [
        {
          label: "Budget",
          value: "BUDGET",
        },
        {
          label: "Mid Range",
          value: "MID_RANGE",
        },
        {
          label: "Fine Dining",
          value: "FINE_DINING",
        },
      ],
    },

    {
      name: `${fieldNames.trip_info}.${fieldNames.food_comment}`,
      component: TextField,
      label: "Additional Comments if any (Optional)",
      color: "primary",
      multiline: true,
      rows: 4,
    },
  ],
];

const tripInfoIntialValues: TripInfoFieldTypes = {
  trip_goals: "",
  itenary_type: "",
  trip_types: [],
  preference: "",
  preferred_price: PreferredPriceType.BALANCED,
  age_group: "",
  has_kids: false,
  place_preference: "",
  place_comment: "",
  additional_activity: "",
  food_preference: "VEG",
  food_budget: "BUDGET",
  food_comment: "",
  places: [],
};

export const intitialValues: FieldValueType = {
  [fieldNames.starting]: "",
  [fieldNames.destination]: "",
  [fieldNames.days]: 0,
  [fieldNames.nights]: 0,
  [fieldNames.trip_info]: tripInfoIntialValues,
  [fieldNames.price]: 0,
  [fieldNames.status]: "ACTIVE",
  [fieldNames.tags]: [],
};
