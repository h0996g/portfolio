"use client";

import Image from "next/image";

interface Role {
  title: string;
  type: string;
  startDate: string; // "MMM YYYY" format, e.g. "Dec 2025"
  endDate: string;   // "MMM YYYY" or "Present"
  workMode: string;
  skills?: string;
}

interface WorkEntry {
  company: string;
  url: string;
  logoSrc?: string;
  logoText?: string;
  bgColor: string;
  location: string;
  roles: Role[];
}

const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseMonthYear(str: string): { month: number; year: number } {
  const [mon, yr] = str.trim().split(" ");
  return { month: MONTH_MAP[mon], year: parseInt(yr, 10) };
}

function calcDuration(startDate: string, endDate: string): string {
  const start = parseMonthYear(startDate);
  const end =
    endDate === "Present"
      ? { month: new Date().getMonth(), year: new Date().getFullYear() }
      : parseMonthYear(endDate);

  let totalMonths =
    (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mo${months !== 1 ? "s" : ""}`;
  if (months === 0) return `${years} yr${years !== 1 ? "s" : ""}`;
  return `${years} yr${years !== 1 ? "s" : ""} ${months} mo${months !== 1 ? "s" : ""}`;
}

function calcTotalDuration(roles: Role[]): string {
  // Earliest start → latest end
  const starts = roles.map((r) => parseMonthYear(r.startDate));
  const ends = roles.map((r) =>
    r.endDate === "Present"
      ? { month: new Date().getMonth(), year: new Date().getFullYear() }
      : parseMonthYear(r.endDate)
  );

  const minStart = starts.reduce((a, b) =>
    a.year < b.year || (a.year === b.year && a.month < b.month) ? a : b
  );
  const maxEnd = ends.reduce((a, b) =>
    a.year > b.year || (a.year === b.year && a.month > b.month) ? a : b
  );

  let totalMonths =
    (maxEnd.year - minStart.year) * 12 + (maxEnd.month - minStart.month) + 1;
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mo${months !== 1 ? "s" : ""}`;
  if (months === 0) return `${years} yr${years !== 1 ? "s" : ""}`;
  return `${years} yr${years !== 1 ? "s" : ""} ${months} mo${months !== 1 ? "s" : ""}`;
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
        startDate: "Dec 2025",
        endDate: "Present",
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
        startDate: "Oct 2025",
        endDate: "Present",
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
        startDate: "Jul 2025",
        endDate: "Dec 2025",
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
    location: "Algiers, Algeria",
    roles: [
      {
        title: "Mobile Developer",
        type: "Part-time",
        startDate: "Jun 2025",
        endDate: "Oct 2025",
        workMode: "Remote",
      },
      {
        title: "Mobile Developer",
        type: "Full-time",
        startDate: "Oct 2024",
        endDate: "Jul 2025",
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
        startDate: "May 2025",
        endDate: "Oct 2025",
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
  const duration = calcDuration(role.startDate, role.endDate);
  const dateLabel = `${role.startDate} - ${role.endDate}`;

  return (
    <div className={`relative pl-6 ${!isLast ? "pb-5" : ""}`}>
      {!isLast && (
        <div className="absolute left-1.25 top-3 bottom-0 w-px bg-gray-300 dark:bg-gray-600"></div>
      )}
      <div className="absolute left-0 top-1.5 w-2.75 h-2.75 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-gray-800"></div>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
        {role.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {role.type} &middot; {dateLabel} &middot; {duration}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {role.workMode}
      </p>
      {role.skills && (
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
          <span className="inline-block mr-1">&#9672;</span>
          {role.skills}
        </p>
      )}
    </div>
  );
}

export default function WorkExperience() {
  return (
    <section
      id="work"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase mb-2">
            Where I&apos;ve Worked
          </p>
          <h2 className="text-4xl max-sm:text-2xl font-bold text-gray-900 dark:text-white">
            Work Experience
          </h2>
        </div>

        <div className="space-y-6">
          {workEntries.map((entry) => {
            const hasMultipleRoles = entry.roles.length > 1;
            const totalDuration = hasMultipleRoles
              ? calcTotalDuration(entry.roles)
              : null;

            return (
              <div
                key={entry.company}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-black/20"
              >
                <div className="flex gap-4">
                  <CompanyLogo entry={entry} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                      {entry.company}
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Visit ${entry.company}`}
                        className="inline-flex items-center justify-center w-5 h-5 rounded text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-4.95-4.95l1.5-1.5a.75.75 0 0 1 1.06 1.06l-1.5 1.5a2 2 0 0 0 2.83 2.83l2-2a2 2 0 0 0 0-2.83.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 4.95 4.95l-1.5 1.5a.75.75 0 1 1-1.06-1.06l1.5-1.5a2 2 0 0 0-2.83-2.83l-2 2a2 2 0 0 0 0 2.83.75.75 0 0 1 0 1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </h3>
                    {totalDuration && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {totalDuration}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {entry.location}
                    </p>

                    {entry.roles.length === 1 ? (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {entry.roles[0].title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {entry.roles[0].type} &middot;{" "}
                          {entry.roles[0].startDate} - {entry.roles[0].endDate}{" "}
                          &middot;{" "}
                          {calcDuration(
                            entry.roles[0].startDate,
                            entry.roles[0].endDate
                          )}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {entry.roles[0].workMode}
                        </p>
                        {entry.roles[0].skills && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
