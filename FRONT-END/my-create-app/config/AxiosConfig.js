import axios from "axios"


const base = "http://localhost:3000"
const API = axios.create({baseURL:base, withCredentials: true }) 

export default API  