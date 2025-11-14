async function AboutPage() {
  return (
    <section>
      <h1
        className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl sm:text-6xl font-bold
      tracking-wide leading-none"
      >
        We love{" "}
        <span className="py-2 px-4 bg-primary rounded-lg text-white tracking-widest">
          Darboole
        </span>
      </h1>

      <p className="leading-8 text-lg mt-6 text-muted-foreground max-w-2xl mx-auto text-center">
        First things first — we’d like to clarify that we hold absolutely no
        grudges against Darboole. Yes, he’s skinny, and yes, he somehow eats
        enough to feed a small village yet gains absolutely nothing. But hey,
        that’s not discrimination — that’s just physics refusing to cooperate.
        Anyway, consider this our official preface to the madness you’re about
        to discover.
      </p>
    </section>
  );
}

export default AboutPage;
