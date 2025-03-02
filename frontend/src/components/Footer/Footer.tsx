import { motion } from "framer-motion";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center py-24 lg:py-32 px-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300"
    >
      <div className="container mx-auto max-w-6xl">
        <nav className="flex flex-wrap justify-center md:justify-between items-center mb-8">
          <motion.a
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0"
            whileHover={{ scale: 1.1 }}
          >
            <i>Project Sphere</i>
          </motion.a>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            {[
              "For designers",
              "Hire talent",
              "Inspiration",
              "Advertising",
              "Blog",
              "About",
              "Careers",
              "Support",
            ].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-100"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            {[
              { Icon: FaTwitter, color: "#1DA1F2" },
              { Icon: FaFacebook, color: "#1877F2" },
              { Icon: FaInstagramSquare, color: "#E1306C" },
            ].map(({ Icon, color }, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:opacity-80"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
                style={{ color }}
              >
                <Icon size={30} />
              </motion.a>
            ))}
          </div>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <span>&copy; 2025 Project Sphere</span>
            {["Terms", "Privacy", "Cookies"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-100"
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4">
            {[
              "Jobs",
              "Designers",
              "Freelancers",
              "Tags",
              "Places",
              "Resources",
            ].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-100"
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
