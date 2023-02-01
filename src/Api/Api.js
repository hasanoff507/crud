import axios from 'axios'
export const Urls = "http://localhost:8000/employee/"

const api = axios.create({
    baseURL:Urls
})

