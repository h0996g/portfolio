import Image from "next/image";

interface Role {
  title: string;
  type: string;
  dates: string;
  duration: string;
  workMode: string;
  skills?: string;
}

interface WorkEntry {
  company: string;
  url: string;
  logoSrc?: string;
  logoText?: string;
  bgColor: string;
  totalDuration?: string;
  location: string;
  roles: Role[];
}

const workEntries: WorkEntry[] = [
  {
    company: "BrainerX",
    url: "https://www.brainerx.com/",
    logoSrc: "/companies/brainerx.jpg",
    bgColor: "bg-gray-800",
    location: "Constantine, Algeria",
    roles: [
      {
        title: "Teacher",
        type: "Contract",
        dates: "Dec 2025 - Present",
        duration: "3 mos",
        workMode: "Hybrid",
        skills: "Flutter and Mobile Application Development",
      },
    ],
  },
  {
    company: "Chiffratec",
    url: "https://www.chiffratec.com/",
    logoSrc: "/companies/chiffratec.jpg",
    bgColor: "bg-blue-900",
    location: "Constantine, Algeria",
    roles: [
      {
        title: "Mobile Developer",
        type: "Full-time",
        dates: "Oct 2025 - Present",
        duration: "5 mos",
        workMode: "Hybrid",
      },
    ],
  },
  {
    company: "SoCode School",
    url: "https://socode.tech/",
    logoSrc: "/companies/socode.png",
    bgColor: "bg-green-700",
    location: "Constantine, Algeria",
    roles: [
      {
        title: "Teacher",
        type: "Contract",
        dates: "Jul 2025 - Dec 2025",
        duration: "6 mos",
        workMode: "On-site",
        skills: "Mobile Application Development and Flutter",
      },
    ],
  },
  {
    company: "Koudri Innovations Group",
    url: "https://sarlkig.com/",
    logoSrc: "/companies/kig-logo.png",
    bgColor: "bg-amber-800",
    totalDuration: "1 yr 1 mo",
    location: "Algiers, Algeria",
    roles: [
      {
        title: "Mobile Developer",
        type: "Part-time",
        dates: "Jun 2025 - Oct 2025",
        duration: "5 mos",
        workMode: "Remote",
      },
      {
        title: "Mobile Developer",
        type: "Full-time",
        dates: "Oct 2024 - Jul 2025",
        duration: "10 mos",
        workMode: "On-site",
        skills: "Mobile Application Development",
      },
    ],
  },
  {
    company: "End Point Soft",
    url: "https://endpointsoft.com/",
    logoSrc: "/companies/endPointSoft.png",
    bgColor: "bg-slate-700",
    location: "Remote",
    roles: [
      {
        title: "Mobile Developer",
        type: "Full-time",
        dates: "May 2025 - Oct 2025",
        duration: "6 mos",
        workMode: "Remote",
      },
    ],
  },
];

function CompanyLogo({ entry }: { entry: WorkEntry }) {
  if (entry.logoSrc) {
    return (
      <div className="w-10 h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
        <Image
          src={entry.logoSrc}
          alt={`${entry.company} logo`}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    );
  }
  return (
    <div
      className={`${entry.bgColor} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}
    >
      {entry.logoText}
    </div>
  );
}

function RoleItem({ role, isLast }: { role: Role; isLast: boolean }) {
  return (
    <div className={`relative pl-6 ${!isLast ? "pb-5" : ""}`}>
      {!isLast && (
        <div className="absolute left-1.25 top-3 bottom-0 w-px bg-gray-300"></div>
      )}
      <div className="absolute left-0 top-1.5 w-2.75 h-2.75 rounded-full bg-gray-400 border-2 border-white"></div>
      <h4 className="text-sm font-semibold text-gray-900">{role.title}</h4>
      <p className="text-xs text-gray-500">
        {role.type} &middot; {role.dates} &middot; {role.duration}
      </p>
      <p className="text-xs text-gray-500">{role.workMode}</p>
      {role.skills && (
        <p className="text-xs text-gray-600 mt-1">
          <span className="inline-block mr-1">&#9672;</span>
          {role.skills}
        </p>
      )}
    </div>
  );
}

export default function WorkExperience() {
  return (
    <section id="work" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase mb-2">
            Where I&apos;ve Worked
          </p>
          <h2 className="text-4xl max-sm:text-2xl font-bold text-gray-900">
            Work Experience
          </h2>
        </div>

        <div className="space-y-6">
          {workEntries.map((entry) => (
            <div
              key={entry.company}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex gap-4">
                <CompanyLogo entry={entry} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900">
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {entry.company}
                    </a>
                  </h3>
                  {entry.totalDuration && (
                    <p className="text-xs text-gray-500">
                      {entry.totalDuration}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">{entry.location}</p>

                  {entry.roles.length === 1 ? (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-800">
                        {entry.roles[0].title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {entry.roles[0].type} &middot; {entry.roles[0].dates}{" "}
                        &middot; {entry.roles[0].duration}
                      </p>
                      <p className="text-xs text-gray-500">
                        {entry.roles[0].workMode}
                      </p>
                      {entry.roles[0].skills && (
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="inline-block mr-1">&#9672;</span>
                          {entry.roles[0].skills}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4">
                      {entry.roles.map((role, idx) => (
                        <RoleItem
                          key={idx}
                          role={role}
                          isLast={idx === entry.roles.length - 1}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
