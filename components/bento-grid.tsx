import Image from "next/image"

export function BentoGrid() {
    return (
        <section className="mt-2 p-6">
            <h2 className="text-2xl font-semibold mb-2">What I Offer</h2>
            <p className="text-sm text-muted-foreground mb-6">
                Everything you need to bring your ideas to life
            </p>
            <div className="grid grid-cols-3 grid-rows-2 border-t-2 border-l-2 border-border border-dotted">
                {/* Mobile Friendly - Tall card (row-span-2) */}
                <div className="row-span-2 flex flex-col border-r-2 border-b-2 border-border border-dotted hover:bg-accent/50 transition-colors">
                    <div className="p-6">
                        <p className="text-lg font-medium">
                            Mobile Friendly
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Responsive designs that work seamlessly across all devices and screen sizes.
                        </p>
                    </div>
                    <div className="-mt-2 w-full">
                        <div className="w-full h-48 sm:h-56 overflow-hidden">
                            <Image
                                src="/featured-projects/yeti-booth.png"
                                alt="Mobile friendly design showcase"
                                width={1200}
                                height={600}
                                className="w-full h-full object-cover object-top"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Performance */}
                <div className="flex flex-col border-r-2 border-b-2 border-border border-dotted hover:bg-accent/50 transition-colors min-h-[200px]">
                    <div className="p-6">
                        <p className="text-lg font-medium">
                            Performance
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Lightning-fast load times and optimized code for the best user experience.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center pb-6">
                        <div className="text-6xl">⚡</div>
                    </div>
                </div>

                {/* Powerful APIs - Tall card (row-span-2) */}
                <div className="row-span-2 flex flex-col border-r-2 border-b-2 border-border border-dotted hover:bg-accent/50 transition-colors">
                    <div className="p-6">
                        <p className="text-lg font-medium">
                            Powerful APIs
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Robust backend solutions with RESTful APIs and database integrations.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-6 pt-0">
                        <div className="w-full h-48 border-2 border-border rounded-lg bg-background/50 p-4 font-mono text-xs overflow-hidden">
                            <div className="text-muted-foreground">{'{'}</div>
                            <div className="ml-4">
                                <span className="text-sky-600 dark:text-sky-400">"status"</span>
                                <span className="text-muted-foreground">: </span>
                                <span className="text-emerald-600 dark:text-emerald-400">"success"</span>
                                <span className="text-muted-foreground">,</span>
                            </div>
                            <div className="ml-4">
                                <span className="text-sky-600 dark:text-sky-400">"data"</span>
                                <span className="text-muted-foreground">: </span>
                                <span className="text-muted-foreground">{'{'}</span>
                            </div>
                            <div className="ml-8">
                                <span className="text-sky-600 dark:text-sky-400">"user"</span>
                                <span className="text-muted-foreground">: </span>
                                <span className="text-amber-600 dark:text-amber-400">"..."</span>
                                <span className="text-muted-foreground">,</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Hello</span>
                            </div>
                            <div className="ml-8">
                                <span className="text-sky-600 dark:text-sky-400">"token"</span>
                                <span className="text-muted-foreground">: </span>
                                <span className="text-amber-600 dark:text-amber-400">"..."</span>
                            </div>
                            <div className="ml-4 text-muted-foreground">{'}'}</div>
                            <div className="text-muted-foreground">{'}'}</div>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="flex flex-col border-r-2 border-b-2 border-border border-dotted hover:bg-accent/50 transition-colors min-h-[200px]">
                    <div className="p-6">
                        <p className="text-lg font-medium">
                            Security
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Built with security best practices and modern authentication methods.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center pb-6">
                        <div className="text-6xl">🔒</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
