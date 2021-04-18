import React from 'react'
import { isLoggedInVar } from '../apollo'

export const LoggedOutRouter  =() => {
    const onClick = () => {
        isLoggedInVar(true);
    }
    
    return(
        <>
        <h1>Logged out</h1>
        <button onClick ={onClick}>Click to log In</button>
        </>
    )
}