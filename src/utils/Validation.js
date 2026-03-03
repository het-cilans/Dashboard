export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone.trim());
};

export const validateName = (name) => {
  return name.trim().length >= 3;
};

export const validateField = (fieldName, value) => {
  let error = '';

  switch (fieldName) {
    case 'name':
      if (!value || value.trim() === '') {
        error = 'Name is required';
      } else if (value.trim().length < 3) {
        error = 'Name must be at least 3 characters';
      }
      break;
    case 'email':
      if (!value || value.trim() === '') {
        error = 'Email is required';
      } else if (!validateEmail(value)) {
        error = 'Please enter a valid email address';
      }
      break;
    case 'phone':
      if (!value || value.trim() === '') {
        error = 'Phone is required';
      } else if (!validatePhone(value)) {
        error = 'Phone must contain numbers only';
      }
      break;
    case 'companyName':
      if (!value || value.trim() === '') {
        error = 'Company Name is required';
      }
      break;
    default:
      break;
  }

  return error;
};

export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      errors[key] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};
