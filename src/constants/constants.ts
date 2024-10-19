export const states: string[] = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nassarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

export const PAYMENT_TARGET = "Revco-Payment-Target";

export interface iStateColors {
  name: string;
  state: string;
  sectionHeader: string;
  sectionItemKey: string;
  otherSectionItemKey: string;
  otherSectionItemValue: string;
  sectionItemValue: string;
  pinHeader: string;
  pinValue: string;
  footer: string;
}

export interface iStateColorData {
  [key: string]: iStateColors;
}

export const stateColorsData: iStateColorData = {
  Taraba: {
    name: "TARABA",
    state: "#B0D8B0",
    sectionHeader: "#D9ECD9",
    sectionItemKey: "#F4BBB933",
    sectionItemValue: "#E6F2E64F",
    otherSectionItemKey: "#F7EEEB",
    otherSectionItemValue: "#E6F2E64F",
    pinHeader: "#D9ECD9",
    pinValue: "#E6F2E64F",
    footer: "#44995808",
  },
};
