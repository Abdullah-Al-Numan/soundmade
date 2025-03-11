import Link from "next/link";
import React from "react";

const ComingSoon = () => {
  return (
    <section className="flex items-center p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto text-center">
        <h1 className="text-6xl font-extrabold text-[#ff9c46] mb-6">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
          We are working hard to bring something amazing for you.
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          Stay tuned for updates!
        </p>
        <Link
          rel="noopener noreferrer"
          href="/"
          className="px-8 py-3 text-lg font-semibold text-white bg-[#ff9c46] rounded-lg hover:bg-[#f27d1d] transition"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default ComingSoon;
