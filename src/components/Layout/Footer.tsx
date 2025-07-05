import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Sadia Afrin Mim. All rights reserved.
        </p>
        <a
          href="https://github.com/SadiaAfrinMim/Library-management-with-Redux"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-300 hover:text-white transition"
        >
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
