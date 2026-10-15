export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-text/10 bg-bg text-text transition-colors duration-250">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between text-sm opacity-60">
        <span>© {year} Emran Hussain Munna</span>
        <span>
          {new Date().toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </footer>
  );
}
