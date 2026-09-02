export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-brand">GolFan</p>
        <p className="footer-tagline">Play. Predict. Compete.</p>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} GolFan Fantasy Golf
      </p>
    </footer>
  );
}
