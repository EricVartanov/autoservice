import ThemeToggle from '@/components/ui/ThemeToggle';
import {Video} from "@/components/ui/Video";

export default function Hero({ data }) {
    console.log(data.backgroundVideo)
    return (
        <section className={'relative pt-[168]'}>
            <Video video={data.backgroundVideo} className={"absolute inset-0 w-full h-full object-cover"} />
            <ThemeToggle />
        </section>
    );
}
