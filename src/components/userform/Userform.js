import React, { useState, useEffect } from 'react';
import { validateField, validateForm } from '../../utils/Validation';
import './Userform.css';

const UserForm = ({ onSubmit, isLoading }) => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { isValid: valid } = validateForm(formData);
    setIsValid(valid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid: valid, errors: validationErrors } = validateForm(formData);

    if (!valid) {
      setErrors(validationErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        companyName: true,
      });
      return;
    }


    const combinedName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    const trimmedData = {
      name: combinedName,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      companyName: formData.companyName.trim(),
    };

    onSubmit(trimmedData);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>

      <form onSubmit={handleSubmit} className="user-form">

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="First Name"
              className={errors.firstName && touched.firstName ? "error" : ""}
              disabled={isLoading}
            />
            <div className="error-box">
              {errors.firstName && touched.firstName && errors.firstName}
            </div>
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Last Name"
              className={errors.lastName && touched.lastName ? "error" : ""}
              disabled={isLoading}
            />
            <div className="error-box">
              {errors.lastName && touched.lastName && errors.lastName}
            </div>
          </div>
        </div>

    
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className={errors.email && touched.email ? "error" : ""}
              disabled={isLoading}
            />
            <div className="error-box">
              {errors.email && touched.email && errors.email}
            </div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Phone"
              className={errors.phone && touched.phone ? "error" : ""}
              disabled={isLoading}
            />
            <div className="error-box">
              {errors.phone && touched.phone && errors.phone}
            </div>
          </div>
        </div>

       
        <div className="form-group full-width">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Company Name"
            className={errors.companyName && touched.companyName ? "error" : ""}
            disabled={isLoading}
          />
          <div className="error-box">
            {errors.companyName && touched.companyName && errors.companyName}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={isLoading || !isValid}>
            {isLoading ? "Adding..." : "Add User"}
          </button>

          <button type="button" className="reset-button" onClick={handleReset} disabled={isLoading}>
            Reset
          </button>
        </div>

      </form>
    </div>
  );
};

export default UserForm;