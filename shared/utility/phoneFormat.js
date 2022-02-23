export const phoneFormat = (number) => {
  if (!number) {
    return "";
  }
  const phoneNumber = number.replace(/[^\d]/g, "");
  const phoneLength = phoneNumber.length;
  if (phoneLength < 4) return phoneNumber;

  if (phoneLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6)}`;
};
