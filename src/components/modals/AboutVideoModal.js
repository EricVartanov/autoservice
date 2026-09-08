'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/modals/Modal';
import { useModalStore } from '../../../public/store/useModalStore';

export default function AboutVideoModal() {
    const { activeModal, modalPayload, closeModal } = useModalStore();
    const videos = modalPayload?.videos ?? [];
    const [selectedVideo, setSelectedVideo] = useState(0);
    const isOpen = activeModal === 'aboutVideo' && videos.length > 0;
    const video = videos[selectedVideo] ?? videos[0];

    useEffect(() => {
        setSelectedVideo(0);
    }, [modalPayload]);

    return (
        <Modal isOpen={isOpen} onClose={closeModal} variant="video" showClose>
            <div className="flex flex-col gap-5 p-4 md:gap-5 md:p-4 lg:p-7.5 lg:h-full overflow-auto min-h-[62vw] lg:min-h-auto">
                {videos.length > 1 && (
                    <div className="flex flex-wrap gap-2 px-3 py-3 lg:px-7.5 items-center lg:py-3.75 bg-[#1A1A1A] rounded-3xl lg:rounded-full shrink-0">
                        {videos.map((item, index) => (
                            <button
                                key={`${item.url}-${index}`}
                                type="button"
                                onClick={() => setSelectedVideo(index)}
                                className={`rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${index === selectedVideo
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-foreground/20 text-white hover:border-primary border-b-white/20'
                                    }`}
                            >
                                {item.label || `Вариант ${index + 1}`}
                            </button>
                        ))}
                    </div>
                )}
                {video?.url && (
                    <div className="flex-1 min-h-0 lg:min-h-125">
                        <div className="overflow-hidden rounded-xl bg-black lg:h-full">
                            <video
                                key={video.url}
                                title={video.label || 'Видео о компании'}
                                className="h-full w-full object-contain"
                                src={video.url}
                                controls
                                autoPlay
                                muted
                                playsInline
                            >
                                Ваш браузер не поддерживает видео.
                            </video>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}