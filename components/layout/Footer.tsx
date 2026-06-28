export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center">
      <p className="font-mono text-sm text-white/40">
        Built by{" "}
        <span className="text-gradient font-semibold">Rohan Thakur</span> with
        AI, Data &amp; Creativity.
      </p>
      <p className="mt-2 text-xs text-white/25">
        © {new Date().getFullYear()} · All rights reserved.
      </p>
    </footer>
  );
}
