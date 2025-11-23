function Footer() {
  return (
    <footer className="h-12 bg-gray-800 text-white text-center flex items-center justify-center shrink-0">
      <p className="text-sm">© {new Date().getFullYear()} My Tools Website</p>
    </footer>
  );
}

export default Footer;