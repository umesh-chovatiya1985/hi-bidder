/** @type {import('next').NextConfig} */
const cron = require('node-cron');

// Creating a cron job which runs on every 10 second
cron.schedule("*/1 * * * * *", async function() {
    // const reqApi = await fetch("http://localhost:3000/api/scheduled/auction");
    // if(reqApi.ok){
      //const resApi = await reqApi.json();
    // } 
    // const reqEApi = await fetch("http://localhost:3000/api/scheduled/expired");
    // if(reqEApi.ok){
    //   const resApi = await reqEApi.json();
    // }
});

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  env: {
    COMPANY_URL: "http://localhost:3000/",
    COMPANY_NAME: "Hi Bidders!",
    API_URL: "http://localhost:3000/api/",
    GRL_URL : "http://localhost:3000/api/graphql",
    SECRET: "bc049a8fcd4f139b783e816b50221f90",
    OTP_WAIT_TIME: 60,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
