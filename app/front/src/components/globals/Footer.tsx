import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 border-t border-gray-300 dark:border-gray-700 text-center">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Section principale */}
        <p className="text-sm">
          Join us for{" "}
          <Link href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            AI Startup School
          </Link>{" "}
          this June 16-17 in San Francisco!
        </p>

        {/* Liens */}
        <nav className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {["Guidelines", "FAQ", "Lists", "API", "Security", "Legal", "Apply to YC", "Contact"].map((item) => (
            <Link key={item} href="#" className="hover:text-blue-500 transition-colors duration-200">
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
