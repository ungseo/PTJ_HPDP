import axios from "axios";
import { useSelector } from "react-redux";

export const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const membersApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/members`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const membersApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/members`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const companiesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/companies`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const companiesApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/companies`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const fundingsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/fundings`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fundingsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/fundings`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const pointsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/points`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const pointsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/points`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const interestsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/interests`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const interestsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/interests`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const banksApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/banks`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const banksApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/banks`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const paymentsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/payments`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const messagesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/messages`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const messagesApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/messages`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const articlesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/articles`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const articlesApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/articles`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const newsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/news`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const newsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/news`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
