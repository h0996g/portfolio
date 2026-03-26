"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

declare global {
  interface Window {
    Swal: {
      fire: (options: Record<string, unknown>) => void;
      close: () => void;
    };
  }
}

interface ProjectCard {
  title: string;
  image: string;
  video?: string;
  themeColor?: string;
  inProgress?: boolean;
  appStore?: string;
  playStore?: string;
  playStoreComingSoon?: boolean;
  github?: string;
  githubOptions?: {
    front: { owner: string; projectId: string };
    back: { owner: string; projectId: string };
  };
  websiteLink?: string;
  detailsId?: string;
}

const projects: ProjectCard[] = [
  {
    title: "NavMarket",
    image: "/naviguih.png",
    video: "/pub/navMarket2.mp4",
    themeColor: "rgb(246, 133, 31)",
    appStore:
      "https://apps.apple.com/hk/app/naviguih/id6739255560?l=en-GB&platform=iphone",
    playStore: "https://play.google.com/store/apps/details?id=com.naviguih.app",
  },
  {
    title: "NavFood",
    image: "/navfood.png",
    video: "/pub/navFood.mp4",
    themeColor: "rgb(211, 33, 41)",
    appStore:
      "https://apps.apple.com/dz/app/navfood/id6742744572?platform=iphone",
    playStore:
      "https://play.google.com/store/apps/details?id=com.sarlkig.navfood",
  },
  {
    title: "NavDelivery",
    image: "/navdelivery.png",
    video: "/pub/navDelivery.mp4",
    themeColor: "rgb(0, 206, 181)",
    appStore:
      "https://apps.apple.com/dz/app/navdelivery/id6745877102?platform=iphone",
    playStore:
      "https://play.google.com/store/apps/details?id=com.sarlkig.navFoodDelivery",
  },
  {
    title: "NavRestaurant",
    image: "/navRestaurant.png",
    video: "/pub/navRestaurant.mp4",
    themeColor: "rgb(93, 12, 102)",
    appStore: "https://apps.apple.com/us/app/navrestaurant/id6751362901",
    playStore:
      "https://play.google.com/store/apps/details?id=com.sarlkig.NavRestaurant",
  },
  {
    title: "Courassy",
    image: "/courassy3.png",
    inProgress: true,
    playStoreComingSoon: true,
    detailsId: "courassy-app",
  },
  {
    title: "VTC Platform",
    image: "/vtc_app.png",
    playStoreComingSoon: true,
    websiteLink: "https://vtc-admin.netlify.app/",
    detailsId: "vtc-platform",
  },
  {
    title: "massalah (مسلة)",
    image: "/مسلة.png",
    appStore:
      "https://apps.apple.com/us/app/%D9%85%D8%B3%D9%84%D8%A9/id6753812374",
    playStore:
      "https://play.google.com/store/apps/details?id=com.endpointsoft.massalah",
  },
  {
    title: "massalah Provider (مسلة مقدم الخدمة)",
    image: "/مسلة.png",
    appStore: "https://apps.apple.com/us/app/مسلة-مقدم-الخدمة/id6753877345",
    playStore:
      "https://play.google.com/store/apps/details?id=com.endpointsoft.masallah_provider",
  },
  {
    title: "Feedback",
    image: "/Feedback.png",
    websiteLink: "https://endpointsoft.com/feedback/",
  },
  {
    title: "Ajr",
    image: "/ADKAR0.png",
    playStore: "https://play.google.com/store/apps/details?id=com.ajr.app",
    websiteLink: "https://ajr-flutter.netlify.app/",
    detailsId: "ajr-app",
  },
  {
    title: "Creno Dz",
    image: "/creno.png",
    githubOptions: {
      front: { owner: "alaeddinovv", projectId: "PFEprojet" },
      back: { owner: "h0996g", projectId: "creno" },
    },
    detailsId: "creno-app",
  },
  {
    title: "FiqhPath",
    image: "/mosque.jpg",
    githubOptions: {
      front: { owner: "h0996g", projectId: "mosqueFlutter" },
      back: { owner: "h0996g", projectId: "mosqueNode" },
    },
    detailsId: "fiqhpath-app",
  },
  {
    title: "Responsive Design",
    image: "/responsive.jpg",
    github: "https://github.com/h0996g/figma",
    detailsId: "responsive-design-showcase",
  },
];

