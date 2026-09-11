/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local WP resolves to loopback; the optimizer rejects private IPs.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'autoservice.local',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'autoservice.local',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
