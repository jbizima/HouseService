import axios from "axios";
import { ACCESS_TOKEN } from "./token";

// connectiong backend with frontend

const apiUrl = '/choreo-apis/awbo/backend/rest-api-be2/v1.0'
const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API ? import.meta.env.VITE_REACT_APP_API : apiUrl,
})

api.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        const googleAccessToken = localStorage.getItem('GOOGLE_ACCESS_TOKEN')
        if(googleAccessToken){
            config.headers["X-Google-Access-Token"] = `Bearer ${googleAccessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api