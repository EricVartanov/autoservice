'use client';

import Modal from '@/components/modals/Modal';
import {useModalStore} from '../../../public/store/useModalStore';

export default function PanoramaModal() {
    const {panoramaUrl, closePanorama} = useModalStore();

    return (
        <Modal isOpen={!!panoramaUrl} onClose={closePanorama} variant="panorama" showClose>
            {panoramaUrl && (
                <iframe
                    src={panoramaUrl}
                    title="Панорама филиала"
                    className="h-full w-full border-0"
                    allowFullScreen
                />
            )}
        </Modal>
    );
}
