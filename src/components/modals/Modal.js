'use client';

import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import Icon from '@/components/icons/Icon';
import {getLenis} from '@/lib/scrollToSection';
import {InModalProvider} from '@/components/modals/InModalContext';
import {useModalStore} from '../../../public/store/useModalStore';

const PANEL = {
    default:
        'bg-neutral-900 rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto overscroll-contain',
    sheet:
        'relative flex flex-col bg-transparent text-foreground w-full md:w-[calc(100%-48px)] lg:w-full max-w-[1560] max-h-full rounded-[20] md:rounded-[30] p-0 mx-0 shadow-2xl overflow-hidden',
    legal:
        'relative flex flex-col bg-white text-black rounded-[20px] md:rounded-[30px] max-w-[800px] w-full mx-0 max-h-full overflow-hidden shadow-2xl',
};

export default function Modal({isOpen, onClose, children, variant = 'default', showClose = false}) {
    const legalSlug = useModalStore((s) => s.legalSlug);
    const activeModal = useModalStore((s) => s.activeModal);
    const isLegal = variant === 'legal';
    const skipScrollLock = isLegal && !!activeModal;

    useEffect(() => {
        if (!isOpen) return undefined;

        const onEsc = (e) => {
            if (e.key !== 'Escape') return;
            if (legalSlug && !isLegal) return;
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
    }, [isOpen, onClose, legalSlug, isLegal, skipScrollLock]);

    if (typeof window === 'undefined' || !isOpen) return null;

    const isSheet = variant === 'sheet';
    const isInsetSheet = isSheet || isLegal;

    return createPortal(
        <InModalProvider value={true}>
            <div
                className={`fixed inset-0 flex justify-center bg-black/70 ${
                    isLegal ? 'z-[120]' : 'z-[110]'
                } ${
                    isInsetSheet
                        ? 'items-start px-3 pb-3 pt-[70px] md:px-6 md:pb-6 md:pt-[110px]'
                        : 'items-center'
                }`}
                onClick={onClose}
            >
                {showClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Закрыть"
                        className="absolute right-2.5 top-2.5 md:top-5 lg:top-10 md:right-10 lg:right-5 z-40 flex size-[40] md:size-[60] items-center justify-center text-foreground-fixed transition cursor-pointer"
                    >
                        <Icon name={'cross'} className={'size-[40] md:size-[60] text-foreground-fixed'}/>
                    </button>
                )}
                <div
                    onClick={(e) => e.stopPropagation()}
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
        </InModalProvider>,
        document.body,
    );
}
