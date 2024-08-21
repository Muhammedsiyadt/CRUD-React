import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLoginProtecter = () => {

    const status = useSelector(state => state.user.user.status)  
    console.log(status); 
    
    useEffect(() => {
      
        setLoading(false)
        
    },[])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    if(loading) {
        return <div>Loading..</div>
    }


    
  return (
    <div>
     {!status ? <Outlet /> : navigate('/')}   
    </div>
  )
}

export default UserLoginProtecter
