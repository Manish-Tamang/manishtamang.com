export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[610px] px-6 py-12 space-y-12">
        <section className="space-y-6">
          <h1 className="text-4xl font-medium tracking-tight">About</h1>
          <div className="space-y-6 text-[17px] leading-relaxed text-foreground/80 font-normal">
            <p className="text-foreground/80 text-2xl font-myfont" >
              Hi, I'm Manish Tamang from Itahari, where I craft, break, and rebuild the internet, one line at a time.
            </p>
            <p className="text-foreground/80" >
              Driven by a love for web development, I'm a 17-year-old full stack aspirant from Itahari, Nepal.
              My coding journey began early, and since then, I've dedicated myself to crafting engaging web
              experiences using technologies like React, Next.js, and Tailwind CSS.
            </p>
            <p className="text-foreground/80">
              I'm constantly seeking new challenges and learning opportunities to refine my skills.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

