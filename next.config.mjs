/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        CHARGEBEE_URL:process.env.CHARGEBEE_URL,
        OPEN_LOOP_URL:process.env.OPEN_LOOP_URL,
        OPEN_LOOP_TOKEN:process.env.OPEN_LOOP_TOKEN,
        OPEN_LOOP_DOXY_LINK:process.env.OPEN_LOOP_DOXY_LINK,
        OPEN_LOOP_Create_APPOINTMENT_LINK:process.env.OPEN_LOOP_Create_APPOINTMENT_LINK,
    },
};

export default nextConfig;
