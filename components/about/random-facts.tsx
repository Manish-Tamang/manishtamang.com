import { randomFacts } from "@/data/about"

export function RandomFacts() {
    return (
        <section className="w-full">
            <h2 className="text-2xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
                Random facts
            </h2>
            <p className="text-foreground mb-4 mt-1 leading-normal text-sm md:text-base">
                A few stray notes from along the way.
            </p>
            <div className="space-y-6">
                {randomFacts.map((fact) => (
                    <div key={fact.id} className="space-y-3">
                        <p className="text-foreground leading-normal text-sm md:text-base">
                            {fact.text}
                        </p>
                        {fact.youtubeId && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-[8px] border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${fact.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                                    title={fact.youtubeTitle}
                                    className="absolute inset-0 h-full w-full"
                                    allow="clipboard-write; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
