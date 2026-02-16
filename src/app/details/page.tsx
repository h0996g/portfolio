"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectData {
  title: string;
  subtitle: string;
  overview: string;
  keyFeatures: string[];
  techStack: Record<string, string[]>;
  detailedFeatures: { title: string; details: string[] }[];
  screenshots: string[];
  playstoreLink?: string;
  githubLink?: string;
  githubLinkFront?: { owner: string; projectId: string } | null;
  githubLinkBack?: { owner: string; projectId: string } | null;
}

const projectsData: Record<string, ProjectData> = {
  "memory-card-game": {
    title: "Memory Card Game",
    subtitle:
      "A versatile memory game with dark mode, single-player, local multiplayer, and online real-time modes",
    overview:
      "This Flutter-based Memory Card Game showcases advanced state management with GetX, real-time multiplayer functionality using Socket.io, and a user-friendly dark mode. It offers various play modes including single-player, local multiplayer for 2 players on the same device, and online multiplayer across different devices in real-time, demonstrating comprehensive Flutter development skills.",
    keyFeatures: [
      "Single-player mode for personal practice",
      "Local multiplayer mode for 2 players on the same device",
      "Online real-time multiplayer across different devices",
      "Dark mode for comfortable gameplay in low-light conditions",
      "Numbered cards for enhanced memory challenge",
      "GetX state management for efficient UI updates",
      "Socket.io integration for real-time gameplay",
      "Customizable difficulty levels",
      "Timed turns for strategic gameplay",
    ],
    techStack: {
      Frontend: ["Flutter", "GetX (State Management)"],
      Backend: ["Node.js", "Socket.io"],
      "Additional Packages": ["uuid", "url_launcher", "google_fonts"],
    },
    detailedFeatures: [
      {
        title: "Game Modes",
        details: [
          "Single-player mode with adjustable difficulty",
          "Local multiplayer for 2 players on the same device",
          "Online multiplayer with real-time card flipping and score updates",
          "Practice mode for improving memory skills",
          "Timed turns where each player has a set time to make their move",
        ],
      },
      {
        title: "GetX State Management",
        details: [
          "Efficient state management for smooth UI updates",
          "Reactive state handling for real-time game state changes",
          "Separation of game logic and UI for better maintainability",
          "Integration with get_storage for persistent dark mode settings",
        ],
      },
      {
        title: "Real-time Functionality",
        details: [
          "Socket.io integration for instant multiplayer actions",
          "Real-time card flipping visible to all players",
          "Live score updates and game progress synchronization",
          "Low-latency player matching for online games",
        ],
      },
      {
        title: "User Experience",
        details: [
          "Dark mode toggle for comfortable gameplay in various lighting conditions",
          "Intuitive card flipping animations",
          "Dynamic scoreboard for tracking player performance",
          "Google Fonts integration for attractive and readable text",
        ],
      },
    ],
    screenshots: Array.from(
      { length: 8 },
      (_, i) => `/memory-card-game/${i + 1}.jpg`,
    ),
    playstoreLink:
      "https://play.google.com/store/apps/details?id=app.netlify.houssameddine.memorygame",
    githubLinkFront: { owner: "h0996g", projectId: "memory_game" },
    githubLinkBack: { owner: "h0996g", projectId: "game_memory_Socket.io" },
  },
  "creno-app": {
    title: "Football Field Reservation App (Creno)",
    subtitle:
      "A comprehensive solution for managing football field reservations and team activities - Master's Thesis Project",
    overview:
      "The Football Field Reservation App, also known as Creno, is my final Master's thesis project at Université de Constantine 2 - Abdelhamid Mehri. This mobile application is designed to revolutionize the process of booking football fields, managing teams, and organizing matches in urban areas. It caters to players, team managers, and field owners, providing a seamless experience for all users while incorporating advanced features such as AI-based recommendation systems.",
    keyFeatures: [
      "View available fields and their schedules",
      "Book fields for specific time slots",
      "Create and manage teams",
      "Find players and opponents",
      "Field owner dashboard for managing bookings and promotions",
    ],
    techStack: {
      Frontend: ["Flutter", "Cubit (State Management)"],
      Backend: ["Node.js with Express", "MongoDB with Mongoose"],
      "Cloud Services": ["Firebase (Push Notifications FCM, Storage 5GB free)"],
      "Additional Features": [
        "Google Maps Integration",
        "Pagination with Cursor",
        "Lazy Loading",
        "Nodemailer (Forgot Password)",
        "Shared Preferences",
        "image_picker",
        "flutter_image_compress",
        "cached_network_image",
        "...",
      ],
      "Machine Learning": ["Python (Recommendation System)"],
    },
    detailedFeatures: [
      {
        title: "Field Booking and Management",
        details: [
          "View list of available fields",
          "Check field availability and schedules",
          "Book fields for specific time slots",
          "View field details, photos, and ratings",
          "Rent equipment (balls, uniforms)",
        ],
      },
      {
        title: "Team Management",
        details: [
          "Create and manage teams",
          "Search for players in different positions",
          "Send and receive team invitations",
          "Schedule matches with other teams",
          "Record match results",
        ],
      },
      {
        title: "Field Owner Features",
        details: [
          "Set field availability and operating hours",
          "Manage booking requests",
          "Create promotions and discounts",
          "Organize tournaments",
          "Manage field maintenance and improvements",
        ],
      },
    ],
    screenshots: [
      "/creno/1.jpg",
      "/creno/2.jpg",
      "/creno/3.jpg",
      "/creno/4.jpg",
      "/creno/5.jpg",
      "/creno/6.jpg",
      "/creno/7.jpg",
      "/creno/8.jpg",
      "/creno/diagramme_de_classes_creneau.png",
      "/creno/diagramme_de_cas_d'utlisation_creneau.png",
      "/creno/architecture_du_systeme_creneau.png",
    ],
    githubLinkFront: { owner: "alaeddinovv", projectId: "PFEprojet" },
    githubLinkBack: { owner: "h0996g", projectId: "creno" },
  },
  "fiqhpath-app": {
    title: "FiqhPath: Mosque Student Management App",
    subtitle:
      "An interactive platform for imams to manage and track student progress in mosque education",
    overview:
      "FiqhPath is a comprehensive mobile application designed to facilitate the learning process between mosque imams and their students. It offers a structured curriculum with topics, sections, and lessons, complete with video content, PDF attachments, comments, and quizzes. The app ensures student progress through quiz-based advancement and provides imams with tools to monitor student performance.",
    keyFeatures: [
      "Structured curriculum management (topics, sections, lessons)",
      "Video lessons with PDF attachments",
      "Interactive comments on lessons",
      "Quiz-based progression system",
      "Real-time student progress tracking for imams",
      "Multi-language support",
    ],
    techStack: {
      Frontend: ["Flutter", "Cubit (State Management)"],
      Backend: [
        "Node.js with Express",
        "Socket.IO (for real-time comments)",
        "Firebase",
      ],
      "Cloud Services": [
        "Firebase (FCM, Storage for images and PDFs (5GB free))",
      ],
      "Additional Features": [
        "Multi-language support",
        "Image compression",
        "YouTubePlayer",
        "cached_network_image",
      ],
    },
    detailedFeatures: [
      {
        title: "Curriculum Management",
        details: [
          "Create and organize topics, sections, and lessons",
          "Upload video content for each lesson",
          "Attach PDF documents to lessons",
          "Set up quizzes for each lesson",
        ],
      },
      {
        title: "Student Learning Experience",
        details: [
          "Access structured curriculum content",
          "Watch video lessons and download PDF attachments",
          "Participate in lesson discussions through comments",
          "Take quizzes to progress to the next lesson",
          "Track personal progress through the curriculum",
        ],
      },
      {
        title: "Imam Dashboard",
        details: [
          "Monitor student progress in real-time",
          "View quiz results for each student",
          "Engage with students through lesson comments",
          "Manage curriculum content and structure",
        ],
      },
      {
        title: "Technical Features",
        details: [
          "Real-time commenting system using Socket.IO",
          "YouTube video integration for lessons",
          "Efficient image caching for improved performance",
          "Firebase integration for secure file storage",
          "Image compression to optimize storage usage",
        ],
      },
    ],
    screenshots: Array.from({ length: 11 }, (_, i) => `/fiqhpath/${i + 1}.jpg`),
    githubLinkFront: { owner: "h0996g", projectId: "mosqueFlutter" },
    githubLinkBack: { owner: "h0996g", projectId: "mosqueNode" },
  },
  "adkar-app": {
    title: "Adkar: Muslim Remembrance App",
    subtitle:
      "A comprehensive application for Muslim daily remembrances and Quranic verses",
    overview:
      "Adkar is a mobile application designed to assist Muslims with their daily remembrances (adkar), Quranic recitations. It offers a range of features including morning and evening remembrances, Quranic verses with interpretations, Allah's beautiful names, customizable rosary, and timely notifications.",
    keyFeatures: [
      "Morning and evening remembrances with counters",
      "Holy Quran with reading and interpretation",
      "Beautiful names of Allah with explanations",
      "Customizable digital rosary",
      "Quranic verses with audio recitations",
      "Notifications for remembrances and hourly reminders",
      "User feedback and update notification system",
      "Custom notifications with repeat intervals (5min, 30min, 4h, etc.)",
      "Effortlessly share audio with friends on social media",
      "Share app with link and small description or with QR code",
    ],
    techStack: {
      Frontend: ["Flutter", "kotlin", "Cubit (State Management)"],
      Backend: ["firebase", "kotlin"],
      "Cloud Services": ["Firebase (Storage for audio, 5GB free)"],
      "Additional Features": [
        "Local notifications",
        "audio player, flutter_native_splash",
        "vibration",
        "Custom notifications with Kotlin",
      ],
    },
    detailedFeatures: [
      {
        title: "Remembrances (Adkar)",
        details: [
          "Morning and evening remembrances with counters",
          "Customizable digital rosary with adjustable repetitions",
          "Customize reminders to repeat at your chosen times, ensuring you never miss your remembrances.",
        ],
      },
      {
        title: "Quranic Content",
        details: [
          "Complete Holy Quran with reading and verse-by-verse interpretation",
          "Selected Quranic verses with audio recitations",
          "Multiple reciters",
        ],
      },
      {
        title: "Divine Names",
        details: [
          "List of Allah's beautiful names (Al-Asma ul-Husna)",
          "Detailed explanations for each name",
        ],
      },
      {
        title: "User Experience",
        details: [
          "Customizable notification system for reminders",
          "In-app feedback and suggestion submission",
          "Get notified when a new version of Adkar is released, with a brief overview of the changes and improvements made.",
        ],
      },
      {
        title: "Sharing and Social",
        details: [
          "Effortlessly share audio with friends on social media",
          "Share app with link and small description or with QR code",
        ],
      },
    ],
    screenshots: Array.from({ length: 18 }, (_, i) => `/adkar/${i + 1}.jpg`),
    playstoreLink:
      "https://play.google.com/store/apps/details?id=com.h0774g.alhou",
    githubLink: "https://github.com/h0996g/adkar",
  },
  "tic-tac-toe-app": {
    title: "Tic Tac Toe Game",
    subtitle: "A multiplayer Tic Tac Toe game with real-time functionality",
    overview:
      "This Tic Tac Toe game offers multiple play modes: against the machine, against a friend on the same device, or against a remote player using Firebase Firestore for real-time updates. It's a great example of implementing real-time functionality in a mobile game.",
    keyFeatures: [
      "Play against machine",
      "Local multiplayer on the same device",
      "Online multiplayer using Firebase Firestore",
      "Real-time game updates",
      "Practice real-time database interactions",
    ],
    techStack: {
      Frontend: ["Flutter", "Cubit (State Management)"],
      Backend: ["Firebase Firestore"],
      "Additional Features": ["Real-time updates", "Machine opponent"],
    },
    detailedFeatures: [
      {
        title: "Game Modes",
        details: [
          "Single-player mode against machine",
          "Local multiplayer on the same device",
          "Online multiplayer with real-time updates",
        ],
      },
      {
        title: "Firebase Integration",
        details: [
          "Real-time game state synchronization",
          "Player matching for online games",
          "Secure and scalable backend",
        ],
      },
      {
        title: "User Experience",
        details: [
          "Intuitive game interface",
          "Smooth transitions between turns",
          "Real-time updates for online games",
        ],
      },
    ],
    screenshots: Array.from({ length: 8 }, (_, i) => `/tictactoe/${i + 1}.jpg`),
    playstoreLink:
      "https://play.google.com/store/apps/details?id=com.h0774g.tictactoefir",
    githubLink: "https://github.com/h0996g/tictactoeFir",
  },
  "responsive-design-showcase": {
    title: "Responsive Design Showcase",
    subtitle: "Demonstrating harmonious design across various devices",
    overview:
      "This Flutter application showcases my capabilities in creating harmonious designs that adapt seamlessly across various devices, including computers and mobile phones. The design incorporates multiple tasks and elements efficiently on a single page, highlighting the power of responsive and cohesive design principles using Flutter and GetX for state management.",
    keyFeatures: [
      "Responsive layout adapting to different screen sizes",
      "Efficient use of space to display multiple tasks",
      "Harmonious color scheme and typography",
      "Intuitive navigation across different sections",
      "Optimized performance across devices",
    ],
    techStack: {
      Frontend: ["Flutter", "GetX (State Management)"],
      Backend: ["Node.js (Simple server for items)"],
      "Additional Packages": ["flutter_slidable", "flutter_svg"],
      "Responsive Design": ["FittedBox", "MediaQuery", "LayoutBuilder"],
    },
    detailedFeatures: [
      {
        title: "Responsive Layout",
        details: [
          "Utilizes MediaQuery for adaptive layouts",
          "FittedBox for flexible content sizing",
          "LayoutBuilder for conditional layouts",
          "Flexible and Expanded widgets for proportional spacing",
        ],
      },
      {
        title: "State Management with GetX",
        details: [
          "Efficient state management for responsive UI updates",
          "Reactive state handling for dynamic content",
          "GetX controllers for separation of concerns",
        ],
      },
      {
        title: "Interactive Elements",
        details: [
          "flutter_slidable for swipeable list items",
          "Custom SVG icons using flutter_svg",
          "Animated transitions for smooth user experience",
        ],
      },
      {
        title: "Backend Integration",
        details: [
          "Simple Node.js server for item management",
          "CRUD operations: Add, Delete, and Freeze items",
          "RESTful API for seamless frontend-backend communication",
        ],
      },
    ],
    screenshots: [
      "/figma/origine1.jpg",
      "/figma/origine2.jpg",
      "/figma/poco1.jpg",
      "/figma/poco2.jpg",
      "/figma/emulator1.png",
      "/figma/web1.png",
      "/figma/web2.png",
      "/figma/web12.png",
      "/figma/web22.png",
    ],
    githubLink: "https://github.com/h0996g/figma",
  },
  "courassy-app": {
    title: "Courassy - Mobile Learning App",
    subtitle:
      "Une plateforme mobile éducative fluide avec messagerie en temps réel, design épuré, et support multilingue",
    overview:
      "Courassy est une application mobile intuitive développée avec Flutter. Elle vise à transformer l'éducation à distance en connectant les étudiants avec des instructeurs professionnels via une interface conviviale. Courassy prend en charge plusieurs langues, propose un système de messagerie instantanée avec partage de fichiers, et permet aux apprenants de suivre des cours en ligne en direct ou enregistrés.",
    keyFeatures: [
      "Interface utilisateur simple et moderne",
      "Connexion sécurisée via Google Sign-In",
      "Messagerie en temps réel avec fichiers (texte, images, documents)",
      "Support multilingue (français, arabe)",
      "Navigation fluide grâce à GoRouter",
      "Notifications personnalisées pour les cours et les messages",
    ],
    techStack: {
      Frontend: ["Flutter", "BLoC (State Management)"],
      Backend: ["REST API", "Real-time messaging system"],
      "Additional Features": [
        "Hive Local Database",
        "Multi-language support",
        "Google Sign-In Authentication",
        "GoRouter for efficient navigation",
        "Push Notifications",
        "File sharing in chat (images, documents)",
        "Responsive layout (mobile/tablette)",
        "Message and media caching",
      ],
    },
    detailedFeatures: [
      {
        title: "Expérience Étudiant",
        details: [
          "Parcours multilingue avec changement de langue dynamique",
          "Suivi des cours en direct ou enregistrés",
          "Messagerie directe avec instructeurs avec partage de fichiers",
          "Progression visible et notifications personnalisées",
        ],
      },
      {
        title: "Expérience Instructeur",
        details: [
          "Création et gestion de cours depuis mobile",
          "Communication instantanée avec les étudiants",
          "Tableau de bord pour gérer les sessions et consulter les discussions",
          "Suivi de l'engagement et feedback des apprenants",
        ],
      },
      {
        title: "Fonctionnalités Techniques",
        details: [
          "Navigation rapide avec GoRouter",
          "Connexion sécurisée via Google Sign-In",
          "Système de messagerie en temps réel avec prise en charge des fichiers",
          "Notifications pour rappels, cours, et nouveaux messages",
          "Mise en cache des médias pour de meilleures performances",
        ],
      },
    ],
    screenshots: Array.from({ length: 17 }, (_, i) => `/courassy/${i + 1}.png`),
    githubLinkFront: null,
    githubLinkBack: null,
    playstoreLink:
      "https://play.google.com/store/apps/details?id=com.courassy.courassy",
  },
};

