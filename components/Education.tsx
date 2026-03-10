import Image from "next/image";

interface EducationItemProps {
    logo: string;
    institution: string;
    degree: string;
    dateRange: string;
}

const EducationItem = ({ logo, institution, degree, dateRange }: EducationItemProps) => (
    <div className="flex gap-3 group gap-y-1">
        <div className="shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/40">
                <Image
                    src={logo}
                    alt={`${institution} Logo`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="font-medium text-[15px] text-foreground">{institution}</h3>
            <p className="text-sm text-foreground/60">{degree}</p>
            <span className="inline-block mt-1.5 text-[11px] text-foreground/50 bg-secondary/50 px-2 py-0.5 rounded-full">
                {dateRange}
            </span>
        </div>
    </div>
);

export function Education() {
    const educationItems = [
        {
            logo: "/images/education/sushma.jpg",
            institution: "Sushma Godawari College",
            degree: "+2 Science (Computer Science)",
            dateRange: "July 2024 - April 2026"
        },
        {
            logo: "/images/education/prashanti.jpg",
            institution: "Prashanti Academy",
            degree: "Secondary Education",
            dateRange: "June 2020 - March 2024"
        },
        {
            logo: "/images/education/ypointing.jpg",
            institution: "Y-pointing Sec. Boarding School",
            degree: "Primary Education",
            dateRange: "June 2012 - March 2020"
        }
    ];

    return (
        <section className="w-full space-y-4">
            <h2 className="text-2xl font-normal tracking-tight">Education</h2>
            <div className="space-y-5">
                {educationItems.map((education, index) => (
                    <EducationItem key={index} {...education} />
                ))}
            </div>
        </section>
    );
}
