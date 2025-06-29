import Link from "next/link";
import LogoButton from "../../Assets/IconButtons/LogoButton";
import { IconGmail, IconLocation, IconMail, IconOK, IconPhoneCall, IconTelegram, IconTwitter, IconVK, IconYouTube } from "../../Assets";
import ThemeSwitcher from "../../ThemeSwitcher";


function MinFooter() {

   return (
      <footer className=" pt-9 pb-5  flex flex-col relative w-full h-[117px]">

         <svg className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1440 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none">

            <g filter="url(#filter0_i_226_1060)">
               <path d="M1440 117H0V0C0.00020308 14.7465 11.9546 26.701 26.7012 26.7012H1413.3C1428.05 26.7011 1440 14.7465 1440 0V117Z" fill="#D0D0D0" fillOpacity="0.5" />
            </g>

            <defs>
               <filter id="filter0_i_226_1060" x="0" y="0" width="1440" height="127" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="10" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_226_1060" />
               </filter>
            </defs>
         </svg>

         <div className="relative z-100 flex pt-[5px] pl-[11vw] pr-[11vw] gap-x-[10vw]">
            <div className='z-[1] flex flex-row justify-between w-full'>

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

               <div className='gap-y-[10px] text-[12px] pt-[5px]'>
                  Администрация:
                  <div className='flex flex-row gap-x-[30px]'>

                     <div className='pl-[10px] text-[10px] leading-4'>
                        <div className='flex gap-x-[4px] items-center'>
                           <IconLocation />
                           ул. 20-летия Октября, 84
                        </div>
                        <div className='flex gap-x-[4px] items-center'>
                           <IconPhoneCall />
                           +7 (473) 207-22-20
                        </div>
                     </div>

                     <div className='pl-[10px] text-[10px] leading-4'>
                        <div className='flex gap-x-[4px] items-center'>
                           <IconMail />
                           rector@cchgeu.ru
                        </div>
                        <div className='flex gap-x-[4px] items-center'>
                           <IconMail />
                           rector@vorstu.ru
                        </div>
                     </div>

                     <div className='pl-[10px] text-[10px] leading-4'>

                        <div className='flex items-center gap-x-[4px] pb-[2px] '>
                           <IconMail />
                           rector@vgasu.vrn.ru
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

            </div>
         </div>
         <div className='absolute bottom-0 right-0 flex justify-end z-20'>
            <ThemeSwitcher />
         </div>

      </footer>

   );
}
export default MinFooter 
