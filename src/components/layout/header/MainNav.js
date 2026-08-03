import Link from 'next/link';
import Image from "next/image";

export default function MainNav({ data, isHome, collapsed }) {


    return (
        <nav className="flex justify-between pt-5 pb-4 text-lg text-foreground-fixed relative">
            {(collapsed || !isHome) &&
                <Link href="/">
                    <Image src={data.logo.path} alt={data.logo.alt} width={343} height={122} className="h-auto w-32"/>
                </Link>
            }


            <ul className="flex items-center gap-7 text-white">
                {data.menu.map((item) => (
                    <li key={item.link}>
                        <Link href={item.link} className="hover:text-white/70 transition-colors">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

           <div className={'flex justify-center items-center gap-10'}>
               <div className="flex items-center gap-4">
                   {data.messengers.map((messenger) => (
                       <a key={messenger.name} href={messenger.url} className="flex items-center gap-2.5 transition hover:opacity-60">
                           <Image src={messenger.logo} alt={messenger.alt} width={60} height={60} className="size-[30px]"/>
                           <span className={'relative before:absolute before:bottom-[3] before:w-full before:h-[1] before:bg-foreground-fixed'}>{messenger.name}</span>
                       </a>
                   ))}
               </div>

               <div className="flex items-center gap-4">
                   {data.socials.map((social) => (
                       <a key={social.name} href={social.url} className="transition hover:opacity-60">
                           <Image src={social.logo} alt={social.alt} width={60} height={60} className="size-[30px]"/>
                       </a>
                   ))}
               </div>
           </div>
        </nav>
    );
}