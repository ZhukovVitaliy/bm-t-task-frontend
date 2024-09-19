export function validatePassword(password) {
  const passwordRegex =
    /^(?!.*[^\w\s].*[^\w\s]$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{4,18}[A-Za-z\d]$/;

  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message:
        'Password must be 6-20 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character. Special characters cannot be at the start or end of the password.',
    };
  }

  return {
    valid: true,
    message: 'Password is valid.',
  };
}
