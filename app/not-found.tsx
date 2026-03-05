import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-8 w-full max-w-md">
                {/* Light Mode Image */}
                <Image
                    src="/images/light-404.png"
                    alt="404 - Page Not Found"
                    width={600}
                    height={600}
                    className="mx-auto block dark:hidden w-full h-auto"
                    priority
                />
                {/* Dark Mode Image */}
                <Image
                    src="/images/dark-404.png"
                    alt="404 - Page Not Found"
                    width={600}
                    height={600}
                    className="mx-auto hidden dark:block w-full h-auto"
                    priority
                />
            </div>

            <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Page Not Found
            </h1>

            <p className="mb-8 max-w-lg text-muted-foreground text-lg">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Button className="bg-[#9AC372] hover:bg-[#9AC372]/80" asChild size="lg">
                <Link href="/">
                    Go Back Home
                </Link>
            </Button>
        </div>
    )
}
