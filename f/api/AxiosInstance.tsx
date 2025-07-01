import axios from 'axios';



export const AxiosInstance = ( accessToken = '') => {

   const BASE_URL =
    typeof window === "undefined"
      ? process.env.SERVER_URL 
      : process.env.NEXT_PUBLIC_SERVER_URL; 


   const axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken || "HnpHiTBp0DSyMmGzFVyHJDknNki-aNGeS6XKzaRHjFo"}` }   });

   const axiosGet = async(url: string = '') => {
      const response = await axiosInstance.get(url);
      return response.data; }

   const axiosPost = async(url: string = '', obj: object = {}) => {
      const response = await axiosInstance.post(url, obj);
      return response.data; }

   const axiosPut = async(url: string = '', obj: object = {}) => {
      const response = await axiosInstance.put(url, obj);
      return response.data; }

   const axiosPatch = async(url: string = '', obj: object = {}) => {
      const response = await axiosInstance.patch(url, obj);
      return response.data; }
   
   const axiosDelete = async(url: string = '') => {
      const response = await axiosInstance.delete(url);
      return response.data; }

   const axiosBlob = async(url: string = '') => {
      const response = await axiosInstance.get(url, { responseType: 'blob' });
      return response.data; };

   return { axiosGet,
            axiosPost,
            axiosPatch,
            axiosPut,
            axiosDelete, 
            axiosBlob };
}

