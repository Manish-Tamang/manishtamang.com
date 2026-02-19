import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Medal } from "lucide-react"


interface Certificate {
    title: string;
    issuer: string;
    date: string;
    link?: string;
    image?: string;
    id: string;
}

const certificates: Certificate[] = [
    {
        id: "meta-frontend",
        title: "Meta Front-End Developer Specialization",
        issuer: "Coursera",
        date: "2024",
        link: "https://coursera.org/share/9b13904a601662c57e60057404746366",
    },
    {
        id: "postman-expert",
        title: "Postman API Fundamentals Student Expert",
        issuer: "Postman",
        date: "2024",
        link: "https://badgr.com/public/assertions/vJ9G9hY5S0-E2pYy6W_2Aw",
    },
    {
        id: "fcc-responsive",
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        date: "2023",
        link: "https://www.freecodecamp.org/certification/golecodes/responsive-web-design",
    },
    {
        id: "fcc-js",
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2023",
        link: "https://www.freecodecamp.org/certification/golecodes/javascript-algorithms-and-data-structures",
    }
];

export function CertificatesSection() {
    return (
        <section className="w-full">
            <h2 className="text-2xl font-normal tracking-tight mb-12">Certificates</h2>
            <div className="flex flex-col gap-6">
                {certificates.map((cert) => (
                    <div
                        key={cert.id}
                        className="group relative flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-muted/30 border border-transparent hover:border-border/50"
                    >
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                            {cert.image ? (
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    width={48}
                                    height={48}
                                    className="rounded-lg object-cover"
                                />
                            ) : (
                                <Medal className="w-6 h-6" />
                            )}
                        </div>

                        <div className="flex-grow min-w-0">
                            <h3 className="text-lg font-medium text-foreground/90 leading-tight mb-1">
                                {cert.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-foreground/60 font-normal">
                                <span>{cert.issuer}</span>
                                <span className="w-1 h-1 rounded-full bg-foreground/20" />
                                <span>{cert.date}</span>
                            </div>
                        </div>

                        {cert.link && (
                            <Link
                                href={cert.link}
                                target="_blank"
                                className="sm:ml-auto inline-flex items-center gap-1 text-xs font-medium text-foreground/40 group-hover:text-foreground/80 transition-colors"
                            >
                                <span>See Credential</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        )}

                        {/* Subtle background glow on hover */}
                        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-transparent via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </div>
        </section>

    );
}
