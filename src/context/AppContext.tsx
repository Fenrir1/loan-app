import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  FormData,
  PersonalData,
  AddressAndWork,
  LoanParameters,
} from "../types";

const initialState: FormData = {
  personalData: {
    phone: "",
    firstName: "",
    lastName: "",
    gender: "male",
  },
  addressAndWork: {
    workplace: "",
    address: "",
  },
  loanParameters: {
    amount: 200,
    term: 10,
  },
};

type AppAction =
  | { type: "UPDATE_PERSONAL_DATA"; payload: Partial<PersonalData> }
  | { type: "UPDATE_ADDRESS_AND_WORK"; payload: Partial<AddressAndWork> }
  | { type: "UPDATE_LOAN_PARAMETERS"; payload: Partial<LoanParameters> }
  | { type: "RESET_FORM" };

const appReducer = (state: FormData, action: AppAction): FormData => {
  switch (action.type) {
    case "UPDATE_PERSONAL_DATA":
      return {
        ...state,
        personalData: { ...state.personalData, ...action.payload },
      };
    case "UPDATE_ADDRESS_AND_WORK":
      return {
        ...state,
        addressAndWork: { ...state.addressAndWork, ...action.payload },
      };
    case "UPDATE_LOAN_PARAMETERS":
      return {
        ...state,
        loanParameters: { ...state.loanParameters, ...action.payload },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

interface AppContextType {
  state: FormData;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
