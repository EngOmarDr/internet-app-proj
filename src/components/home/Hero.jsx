import { TiTick } from "react-icons/ti";
import styles from "./hero.module.css";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>Source Safe</h1>
        <p className={styles.desc}>
          The ultimate solution for secure file management and version control
        </p>

        <div className={styles.services}>
          <div className={styles.serviceItem}>
            <TiTick />
            User-friendly Interface
          </div>
          <div className={styles.serviceItem}>
            <TiTick />
            Robust Security Features
          </div>
          <div className={styles.serviceItem}>
            <TiTick />
            Comprehensive Backup Solutions
          </div>
        </div>
      </div>

      <div className="p-5 ">
        <motion.img
          src="/images/Home.jpg"
          alt="Collaboration"
          className="rounded-lg shadow-lg w-4/ max-w-md" // تعديل هنا
          whileHover={{ scale: 1.05 }}
        />
      </div>
    </div>
  );
};

export default Hero;
