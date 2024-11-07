export interface iValidationResponse {
  message: string;
  valid: boolean;
}

export function validatePassword(password: string): iValidationResponse {
  password = password.trim();

  const passwordPresence = checkPasswordPresent(password);
  if (!passwordPresence.valid) return passwordPresence;

  const passwordLength = checkPasswordLength(password);
  if (!passwordLength.valid) return passwordLength;

  const upperCase = checkForUpperCase(password);
  if (!upperCase.valid) return upperCase;

  const lowerCase = checkForLowerCase(password);
  if (!lowerCase.valid) return lowerCase;

  const num = checkForNumber(password);
  if (!num.valid) return num;

  //   const symbol = checkForSymbol(password);
  //   if (!symbol.valid) return symbol;

  return {
    valid: true,
    message: "",
  };
}

export function checkPasswordPresent(password: string) {
  return {
    message: !password ? "Required" : "",
    valid: password.length > 0,
  };
}

export function checkPasswordLength(password: string) {
  return {
    message:
      password.length < 8 ? "Password must be at least 8 characters long" : "",
    valid: password.length >= 8,
  };
}

export function checkForUpperCase(password: string) {
  const doesNotHaveUppercase = !/[A-Z]/.test(password);
  return {
    message: doesNotHaveUppercase
      ? "Password must contain at least one uppercase letter"
      : "",
    valid: !doesNotHaveUppercase,
  };
}

export function checkForLowerCase(password: string) {
  const doesNotHaveLowercase = !/[a-z]/.test(password);
  return {
    message: doesNotHaveLowercase
      ? "Password must contain at least one lowercase letter"
      : "",
    valid: !doesNotHaveLowercase,
  };
}

export function checkForNumber(password: string) {
  const doesNotHaveNumber = !/[0-9]/.test(password);
  return {
    message: doesNotHaveNumber
      ? "Password must contain at least one number"
      : "",
    valid: !doesNotHaveNumber,
  };
}

export function checkForSymbol(password: string) {
  const doesNotHaveSymbol = !/[!@#$%^&*()_+\-=\[\]{}|;':"\\/?]/.test(password);

  return {
    message: doesNotHaveSymbol
      ? "Password must contain at least one symbol"
      : "",
    valid: !doesNotHaveSymbol,
  };
}
