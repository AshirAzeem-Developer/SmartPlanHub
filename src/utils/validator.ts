// Note: try to return boolean value from all the functions

export const validateEmail = (email: string) => {
  const re = /^(?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$)/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return strongPasswordRegex.test(password);
};

export const validatePhoneNo = (phoneNo: string) => {
  return phoneNo.length >= 9;
};
