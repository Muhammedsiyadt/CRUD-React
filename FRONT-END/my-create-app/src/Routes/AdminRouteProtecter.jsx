import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminRouteProtecter = () => {

    const status = useSelector(state => state.admin.admin.status)  
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
     {status ? <Outlet /> : navigate('/adminlogin')}    
    </div>
  )
}

export default AdminRouteProtecter
