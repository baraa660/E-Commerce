import * as yup from 'yup';


export const registerSchema= yup.object({
  userName:yup.string().required("user name is required").min(3,"must be at least 3 char").max(30,"less han 30 char"),
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"less han 30 char")
}) 


export const loginSchema= yup.object({
  
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"less han 30 char")
}) 

export const sendCodeSchema= yup.object({
  
  email:yup.string().required("email is required").email(),
  
}) 

export const priceSchema= yup.object({
  
  minPrice:yup.number(),
  maxPrice:yup.number(),
  
}) 

export const searchSchema= yup.object({
  
  search:yup.string(),
  
}) 



export const ForgotPasswordSchema= yup.object({
  
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"less han 30 char"),
  code:yup.string().required("Code required").min(4,"must be 4 char").max(4,"must be 4 char"),
}) 

export const CheckoutSchemaSchema= yup.object({
  address:yup.string().required("address is required"),
  phone:yup.string().required("phone required"),
}) 


