import { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode'
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "./token";

export const useAuthentication = () =>{
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    useEffect(()=>{
        const auth = async () =>{
            const token = localStorage.getItem(ACCESS_TOKEN)
            const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN)
            console.log('Access_token', token)
            console.log('Google_access_token', googleAccessToken)

            if(token){
                const decoded = jwtDecode(token)
                const tokenExpiration = decoded.exp
                const now = Date.now()/1000
                if(tokenExpiration < now){
                    await REFRESH_TOKEN();
                }else{
                    setIsAuthenticated(true)
                }
            }else if(googleAccessToken){
                const isGoogleTokenValid = await validateGoogleToken(googleAccessToken)
                console.log("google toke is valid", isGoogleTokenValid)
                if(isGoogleTokenValid){
                    setIsAuthenticated(true)
                } else{
                    setIsAuthenticated(false)
                }
            }else{
                setIsAuthenticated(false)
            }
        }
        auth().catch(()=> setIsAuthenticated(false))
       
    }, [])

    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            })
            if(res.status == 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthenticated(true)
            }else{   
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error('error refreshing token', error)
            setIsAuthenticated(false)
        }
    }

    const validateGoogleToken = async(googleAccessToken) => {
        try {
            const res = await api.post('/api/google/validate_token/', {
                access_tokem: googleAccessToken
            }, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            console.log('Validated res', res.data)
            return res.data.valid
            
        } catch (error) {
            console.error('error validating google', error)
            return false
        }
    }

    const logout = () =>{
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(GOOGLE_ACCESS_TOKEN)
        setIsAuthenticated(false)
        window.location.reload()
    }
    return {isAuthenticated, logout}
}