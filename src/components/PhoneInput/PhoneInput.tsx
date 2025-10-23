import React from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";

import "./PhoneInput.css";
import "react-phone-input-2/lib/style.css";

interface PhoneInputComponentProps {
  value: PhoneInputProps["value"];
  onChange: PhoneInputProps["onChange"];
  error?: string;
}

export const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <PhoneInput
      country={"ru"}
      value={value}
      onChange={onChange}
      placeholder="Введите номер телефона"
      inputClass={`form-control ${error ? "is-invalid" : ""}`}
      buttonClass="btn btn-outline-secondary"
      containerClass="phone-input-container"
      searchClass="form-control"
      dropdownClass="phone-dropdown"
    />
  );
};

PhoneInputComponent.displayName = "PhoneInputComponent";
