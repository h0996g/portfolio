export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-medium text-gray-500 tracking-wide uppercase mb-2">
          Get in Touch
        </p>
        <h2 className="text-4xl max-sm:text-2xl font-bold text-gray-900 mb-10">
          Contact Me
        </h2>
        <div className="flex justify-center gap-6 max-sm:flex-col max-sm:items-center">
          <a
            href="mailto:houssam.guechi@univ-constantine2.dz"
            className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-300 transition-all duration-300 no-underline group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
              <i className="fas fa-envelope text-gray-700"></i>
            </div>
            <span className="text-sm text-gray-700 font-medium max-sm:text-xs">
              houssam.guechi@univ-constantine2.dz
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/geuchi-houssam-eddine-342b4331a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-300 transition-all duration-300 no-underline group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
              <i className="fab fa-linkedin-in text-gray-700"></i>
            </div>
            <span className="text-sm text-gray-700 font-medium">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
