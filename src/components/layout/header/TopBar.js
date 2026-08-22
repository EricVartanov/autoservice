import Icon from "@/components/icons/Icon";
import Link from "next/link";
import Image from "next/image";
import {mockBranches} from "@/lib/mock-data";
import {mediaAlt, mediaUrl} from "@/lib/media";

export default function TopBar({logo}) {

    const branches = mockBranches
    const leftBranch = branches[0];
    const rightBranch = branches[1];

    return (
        <div className="flex items-center justify-between">
            {leftBranch && (
                <div className={'text-left hidden lg:flex flex-col text-lg'}>
                    <div className={'flex text-foreground-light-fixed gap-10'}>
                        <span>{leftBranch.name}</span>
                        <span>{leftBranch.workHours}</span>
                    </div>
                    <div className={'flex gap-5'}>
                        <span>{leftBranch.address}</span>
                        <div className="hover:opacity-60 transition flex gap-2 items-center">
                            <Icon name={'phone-filled'} className="size-5 text-foreground-fixed"/>
                            <a href={`tel:${leftBranch.phone}`}>
                                {leftBranch.phone}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <Link className={'absolute left-1/2 transform -translate-x-1/2 top-[15]'} href="/">
                <Image src={mediaUrl(logo)} alt={mediaAlt(logo)} loading='eager' width={343} height={122} className="h-auto w-24 md:w-36 xl:w-[172px]"/>
            </Link>

            {rightBranch && (
                <div className={'text-right hidden lg:flex flex-col text-lg'}>
                    <div className={'flex text-foreground-light-fixed gap-10 justify-end'}>
                        <span>{rightBranch.name}</span>
                        <span>{rightBranch.workHours}</span>
                    </div>
                    <div className={'flex gap-5'}>
                        <span>{rightBranch.address}</span>
                        <div className="hover:opacity-60 transition flex gap-2 items-center">
                            <Icon name={'phone-filled'} className="w-5 h-5"/>
                            <a href={`tel:${rightBranch.phone}`}>
                                {rightBranch.phone}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}