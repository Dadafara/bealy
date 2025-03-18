import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative h-48 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Image
          src="/assets/images/news-img.jpg"
          alt="Newspaper"
          className="object-cover object-center w-full h-full"
          width={500}
          height={500}
        />
        <div className="absolute inset-0 bg-black opacity-45"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          From the stories
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
