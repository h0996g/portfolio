"use client";

import Image from "next/image";
import Link from "next/link";
import { Noto_Naskh_Arabic, Source_Serif_4 } from "next/font/google";
import { useTheme } from "@/components/ThemeProvider";
import { tutorials } from "./tutorials";

const serif = Source_Serif_4({ subsets: ["latin"], style: ["normal", "italic"] });
const naskh = Noto_Naskh_Arabic({ subsets: ["arabic"], preload: false });

const AUTHOR = "Houssam Eddine Guechi";
const AVATAR = "/cropped-image(4).png";

const defaultLabels = {
  back: "Houssam Eddine",
  writtenBy: "Written by",
  role: "Full Stack Developer",
  more: "More tutorials",
};

function TopBar({ actions, back }: { actions?: React.ReactNode; back: string }) {
  const { theme, toggle } = useTheme();
  return (
    <div className="border-b border-gray-100 dark:border-gray-900">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between font-poppins rtl:font-[family-name:inherit]">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <span className="rtl:rotate-180">←</span>
          {back}
        </Link>
        <div className="flex items-center gap-3">
          {actions}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"} text-sm`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ArticleLayout({
  tag,
  title,
  lede,
  readTime,
  currentHref,
  dir = "ltr",
  actions,
  labels,
  children,
}: {
  tag: string;
  title: string;
  lede: React.ReactNode;
  readTime: string;
  currentHref: string;
  dir?: "ltr" | "rtl";
  actions?: React.ReactNode;
  labels?: Partial<typeof defaultLabels>;
  children: React.ReactNode;
}) {
  const l = { ...defaultLabels, ...labels };
  const bodyFont = dir === "rtl" ? naskh.className : serif.className;
  const others = tutorials.filter((t) => t.href !== currentHref);

  return (
    <div
      dir={dir}
      className={`min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-300 transition-colors ${dir === "rtl" ? naskh.className : ""}`}
    >
      <TopBar actions={actions} back={l.back} />

      <div className="max-w-5xl mx-auto px-6">
        <header className="pt-14 pb-10 border-b border-gray-100 dark:border-gray-900">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-4">
            {tag}
          </p>
          <h1 className="font-poppins rtl:font-[family-name:inherit] text-3xl sm:text-[2.5rem] font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-5">
            {title}
          </h1>
          <p className={`${bodyFont} text-xl leading-8 text-gray-600 dark:text-gray-400 mb-8`}>
            {lede}
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <Image
              src={AVATAR}
              alt={AUTHOR}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span>
              <span className="font-medium text-gray-900 dark:text-gray-200">{AUTHOR}</span>
              <span className="mx-2">·</span>
              {readTime}
            </span>
          </div>
        </header>

        <article className={`${bodyFont} pt-10 text-[1.125rem] leading-8`}>
          {children}
        </article>

        <footer className="mt-16 pt-10 pb-20 border-t border-gray-100 dark:border-gray-900 text-sm">
          <div className="flex items-start gap-4">
            <Image
              src={AVATAR}
              alt={AUTHOR}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-gray-500 dark:text-gray-500">{l.writtenBy}</p>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{AUTHOR}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{l.role}</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/h0996g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/geuchi-houssam-eddine-342b4331a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {others.length > 0 && (
            <div className="mt-12">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-4">
                {l.more}
              </p>
              <ul className="space-y-3">
                {others.map((t) => (
                  <li key={t.href}>
                    <Link
                      href={t.href}
                      className="text-base text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
                    >
                      <bdi>{t.title}</bdi>{" "}
                      <span className="inline-block rtl:rotate-180">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

export function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Post not found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="text-gray-900 dark:text-gray-100 underline underline-offset-4"
        >
          ← Back to the portfolio
        </Link>
      </div>
    </div>
  );
}

export function ArticleLoading() {
  return <div className="min-h-screen bg-white dark:bg-gray-950" />;
}
