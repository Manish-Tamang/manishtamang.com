import Image from "next/image";

interface EducationItemProps {
    logo: string;
    institution: string;
    degree: string;
    dateRange: string;
}

const EducationItem = ({ logo, institution, degree, dateRange }: EducationItemProps) => (
    <div className="group flex gap-3">
        <div className="shrink-0">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/40">
                <Image
                    src={logo}
                    alt={`${institution} Logo`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="min-w-0">
                <h3 className="text-[15px] font-medium text-foreground">{institution}</h3>
                <p className="text-sm text-foreground/60">{degree}</p>
            </div>
            <span className="mt-1.5 inline-block shrink-0 rounded-full bg-secondary/50 px-2 py-0.5 text-[11px] text-foreground/50 md:mt-0">
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
