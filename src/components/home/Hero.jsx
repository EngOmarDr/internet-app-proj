import { TiTick } from "react-icons/ti";
import styles from "./hero.module.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.desc}>{t("login_intro")}</p>

        <div className={styles.services}>
          <div className={styles.serviceItem}>
            <TiTick />
            {t("user_friendly")}
          </div>
          <div className={styles.serviceItem}>
            <TiTick />
            {t("robust_security")}
          </div>
          <div className={styles.serviceItem}>
            <TiTick />
            {t("comprehensive_backup")}
          </div>
        </div>
      </div>

      <div className="p-5 ">
        <motion.img
          src="/images/Home.jpg"
          alt={t("collaboration")}
          className="rounded-lg shadow-lg w-4/ max-w-md"
          whileHover={{ scale: 1.05 }}
        />
      </div>
    </div>
  );
};

export default Hero;
