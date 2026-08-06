import Icon from "@/components/icons/Icon";

export default function BlurredCircle({size = 'size-[720]', className}) {
    return (
        <div className={`absolute -z-10 ${size} ${className}`}>
            <svg
                width="720"
                height="720"
                viewBox="0 0 720 720"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter
                        id="blur"
                        x="-100"
                        y="-100"
                        width="1920"
                        height="1920"
                        filterUnits="userSpaceOnUse"
                    >
                        <feGaussianBlur stdDeviation="60"/>
                    </filter>
                </defs>

                <circle
                    cx="360"
                    cy="360"
                    r="260"
                    fill="#FF0000"
                    fillOpacity="0.5"
                    filter="url(#blur)"
                />
            </svg>
        </div>
    );
}