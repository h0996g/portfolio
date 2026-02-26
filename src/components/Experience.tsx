interface Skill {
  name: string;
  level: "Experienced" | "Intermediate";
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
      <div
        className={`w-2 h-2 rounded-full shrink-0 ${skill.level === "Experienced" ? "bg-gray-900 dark:bg-gray-100" : "bg-gray-400 dark:bg-gray-500"}`}
      ></div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{skill.level}</p>
      </div>
    </div>
  );
}

const frontendSkills: Skill[] = [
  { name: "Flutter", level: "Experienced" },
  { name: "Cubit / GetX", level: "Experienced" },
  { name: "React", level: "Intermediate" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "Java Native", level: "Intermediate" },
  { name: "Kotlin", level: "Intermediate" },
];

const frontendExtra: Skill = { name: "Figma", level: "Intermediate" };

const backendSkills: Skill[] = [
  { name: "MongoDB", level: "Experienced" },
  { name: "SQL", level: "Experienced" },
  { name: "Node JS", level: "Intermediate" },
  { name: "Express JS", level: "Intermediate" },
  { name: "Socket IO", level: "Intermediate" },
  { name: "PHP", level: "Intermediate" },
];

const backendExtra: Skill = { name: "Git", level: "Intermediate" };

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase mb-2">
            Explore My
          </p>
          <h2 className="text-4xl max-sm:text-2xl font-bold text-gray-900 dark:text-white">
            Experience
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Frontend */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Frontend & Mobile
            </h3>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
              {frontendSkills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
              <div className="col-span-2 max-sm:col-span-1">
                <SkillItem skill={frontendExtra} />
              </div>
            </div>
          </div>

          {/* Backend */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Backend & Tools
            </h3>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
              {backendSkills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
              <div className="col-span-2 max-sm:col-span-1">
                <SkillItem skill={backendExtra} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
