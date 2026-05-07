export function BuildInPublic() {
  return (
    <section className="border-y border-ink-200 bg-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-12 gap-y-4 py-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
            Build in public
          </p>
          <h3 className="mt-1 text-xl font-semibold text-ink-900">
            Announcements, demos, and research from the Nebius team and builder community
          </h3>
        </div>
        <div className="flex gap-4">
          <a
            href="https://twitter.com/nebiuscloud"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-navy-700 underline-offset-4 hover:underline"
          >
            X / Twitter ↗
          </a>
          <a
            href="https://linkedin.com/company/nebius"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-navy-700 underline-offset-4 hover:underline"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://www.youtube.com/@nebiusofficial/videos"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-navy-700 underline-offset-4 hover:underline"
          >
            YouTube ↗
          </a>
        </div>
      </div>
    </section>
  );
}
