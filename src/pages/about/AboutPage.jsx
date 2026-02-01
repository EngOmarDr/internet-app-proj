import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      className="fix-height container mx-auto shadow-lg rounded-lg overflow-hidden p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-gray-800 text-center mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {t("about_app")} {/* استخدم الترجمة هنا */}
      </motion.h1>

      <motion.p
        className="text-gray-700 text-lg text-center mb-10 leading-relaxed px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {t("welcome_message")} {/* استخدم الترجمة هنا */}
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-5 text-gray-800 md:order-1">
          <motion.h2
            className="text-2xl font-bold mb-2 text-start"
            whileHover={{ color: "#4A90E2" }}
          >
            {t("how_to_use")} {/* استخدم الترجمة هنا */}
          </motion.h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>{t("create_groupAbout")}</li>
            <li>{t("upload_manage_files")}</li>
            <li>{t("real_time_updates")}</li>
            <li>{t("access_logs")}</li>
          </ul>
        </div>

        <div className="p-5 md:order-2">
          <motion.img
            src="/images/Home.jpg"
            alt={t("collaboration")} // استخدم الترجمة هنا
            className="rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </motion.div>
      
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link to="/groups" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition duration-300">
  {t("get_started")}
</Link>
      </motion.div>
    </motion.section>
  );
};

export default AboutPage;
