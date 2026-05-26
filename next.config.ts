import 输入 { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/lijiahao-portfolio" : "",

  assetPrefix: isProd ? "/lijiahao-portfolio/" : "",
};

export default nextConfig;
