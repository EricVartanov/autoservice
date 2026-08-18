'use client';

import {useModalStore} from '../../../public/store/useModalStore';

export default function LegalLink({slug = 'privacy', children, className, ...props}) {
    const openLegal = useModalStore((s) => s.openLegal);

    return (
        <a
            href={`#${slug}`}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openLegal(slug);
            }}
            {...props}
        >
            {children}
        </a>
    );
}