function getTechBadgeColor(category: string, tech: string): string {
  switch (category) {
    case "Frontend":
      return tech.includes("Flutter")
        ? "bg-blue-600 text-white"
        : "bg-red-500 text-white";
    case "Backend":
      if (tech.includes("Node.js")) return "bg-green-600 text-white";
      if (tech.includes("MongoDB")) return "bg-red-500 text-white";
      return "bg-yellow-500 text-gray-900";
    case "Cloud Services":
      return "bg-cyan-500 text-gray-900";
    case "Machine Learning":
      return "bg-gray-800 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

function DetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [modalImage, setModalImage] = useState<number | null>(null);

  const project = id ? projectsData[id] : null;

  const handlePrev = useCallback(() => {
    if (!project || modalImage === null) return;
    setModalImage(
      (modalImage - 1 + project.screenshots.length) %
        project.screenshots.length,
    );
  }, [project, modalImage]);

  const handleNext = useCallback(() => {
    if (!project || modalImage === null) return;
    setModalImage((modalImage + 1) % project.screenshots.length);
  }, [project, modalImage]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-colors no-underline"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const hasGithub =
    project.githubLink || project.githubLinkFront || project.githubLinkBack;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-br from-gray-900 to-gray-700 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Project Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              {project.overview}
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Key Features
            </h3>
            <ul className="space-y-2 mb-8">
              {project.keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-500 mt-1 shrink-0">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h3>
            <div className="space-y-4 mb-8">
              {Object.entries(project.techStack).map(
                ([category, technologies]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getTechBadgeColor(category, tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
              <h5 className="text-lg font-bold text-gray-900 mb-4">
                Project Links
              </h5>
              <div className="space-y-3">
                {hasGithub && (
                  <div>
                    {project.githubLink ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors no-underline w-full"
                      >
                        <i className="fab fa-github text-xl"></i>
                        <span className="font-medium text-sm">
                          View on GitHub
                        </span>
                      </a>
                    ) : project.githubLinkFront && project.githubLinkBack ? (
                      <div className="space-y-2">
                        <a
                          href={`https://github.com/${project.githubLinkFront.owner}/${project.githubLinkFront.projectId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors no-underline w-full"
                        >
                          <i className="fab fa-github text-xl"></i>
                          <span className="font-medium text-sm">
                            Frontend Repo
                          </span>
                        </a>
                        <a
                          href={`https://github.com/${project.githubLinkBack.owner}/${project.githubLinkBack.projectId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-600 transition-colors no-underline w-full"
                        >
                          <i className="fab fa-github text-xl"></i>
                          <span className="font-medium text-sm">
                            Backend Repo
                          </span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                )}
                {project.playstoreLink && (
                  <a
                    href={project.playstoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors no-underline w-full"
                  >
                    <i className="fab fa-google-play text-xl"></i>
                    <span className="font-medium text-sm">
                      Get it on Google Play
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Features Accordion */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-10">
          Detailed Features
        </h3>
        <div className="space-y-3 mb-12">
          {project.detailedFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setOpenAccordion(openAccordion === index ? -1 : index)
                }
              >
                {feature.title}
                <span
                  className={`transform transition-transform ${openAccordion === index ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-4">
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-blue-500 mt-1 shrink-0">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Screenshots */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          App Screenshots
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {project.screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              onClick={() => setModalImage(index)}
            >
              <Image
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                width={200}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors no-underline font-medium"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 cursor-pointer bg-transparent border-none"
              onClick={() => setModalImage(null)}
            >
              ✕
            </button>
            <Image
              src={project.screenshots[modalImage]}
              alt={`Screenshot ${modalImage + 1}`}
              width={800}
              height={600}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold cursor-pointer border-none shadow-md"
              onClick={handlePrev}
            >
              ‹
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold cursor-pointer border-none shadow-md"
              onClick={handleNext}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <DetailsContent />
    </Suspense>
  );
}
