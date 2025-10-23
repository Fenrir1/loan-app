export const getCleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

export const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return "";
  const cleanPhone = getCleanPhoneNumber(phone);
  return cleanPhone.startsWith("+") ? phone : `+${cleanPhone}`;
};
