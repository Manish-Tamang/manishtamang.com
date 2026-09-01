import Link from "next/link"
import styles from "./open-for-projects.module.css"

const LABEL = "OPEN FOR PROJECTS • OPEN FOR PROJECTS • "
const PATH_ID = "open-for-projects-circle"

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="14"
      aria-hidden
    >
      <path
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        fill="currentColor"
      />
    </svg>
  )
}

export function OpenForProjects() {
  return (
    <div className="fixed right-16 bottom-4 z-40 hidden md:block">
      <Link
        href="/contact"
        className={styles.button}
        aria-label="Open for projects"
      >
        <div className={styles.buttonText}>
          <svg viewBox="0 0 100 100" aria-hidden>
            <defs>
              <path
                id={PATH_ID}
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              />
            </defs>
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="8s"
                repeatCount="indefinite"
              />
              <text className={styles.circleText}>
                <textPath href={`#${PATH_ID}`} textLength="226" spacing="auto">
                  {LABEL}
                </textPath>
              </text>
            </g>
          </svg>
        </div>
        <div className={styles.buttonCircle}>
          <ArrowIcon className={styles.buttonIcon} />
          <ArrowIcon className={`${styles.buttonIcon} ${styles.buttonIconCopy}`} />
        </div>
      </Link>
    </div>
  )
}
