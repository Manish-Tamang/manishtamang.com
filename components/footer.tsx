import Image from "next/image"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full mt-auto">
            <div className="max-w-[820px] mx-auto px-6 py-12">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between text-[16px] font-normal" style={{ letterSpacing: '-0.02em', lineHeight: '1.35em' }}>
                        <p className="text-foreground">© {currentYear} Golecodes</p>
                        <div className="flex items-center gap-6">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-muted transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-muted transition-colors"
                            >
                                Twitter
                            </a>
                            <a
                                href="mailto:hello@example.com"
                                className="text-foreground hover:text-muted transition-colors"
                            >
                                Email
                            </a>
                        </div>
                    </div>
                    <Image
                        src="/images/flowers.png"
                        alt="Footer decoration"
                        width={1200}
                        height={400}
                        draggable={false}
                        priority
                        className="w-full h-auto object-cover -mb-12 select-none pointer-events-none rounded-t-xl"
                    />
                </div>
            </div>
        </footer>
    )
}
