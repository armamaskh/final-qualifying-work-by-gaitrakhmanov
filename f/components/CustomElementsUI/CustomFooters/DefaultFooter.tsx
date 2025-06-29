import Link from "next/link";
import LogoButton from "../../Assets/IconButtons/LogoButton";
import { IconGmail, IconLocation, IconMail, IconOK, IconPhoneCall, IconTelegram, IconTwitter, IconVK, IconYouTube } from "../../Assets";
import ThemeSwitcher from "../../ThemeSwitcher";


function DefaultFooter() {

   return (
      <footer className=" pt-8 pb-5  flex flex-col relative w-full h-[203px] ">

         <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1440 203"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none">


            <g filter="url(#filter0_i_226_1365)">
               <path d="M1440 202.832H0V0C0.00020308 14.7465 11.9546 26.701 26.7012 26.7012H1413.3C1428.05 26.7011 1440 14.7465 1440 0V202.832Z" fill="#D0D0D0" fillOpacity="0.5" />
            </g>

            <defs>
               <filter id="filter0_i_226_1365" x="0" y="0" width="1440" height="212.832" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="10" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_226_1365" />
               </filter>
            </defs>

         </svg>

         <div className="relative z-100 flex pt-[5px] pl-[11vw] pr-[11vw] gap-x-[10vw]">
            <div className='z-[1] flex flex-col flex-shrink-0 gap-y-[10px]'>
               <div className='flex items-center gap-x-[35px]'>
                  <Link href="/home" className="w-[60px] h-[68px]">
                     <LogoButton />
                  </Link>

                  <div className='border-l-2 border-foreground h-10' />

                  <div className='flex flex-col text-base'>
                     <div>ВОРОНЕЖСКИЙ ГОСУДАРСТВЕННЫЙ</div>
                     <div>ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ</div>
                  </div>
               </div>

               <div className='flex'>
                  <div className='text-xs h-[70px] w-[270px] leading-3'>
                     Официальный сайт<br />
                     Федерального государственного<br />
                     бюджетного образовательного учреждения<br />
                     высшего образования<br />
                     «Воронежский государственный<br />
                     технический университет»<br />
                  </div>

                  <div className='text-xs h-[70px] w-[230px] leading-3'>
                     Учредители - Российская Федерация.<br />
                     Функции и полномочия <br />
                     учредителя осуществляет <br />
                     Министерство науки <br />
                     и высшего образования <br />
                     Российской Федерации.<br />
                  </div>
               </div>
            </div>

            <div className='h-[130px] w-[160px] flex-grow min-w-0 flex flex-col pt-[13px] gap-y-[11px] text-[10px] leading-2.5'>
               <Link href={"https://cchgeu.ru/sveden/"}
                  className='w-[153px] h-[30px]'>
                  Сведения об <br />
                  образовательной <br />
                  организации
               </Link>

                  <Link href={"https://cchgeu.ru/university/protivodeystvie-korruptsii/svedeniya-o-dokhodakh/"}
                     className='w-[160px] h-[50px]'>
                     Сведения о доходах, <br />
                     расходах, <br />
                     об имуществе и <br />
                     обязательствах <br />
                     имущественного характера
                  </Link>

               <Link href={"http://s.cchgeu.ru/policy"}
                  className='w-[171px] h-[30px]'>
                  Политика в отношении <br />
                  обработки <br />
                  персональных данных
               </Link>
            </div >

            <div className='flex flex-col flex-shrink-0 text-xs pt-[13px] h-[99px] w-[156px]'>
               <div className='flex flex-col gap-y-[7px]'>
                  Администрация:

                  <div className='flex flex-col text-[10px] pl-[10px] '>
                     <div className='flex gap-x-[4px] items-center'>
                        <IconLocation />
                        ул. 20-летия Октября, 84
                     </div>
                     <div className='flex gap-x-[4px] items-center'>
                        <IconPhoneCall />
                        +7 (473) 207-22-20
                     </div>
                     <div className='flex gap-x-[4px] items-center'>
                        <IconMail />
                        rector@cchgeu.ru
                     </div>
                     <div className='flex gap-x-[4px] items-center'>
                        <IconMail />
                        rector@vorstu.ru
                     </div>
                     <div className='flex gap-x-[4px] items-center'>
                        <IconMail />
                        rector@vgasu.vrn.ru
                     </div>
                  </div>

                  <div className='flex gap-x-[16px]'>
                     <IconVK />
                     <IconTelegram />
                     <IconOK />
                     <IconGmail />
                     <IconYouTube />
                     <IconTwitter />
                  </div>
               </div>



            </div>
         </div>
         <div className='fixed bottom-0 right-0 flex justify-end z-[100]'>
            <ThemeSwitcher />
         </div>
      </footer>

   );
}
export default DefaultFooter 
