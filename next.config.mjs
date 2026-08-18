/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, //выкл SSR
    },
};
export default nextConfig;
