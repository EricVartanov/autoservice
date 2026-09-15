'use client';

import {useCallback, useEffect, useId, useRef} from 'react';
import {SUBMIT_ERROR_MESSAGE} from '@/lib/submitLead';

const SCRIPT_SRC = 'https://smartcaptcha.cloud.yandex.ru/captcha.js';
const EXECUTE_TIMEOUT_MS = 120000;

let scriptPromise;

function getSitekey() {
    return process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITEKEY || '';
}

function loadCaptchaScript() {
    if (typeof window === 'undefined') {
        return Promise.resolve();
    }
    if (window.smartCaptcha) {
        return Promise.resolve();
    }
    if (scriptPromise) {
        return scriptPromise;
    }

    scriptPromise = new Promise((resolve, reject) => {
        const existing = document.querySelector('script[data-smartcaptcha]');
        if (existing) {
            if (window.smartCaptcha) {
                resolve();
                return;
            }
            existing.addEventListener('load', () => resolve(), {once: true});
            existing.addEventListener('error', () => reject(new Error('captcha script')), {once: true});
            return;
        }

        const script = document.createElement('script');
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.dataset.smartcaptcha = '1';
        script.onload = () => resolve();
        script.onerror = () => {
            scriptPromise = undefined;
            reject(new Error('captcha script'));
        };
        document.head.appendChild(script);
    });

    return scriptPromise;
}

export function useInvisibleCaptcha() {
    const reactId = useId();
    const containerId = `smartcaptcha-${reactId.replace(/:/g, '')}`;
    const widgetIdRef = useRef(null);
    const hostRef = useRef(null);
    const pendingRef = useRef(null);

    useEffect(() => {
        const sitekey = getSitekey();
        if (!sitekey) {
            return undefined;
        }

        let cancelled = false;
        const host = document.createElement('div');
        host.id = containerId;
        host.setAttribute('aria-hidden', 'true');
        host.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
        document.body.appendChild(host);
        hostRef.current = host;

        loadCaptchaScript()
            .then(() => {
                if (cancelled || !window.smartCaptcha || !host.isConnected) {
                    return;
                }

                widgetIdRef.current = window.smartCaptcha.render(host, {
                    sitekey,
                    invisible: true,
                    hl: 'ru',
                    callback: (token) => {
                        pendingRef.current?.resolve(token);
                        pendingRef.current = null;
                    },
                    'error-callback': () => {
                        pendingRef.current?.reject(new Error(SUBMIT_ERROR_MESSAGE));
                        pendingRef.current = null;
                    },
                });
            })
            .catch(() => {
                // executeCaptcha reports the failure on submit
            });

        return () => {
            cancelled = true;
            pendingRef.current?.reject(new Error(SUBMIT_ERROR_MESSAGE));
            pendingRef.current = null;
            if (widgetIdRef.current != null && window.smartCaptcha?.destroy) {
                window.smartCaptcha.destroy(widgetIdRef.current);
            }
            widgetIdRef.current = null;
            hostRef.current?.remove();
            hostRef.current = null;
        };
    }, [containerId]);

    const executeCaptcha = useCallback(async () => {
        const sitekey = getSitekey();
        if (!sitekey) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('[captcha] NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITEKEY is not set; skipping');
                return '';
            }
            throw new Error(SUBMIT_ERROR_MESSAGE);
        }

        if (!window.smartCaptcha || widgetIdRef.current == null) {
            throw new Error(SUBMIT_ERROR_MESSAGE);
        }

        window.smartCaptcha.reset?.(widgetIdRef.current);

        return new Promise((resolve, reject) => {
            const timer = window.setTimeout(() => {
                pendingRef.current = null;
                reject(new Error(SUBMIT_ERROR_MESSAGE));
            }, EXECUTE_TIMEOUT_MS);

            pendingRef.current = {
                resolve: (token) => {
                    window.clearTimeout(timer);
                    resolve(token);
                },
                reject: (error) => {
                    window.clearTimeout(timer);
                    reject(error);
                },
            };

            window.smartCaptcha.execute(widgetIdRef.current);
        });
    }, []);

    return {
        captchaContainerId: containerId,
        executeCaptcha,
    };
}

/** Host is created outside React; keep a no-op for call sites that still pass an id. */
export function InvisibleCaptcha() {
    return null;
}
