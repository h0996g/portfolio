import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="profile"
      className="min-h-[85vh] flex items-center justify-center px-6 lg:pt-0 pt-12 pb-16"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-16 flex-col lg:flex-row lg:text-left text-center">
        <div className="shrink-0">
          <div className="w-72 h-72 max-sm:w-48 max-sm:h-48 rounded-full overflow-hidden ring-4 ring-gray-200 shadow-2xl shadow-gray-300/30">
            <Image
              src="/cropped-image(4).png"
              alt="Houssam Eddine profile picture"
              width={288}
              height={288}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-500 tracking-wide uppercase mb-2">
              Hello, I&apos;m
            </p>
            <h1 className="text-5xl max-sm:text-3xl font-bold text-gray-900 leading-tight">
              Houssam Eddine
            </h1>
            <p className="text-xl max-sm:text-lg text-gray-400 mt-2 font-medium">
              Full Stack Developer
            </p>
          </div>
          <div className="flex gap-4 lg:justify-start justify-center max-sm:flex-wrap">
            <a
              href="https://drive.google.com/file/d/1AsAOxDyRPUjOKj9OJB6OS-xxAN8-AkqX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-semibold border-2 border-gray-900 text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <i className="fas fa-download mr-2"></i>Download CV
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border-none"
            >
              <i className="fas fa-envelope mr-2"></i>Contact Info
            </a>
          </div>
          <div className="flex gap-4 lg:justify-start justify-center">
            <a
              href="https://www.linkedin.com/in/geuchi-houssam-eddine-342b4331a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 no-underline"
            >
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>
            <a
              href="https://github.com/h0996g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 no-underline"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
