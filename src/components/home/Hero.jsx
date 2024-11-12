import { TiTick } from "react-icons/ti"
import styles from './hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>
            Source Safe
        </h1>
        <p className={styles.desc}>
            The ultimate solution for secure file management and version control
        </p>

        <div className={styles.services}>
          <div className={styles.serviceItem}>
              <TiTick/>
              User-friendly Interface
          </div>
          <div className={styles.serviceItem}>
              <TiTick/>
              Robust Security Features
          </div>
          <div className={styles.serviceItem}>
              <TiTick/>
              Comprehensive Backup Solutions
          </div>
        </div>

      </div>

      <div className="w-full max-w-sm mx-auto">
        <img src="/source-safe.jpg" alt="source safe"  className="h-full w-auto object-cover rounded-lg shadow-md" />
      </div>
    </div>
  )
}

export default Hero