interface TutorialCard {
  title: string;
  image: string;
  href: string;
}

const tutorials: TutorialCard[] = [
  {
    title: "Pixel espion with Express.js",
    image: "/pixel.png",
    href: "/backend?id=blog-1",
  },
  {
    title:
      "BlocProvider.of() called with a context that does not contain a Bloc",
    image: "/stackoverflow.webp",
    href: "/flutter?id=blog-1",
  },
  {
    title: "Optimize Heavy Tasks in Flutter Using Isolate",
    image: "/isolate.png",
    href: "/tutorials/isolate",
  },
];

function showGitHubOptions(
  front: { owner: string; projectId: string },
  back: { owner: string; projectId: string },
) {
  if (typeof window !== "undefined" && window.Swal) {
    window.Swal.fire({
      title: "Select Repository",
      html: `
        <p class="swal-text">Choose which part of the project you'd like to view:</p>
        <div class="swal-button-container">
          <button id="frontend-btn" class="swal-button">Frontend</button>
          <button id="backend-btn" class="swal-button">Backend</button>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      background: "#f8f9fa",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        closeButton: "swal-close-button",
      },
      didOpen: () => {
        document
          .getElementById("frontend-btn")
          ?.addEventListener("click", () => {
            window.open(`https://github.com/${front.owner}/${front.projectId}`);
            window.Swal.close();
          });
        document
          .getElementById("backend-btn")
          ?.addEventListener("click", () => {
            window.open(`https://github.com/${back.owner}/${back.projectId}`);
            window.Swal.close();
          });
      },
    });
  }
}

