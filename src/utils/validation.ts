import {
  ValidationErrors,
  PersonalData,
  AddressAndWork,
  LoanParameters,
} from "../types";

export const validatePhone = (phone: string): string | null => {
  if (!phone) {
    return "Телефон обязателен для заполнения";
  }
  return null;
};

export const validateName = (
  name: string,
  fieldName: string
): string | null => {
  if (!name.trim()) {
    return `${fieldName} обязательно для заполнения`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} должен содержать минимум 2 символа`;
  }
  return null;
};

export const validatePersonalData = (data: PersonalData): ValidationErrors => {
  const errors: ValidationErrors = {};

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const firstNameError = validateName(data.firstName, "Имя");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateName(data.lastName, "Фамилия");
  if (lastNameError) errors.lastName = lastNameError;

  if (!data.gender) {
    errors.gender = "Пол обязателен для выбора";
  }

  return errors;
};

export const validateAddressAndWork = (
  data: AddressAndWork
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.workplace.trim()) {
    errors.workplace = "Место работы обязательно для заполнения";
  }

  if (!data.address.trim()) {
    errors.address = "Адрес обязателен для заполнения";
  }

  return errors;
};

export const validateLoanParameters = (
  data: LoanParameters
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (data.amount < 200 || data.amount > 1000) {
    errors.amount = "Сумма займа должна быть от $200 до $1000";
  }

  if (data.term < 10 || data.term > 30) {
    errors.term = "Срок займа должен быть от 10 до 30 дней";
  }

  return errors;
};
