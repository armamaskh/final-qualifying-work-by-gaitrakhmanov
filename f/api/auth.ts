import  {AxiosInstance}  from "./AxiosInstance";

const {axiosPost} = AxiosInstance();

interface loginRequestDto {
   username: string,
   password: string }

interface registrationRequestDto {
   email: string,
   password: string,
   is_active: true,
   is_superuser: false,
   is_verified: false  }

interface loginResponseDto {
   accessToken: string,
   token_type: string }
   

const signIn = async(loginData: loginRequestDto) => 
   await axiosPost('/login', loginData) as loginRequestDto;

const signUp = async(registerData: registrationRequestDto) => 
   await axiosPost('/register', registerData) as registrationRequestDto;


export const Auth = {
   signIn, signUp }