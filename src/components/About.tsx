import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase mb-2">
            Get To Know More
          </p>
          <h2 className="text-4xl max-sm:text-2xl font-bold text-gray-900">
            About Me
          </h2>
        </div>
        <div className="flex gap-16 flex-col lg:flex-row lg:items-start items-center">
          <div className="shrink-0">
            <div className="w-80 h-80 max-sm:w-56 max-sm:h-56 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/8.jpg"
                alt="Profile picture"
                width={320}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-briefcase text-gray-700 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Experience</h3>
                <p className="text-sm text-gray-500">
                  4+ years
                  <br />
                  Full Stack Development
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-graduation-cap text-gray-700 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Education</h3>
                <p className="text-sm text-gray-500">
                  IT. Bachelors Degree
                  <br />
                  STIC. Masters Degree
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed max-sm:text-justify">
              I am a passionate 25-year-old mobile application developer with a
              master&apos;s degree in Computer Science, specializing in Sciences
              and Technologies of Information and Communication, which I earned
              in 2024. My journey into mobile development began when I tested
              Flutter for the first time while working on my Bachelor&apos;s
              degree project, a mobile application developed using Flutter and
              Laravel. This experience ignited my enthusiasm for building dynamic
              and user-friendly mobile applications. Since then, I have been
              continuously enhancing my skills, refining my experiences, and
              developing more Flutter projects to deliver seamless and impactful
              user experiences. I&apos;m always updating myself with the latest
              trends in this field.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
