/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'gravatar.com',
      'i.discogs.com',
      'st.discogs.com',
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'gravatar.com',
    //     pathname: '**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'st.discogs.com',
    //     pathname: '**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'st.discogs.com',
    //     pathname: '**',
    //   },
    // ],
  }
};

export default nextConfig;
