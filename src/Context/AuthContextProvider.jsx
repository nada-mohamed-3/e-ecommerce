import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
export let AuthContext = createContext()
export default function AuthContextProvider({children}) {
    let [token, setToken] = useState(null)
    let [userData, setuserData] = useState(null)
    
     useEffect(()=>{
      let TokenStorage = localStorage.getItem('token')
         if(TokenStorage){
             setToken(TokenStorage)
             decodeData(TokenStorage)
         }
     },[])

     function decodeData(token){
       let data = jwtDecode(token)
       setuserData(data)
     }

    return (
    <AuthContext.Provider value={{token, setToken,userData,decodeData}}>
      {children}
    </AuthContext.Provider>
  )
}
