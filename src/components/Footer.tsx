export default function Footer() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects-and-tutorials", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <nav className="flex justify-center gap-8 mb-6 max-sm:flex-col max-sm:items-center max-sm:gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 no-underline hover:text-gray-900 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-center text-xs text-gray-400">
          Copyright &copy; 2024 Houssam Eddine. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
