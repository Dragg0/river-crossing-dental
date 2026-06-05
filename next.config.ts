import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Specials — renamed in the rebuild
      { source: "/cleaning-special", destination: "/specials/cleaning", permanent: true },
      { source: "/exam-special", destination: "/specials/exam", permanent: true },
      {
        source: "/complimentary-orthodontic-consultation",
        destination: "/specials/ortho-consult",
        permanent: true,
      },

      // Legacy pages without direct equivalents — point at the nearest relevant page
      { source: "/healthy-start", destination: "/services/orthodontics", permanent: true },
      {
        source: "/dental-implants-learning-center",
        destination: "/services/dental-implants",
        permanent: true,
      },
      {
        source: "/dental-implants-survey",
        destination: "/services/dental-implants",
        permanent: true,
      },
      { source: "/office-tour", destination: "/meet-the-team", permanent: true },
      { source: "/new-patient-forms", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
