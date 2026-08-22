'use client';

import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import Icon from '@/components/icons/Icon';
import {getLenis} from '@/lib/scrollToSection';
import {InModalProvider} from '@/components/modals/InModalContext';
import {useModalStore} from '../../../public/store/useModalStore';

const WRAPPER = {
    default: 'relative w-full max-w-md mx-4',
    sheet: 'relative w-full md:w-[calc(100%-48px)] lg:w-full max-w-[1560] max-h-full',
    legal: 'relative w-full max-w-[800px] max-h-full',
    panorama: 'relative h-[70vh] w-full max-w-[1560] md:h-[80vh] md:w-[calc(100%-48px)] lg:w-full',
};

const PANEL = {
    default:
        'bg-neutral-900 rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto overscroll-contain',
    sheet:
        'relative flex flex-col bg-transparent text-foreground w-full max-h-full rounded-[20] md:rounded-[30] p-0 mx-0 shadow-2xl overflow-hidden',
    legal:
        'relative flex flex-col bg-white text-black rounded-[20px] md:rounded-[30px] w-full max-h-full overflow-hidden shadow-2xl',
    panorama:
        'relative flex h-full w-full flex-col overflow-hidden rounded-[20] bg-neutral-900 p-0 shadow-2xl md:rounded-[30]',
};

export default function Modal({
    isOpen,
    onClose,
    children,
    variant = 'default',
    showClose = false,
    centered = false,
}) {
    const legalSlug = useModalStore((s) => s.legalSlug);
    const panoramaUrl = useModalStore((s) => s.panoramaUrl);
    const activeModal = useModalStore((s) => s.activeModal);
    const isLegal = variant === 'legal';
    const isPanorama = variant === 'panorama';
    const isStackedOverlay = isLegal || isPanorama;
    const skipScrollLock = isStackedOverlay && !!activeModal;

    useEffect(() => {
        if (!isOpen) return undefined;

        const onEsc = (e) => {
            if (e.key !== 'Escape') return;
            if (legalSlug && !isLegal) return;
            if (panoramaUrl && !isPanorama && !isLegal) return;
            onClose();
        };
        document.addEventListener('keydown', onEsc);

        const prevOverflow = document.body.style.overflow;
        if (!skipScrollLock) {
            document.body.style.overflow = 'hidden';
            getLenis()?.stop();
        }

        return () => {
            document.removeEventListener('keydown', onEsc);
            if (!skipScrollLock) {
                document.body.style.overflow = prevOverflow;
                getLenis()?.start();
            }
        };
    }, [isOpen, onClose, legalSlug, isLegal, skipScrollLock, panoramaUrl, isPanorama]);

    if (typeof window === 'undefined' || !isOpen) return null;

    const isSheet = variant === 'sheet';
    const isInsetSheet = (isSheet || isLegal || isPanorama) && !centered;
    const closePad = showClose ? ' py-[45px] md:py-[85px]' : '';
    const overlayAlign = isInsetSheet
        ? 'items-start px-3 pb-3 pt-[70px] md:px-6 md:pb-6 md:pt-[110px]'
        : centered
            ? `items-center px-3 md:px-6${closePad}`
            : `items-center${closePad}`;

    return createPortal(
        <InModalProvider value={true}>
            <div
                className={`fixed inset-0 flex justify-center bg-black/70 ${
                    isStackedOverlay ? 'z-[120]' : 'z-[110]'
                } ${overlayAlign}`}
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={WRAPPER[variant] ?? WRAPPER.default}
                >
                    {showClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Закрыть"
                            className="absolute right-0 bottom-full z-40 mb-[5px] flex size-[40] cursor-pointer items-center justify-center text-foreground-fixed transition md:mb-[25px] md:size-[60] lg:right-[15px]"
                        >
                            <Icon name={'cross'} className={'size-[40] md:size-[60] text-foreground-fixed'}/>
                        </button>
                    )}
                    <div
                        className={PANEL[variant] ?? PANEL.default}
                        data-lenis-prevent={!isSheet ? true : undefined}
                    >
                        {isSheet ? (
                            <div
                                className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
                                data-lenis-prevent
                            >
                                {children}
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </div>
        </InModalProvider>,
        document.body,
    );
}
