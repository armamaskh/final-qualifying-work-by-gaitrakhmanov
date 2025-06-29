import axios from 'axios';




export const AxiosInstance = ( accessToken = '') => {
   const axiosInstance = axios.create({
      baseURL: process.env.SERVER_URL,
      headers: {  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}` }   });

   const axiosGet = async(url: string = '') => {
      console.log('SERVER_URL:', process.env.SERVER_URL);
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

