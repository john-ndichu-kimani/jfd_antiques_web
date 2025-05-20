// src/hooks/useAuthForm.ts
import { useState, FormEvent } from 'react';

type FormErrors<T> = {
  [K in keyof T]?: string;
};

interface UseAuthFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => FormErrors<T>;
}

export function useAuthForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseAuthFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    // Clear field error when user starts typing
    if (errors[name as keyof T]) {
      setErrors({ ...errors, [name]: undefined });
    }
    
    // Clear general submit error when user makes changes
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Validate form if validation function is provided
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Form submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
  };

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
}

// Example validation functions
export const validateRegistration = (values: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const errors: FormErrors<typeof values> = {};
  
  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  // Password validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  // First name validation
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }
  
  // Last name validation
  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }
  
  return errors;
};

export const validateLogin = (values: { email: string; password: string }) => {
  const errors: FormErrors<typeof values> = {};
  
  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  }
  
  // Password validation
  if (!values.password) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

export const validatePasswordUpdate = (values: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const errors: FormErrors<typeof values> = {};
  
  // Current password validation
  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }
  
  // New password validation
  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'New password must be at least 8 characters';
  }
  
  // Confirm password validation
  if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};

export const validateForgotPassword = (values: { email: string }) => {
  const errors: FormErrors<typeof values> = {};
  
  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  return errors;
};

export const validateResetPassword = (values: {
  newPassword: string;
  confirmPassword: string;
}) => {
  const errors: FormErrors<typeof values> = {};
  
  // New password validation
  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'New password must be at least 8 characters';
  }
  
  // Confirm password validation
  if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};