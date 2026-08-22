'use client';

import { forwardRef } from 'react';
import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import { useModalStore } from '../../../../public/store/useModalStore';
import { scrollToSection } from '@/lib/scrollToSection';

const HeroCtaButtons = forwardRef(function HeroCtaButtons({ label, className = '' }, ref) {
    const openModal = useModalStore((s) => s.openModal);

    return (
        <div ref={ref} className={`flex items-center gap-1 md:gap-4 ${className}`}>
            <Button variant="primary" onClick={() => scrollToSection('contact-form')}>
                {label}
            </Button>
            <Button variant="icon" onClick={() => openModal('call')}>
                <Icon name="phone-unfilled" className="w-6 h-6" />
            </Button>
        </div>
    );
});

export default HeroCtaButtons;
