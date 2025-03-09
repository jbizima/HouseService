import axios from "axios";
import { GOOGLE_ACCESS_TOKEN, ACCESS_TOKEN, REFRESH_TOKEN } from "./token";

const google_access = localStorage.getItem(GOOGLE_ACCESS_TOKEN);
const jwt_access = localStorage.getItem(ACCESS_TOKEN);
const refresh_access = localStorage.getItem(REFRESH_TOKEN);
const isDevelopment = import.meta.env.MODE === "production";
const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_API;
      
export const axiosHeader = {
    jwt:jwt_access,
    google:google_access,
    url: url

}      