function showComingSoon() {
  if (typeof window !== "undefined" && window.Swal) {
    window.Swal.fire({
      title: "Coming Soon",
      html: `
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:4px 0 8px">
          <lottie-player
            src="/lottie/Coming soon.json"
            background="transparent"
            speed="1"
            style="width:200px;height:200px"
            loop autoplay>
          </lottie-player>
          <p style="color:#374151;font-size:15px;margin:0;line-height:1.6;text-align:center">
            This app is on its way to the <strong>Play Store</strong>.<br/>Stay tuned for the launch!
          </p>
          <span style="display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;border-radius:999px;padding:4px 14px;font-size:12px;font-weight:600">
            <span style="width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block"></span>
            In Development
          </span>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      background: "#ffffff",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        closeButton: "swal-close-button",
      },
    });
  }
}

function VideoDialog({
  src,
  title,
  themeColor,
  onClose,
}: {
  src: string;
  title: string;
  themeColor: string;
  onClose: () => void;
}) {
  const dialogVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with theme color tint */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundColor: `color-mix(in srgb, ${themeColor} 25%, black 75%)`,
        }}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: `0 0 60px 0 color-mix(in srgb, ${themeColor} 40%, transparent)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ backgroundColor: themeColor }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/80"></span>
            </span>
            <i className="fas fa-clapperboard text-white text-sm"></i>
            <span className="text-white text-sm font-bold tracking-widest uppercase">
              Promo · {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer border-0"
            aria-label="Close"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Video */}
        <div className="bg-black aspect-video">
          <video
            ref={dialogVideoRef}
            src={src}
            className="w-full h-full object-contain"
            autoPlay
            playsInline
            controls
            onEnded={onClose}
          />
        </div>

        {/* Bottom accent bar */}
        <div className="h-1" style={{ backgroundColor: themeColor }} />
      </div>
    </div>
  );
}

function ProjectCardComponent({ project }: { project: ProjectCard }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      {/* Video dialog modal */}
      {project.video && showDialog && (
        <VideoDialog
          src={project.video}
          title={project.title}
          themeColor={project.themeColor ?? "rgb(244, 63, 94)"}
          onClose={() => setShowDialog(false)}
        />
      )}

      <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 flex flex-col relative">
        {project.inProgress && (
          <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            In Progress
          </span>
        )}

        {/* Beautiful PROMO badge */}
        {project.video && (
          <button
            onClick={() => setShowDialog(true)}
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer border-0 bg-linear-to-r from-rose-500 via-pink-500 to-orange-400 shadow-[0_0_12px_rgba(244,63,94,0.6)] hover:shadow-[0_0_20px_rgba(244,63,94,0.85)] transition-all duration-300 hover:scale-105"
            aria-label="Watch promo video"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <i className="fas fa-clapperboard text-white text-[11px]"></i>
            <span className="text-white text-[11px] font-extrabold tracking-widest uppercase">
              Promo
            </span>
          </button>
        )}

        <div
          className={`aspect-4/3 overflow-hidden bg-gray-200 dark:bg-gray-700 relative ${project.detailsId ? "cursor-pointer" : ""}`}
          onClick={
            project.detailsId
              ? () =>
                  (window.location.href = `/details?id=${project.detailsId}`)
              : undefined
          }
        >
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={300}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Play overlay on image hover */}
          {project.video && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDialog(true);
              }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer border-0"
              aria-label="Play promo video"
            >
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200 ring-4 ring-white/30">
                <i className="fas fa-play text-white text-xl ml-1"></i>
              </div>
              <span className="text-white text-sm font-semibold tracking-wide drop-shadow-lg">
                Watch Promo
              </span>
            </button>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 mt-auto flex-wrap">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <i className="fab fa-github mr-1"></i>Github
              </a>
            )}
            {project.githubOptions && (
              <button
                className="px-4 py-2 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                onClick={() =>
                  showGitHubOptions(
                    project.githubOptions!.front,
                    project.githubOptions!.back,
                  )
                }
              >
                <i className="fab fa-github mr-1"></i>Github
              </button>
            )}
            {project.detailsId && (
              <Link
                href={`/details?id=${project.detailsId}`}
                className="px-4 py-2 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 no-underline"
              >
                Details
              </Link>
            )}
            {project.appStore && (
              <a
                href={project.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white text-xs font-semibold no-underline hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 group"
              >
                <i className="fab fa-apple text-lg group-hover:scale-110 transition-transform"></i>
                <span>App Store</span>
              </a>
            )}
            {project.playStore && (
              <a
                href={project.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold no-underline hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 group"
              >
                <i className="fab fa-google-play text-base group-hover:rotate-12 transition-transform"></i>
                <span>Play Store</span>
              </a>
            )}
            {project.playStoreComingSoon && (
              <button
                onClick={showComingSoon}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 group cursor-pointer border-0"
              >
                <i className="fab fa-google-play text-base group-hover:rotate-12 transition-transform"></i>
                <span>Play Store</span>
              </button>
            )}
            {project.websiteLink && (
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold no-underline hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 group"
              >
                <i className="fas fa-globe text-base group-hover:rotate-12 transition-transform"></i>
                <span>Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function TutorialCardComponent({ tutorial }: { tutorial: TutorialCard }) {
  return (
    <Link
      href={tutorial.href}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer no-underline"
    >
      <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
        <Image
          src={tutorial.image}
          alt={tutorial.title}
          width={400}
          height={225}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 leading-snug">
          {tutorial.title}
        </h3>
        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 text-gray-900 dark:text-gray-300 text-sm font-medium">
            Read More <i className="fas fa-arrow-right text-xs"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"projects" | "tutorials">(
    "projects",
  );

  return (
    <section
      id="projects-and-tutorials"
      className="py-20 px-6 dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase mb-2">
            Browse My Recent
          </p>
          <h2 className="text-4xl max-sm:text-2xl font-bold text-gray-900 dark:text-white">
            Projects & Tutorials
          </h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-10 gap-2">
          <button
            className={`toggle-btn px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-transparent bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <i className="fas fa-briefcase mr-2"></i>Projects
          </button>
          <button
            className={`toggle-btn px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-transparent bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${activeTab === "tutorials" ? "active" : ""}`}
            onClick={() => setActiveTab("tutorials")}
          >
            <i className="fas fa-book-open mr-2"></i>Tutorials
          </button>
        </div>

        {/* Content */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCardComponent key={project.title} project={project} />
            ))}
          </div>
        )}

        {activeTab === "tutorials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <TutorialCardComponent key={tutorial.title} tutorial={tutorial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
