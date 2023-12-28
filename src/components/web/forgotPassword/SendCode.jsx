// SendCode.jsx

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sendCodeSchema } from '../validation/Validate.js';
import styles from './SendCode.module.css';

export default function SendCode() {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
  };

  const onSubmit = async (users) => {
    setErrorBack('');

    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, users);

      navigate('/forgotpassword');
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  let [errorBack, setErrorBack] = useState('');

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendCodeSchema,
  });

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Enter your email, will send a confirmation code to this email</p>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="User email"
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className={styles.error}>{formik.touched && formik.errors.email && <p className={styles.errorMessage}>{formik.errors.email}</p>}</div>
        </div>

        {errorBack && <p className={styles.error}>{errorBack}</p>}
        <div className={styles.buttonContainer}>
          <input type="submit" className={styles.submitButton} value="Send Code" />
        </div>
      </form>
    </div>
  );
}