export interface PersonalData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
}

export interface AddressAndWork {
  workplace: string;
  address: string;
}

export interface LoanParameters {
  amount: number;
  term: number;
}

export interface FormData {
  personalData: PersonalData;
  addressAndWork: AddressAndWork;
  loanParameters: LoanParameters;
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface ValidationErrors {
  [key: string]: string;
}
