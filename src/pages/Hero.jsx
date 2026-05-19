const HERO_IMAGE =
  "https://source.unsplash.com/1800x1000/?nepal,himalaya,kathmandu";

function Hero() {
  return (
    <section className="relative isolate min-h-[430px] overflow-hidden border-b border-slate-200/80 bg-slate-950">
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover blur-sm"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/65" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/20" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Daily briefing</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
            Stay informed with focused headlines.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Browse current stories by category, search for topics, and open the source when you need the full report.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
