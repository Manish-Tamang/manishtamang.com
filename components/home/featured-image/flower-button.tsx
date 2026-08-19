import Link from 'next/link';
import styles from './flower-button.module.css';

interface FlowerButtonProps {
    text: string;
    href: string;
}

export function FlowerButton({ text, href }: FlowerButtonProps) {
    return (
        <Link href={href} className={styles.btn}>
            <div className={styles.wrapper}>
                <p className={styles.text}>{text}</p>

                <div className={`${styles.flower} ${styles.flower1}`}>
                    <div className={styles.petal}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower2}`}>
                    <div className={styles.petal}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower3}`}>
                    <div className={styles.petal}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower4}`}>
                    <div className={styles.petal}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower5}`}>
                    <div className={styles.petal}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower6}`}>
                    <div className={styles.petal}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
            </div>
        </Link>
    );
}
