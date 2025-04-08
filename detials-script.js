// project-details.js

const projectsData = {
    // ... existing Creno app data ...
    "memory-card-game": {
        title: "Memory Card Game",
        subtitle: "A versatile memory game with dark mode, single-player, local multiplayer, and online real-time modes",
        overview: "This Flutter-based Memory Card Game showcases advanced state management with GetX, real-time multiplayer functionality using Socket.io, and a user-friendly dark mode. It offers various play modes including single-player, local multiplayer for 2 players on the same device, and online multiplayer across different devices in real-time, demonstrating comprehensive Flutter development skills.",
        keyFeatures: [
            "Single-player mode for personal practice",
            "Local multiplayer mode for 2 players on the same device",
            "Online real-time multiplayer across different devices",
            "Dark mode for comfortable gameplay in low-light conditions",
            "Numbered cards for enhanced memory challenge",
            "GetX state management for efficient UI updates",
            "Socket.io integration for real-time gameplay",
            "Customizable difficulty levels",
            "Timed turns for strategic gameplay"
        ],
        techStack: {
            Frontend: ["Flutter", "GetX (State Management)"],
            Backend: ["Node.js", "Socket.io"],
            "Additional Packages": [
                "uuid",
                "url_launcher",
                "google_fonts"
            ]
        },
        detailedFeatures: [
            {
                title: "Game Modes",
                details: [
                    "Single-player mode with adjustable difficulty",
                    "Local multiplayer for 2 players on the same device",
                    "Online multiplayer with real-time card flipping and score updates",
                    "Practice mode for improving memory skills",
                    "Timed turns where each player has a set time to make their move"
                ]
            },
            {
                title: "GetX State Management",
                details: [
                    "Efficient state management for smooth UI updates",
                    "Reactive state handling for real-time game state changes",
                    "Separation of game logic and UI for better maintainability",
                    "Integration with get_storage for persistent dark mode settings"
                ]
            },
            {
                title: "Real-time Functionality",
                details: [
                    "Socket.io integration for instant multiplayer actions",
                    "Real-time card flipping visible to all players",
                    "Live score updates and game progress synchronization",
                    "Low-latency player matching for online games"
                ]
            },
            {
                title: "User Experience",
                details: [
                    "Dark mode toggle for comfortable gameplay in various lighting conditions",
                    "Intuitive card flipping animations",
                    "Dynamic scoreboard for tracking player performance",
                    "Google Fonts integration for attractive and readable text"
                ]
            },

        ],
        screenshots: [
            "assets/memory-card-game/1.jpg",
            "assets/memory-card-game/2.jpg",
            "assets/memory-card-game/3.jpg",
            "assets/memory-card-game/4.jpg",
            "assets/memory-card-game/5.jpg",
            "assets/memory-card-game/6.jpg",
            "assets/memory-card-game/7.jpg",
            "assets/memory-card-game/8.jpg"
        ],
        playstoreLink: "https://play.google.com/store/apps/details?id=app.netlify.houssameddine.memorygame",
        githubLinkFront: { 'owner': 'h0996g', 'projectId': 'memory_game' },
        githubLinkBack: { 'owner': 'h0996g', 'projectId': 'game_memory_Socket.io' },
        demoLink: "#"
    },
    "creno-app": {
        title: "Football Field Reservation App (Creno)",
        subtitle: "A comprehensive solution for managing football field reservations and team activities - Master's Thesis Project",
        overview: "The Football Field Reservation App, also known as Creno, is my final Master's thesis project at Université de Constantine 2 - Abdelhamid Mehri. This mobile application is designed to revolutionize the process of booking football fields, managing teams, and organizing matches in urban areas. It caters to players, team managers, and field owners, providing a seamless experience for all users while incorporating advanced features such as AI-based recommendation systems.",
        keyFeatures: [
            "View available fields and their schedules",
            "Book fields for specific time slots",
            "Create and manage teams",
            "Find players and opponents",
            "Field owner dashboard for managing bookings and promotions"
        ],
        techStack: {
            Frontend: ["Flutter", "Cubit (State Management)"],
            Backend: ["Node.js with Express", "MongoDB with Mongoose"],
            "Cloud Services": ["Firebase (Push Notifications FCM, Storage 5GB free)"],
            "Additional Features": ["Google Maps Integration", "Pagination with Cursor", "Lazy Loading", "Nodemailer (Forgot Password)", "Shared Preferences", "image_picker", "flutter_image_compress", "cached_network_image", "..."],
            "Machine Learning": ["Python (Recommendation System)"]
        },
        detailedFeatures: [
            {
                title: "Field Booking and Management",
                details: [
                    "View list of available fields",
                    "Check field availability and schedules",
                    "Book fields for specific time slots",
                    "View field details, photos, and ratings",
                    "Rent equipment (balls, uniforms)"
                ]
            },
            {
                title: "Team Management",
                details: [
                    "Create and manage teams",
                    "Search for players in different positions",
                    "Send and receive team invitations",
                    "Schedule matches with other teams",
                    "Record match results"
                ]
            },
            {
                title: "Field Owner Features",
                details: [
                    "Set field availability and operating hours",
                    "Manage booking requests",
                    "Create promotions and discounts",
                    "Organize tournaments",
                    "Manage field maintenance and improvements"
                ]
            }
        ],
        screenshots: [
            "assets/creno/1.jpg",
            "assets/creno/2.jpg",
            "assets/creno/3.jpg",
            "assets/creno/4.jpg",
            "assets/creno/5.jpg",
            "assets/creno/6.jpg",
            "assets/creno/7.jpg",
            "assets/creno/8.jpg",
            "assets/creno/diagramme_de_classes_creneau.png",
            "assets/creno/diagramme_de_cas_d'utlisation_creneau.png",
            "assets/creno/architecture_du_systeme_creneau.png",
        ],
        githubLinkFront: { 'owner': 'alaeddinovv', 'projectId': 'PFEprojet' },
        githubLinkBack: { 'owner': 'h0996g', 'projectId': 'creno' },
        demoLink: "#"
    }
    ,

    "fiqhpath-app": {
        title: "FiqhPath: Mosque Student Management App",
        subtitle: "An interactive platform for imams to manage and track student progress in mosque education",
        overview: "FiqhPath is a comprehensive mobile application designed to facilitate the learning process between mosque imams and their students. It offers a structured curriculum with topics, sections, and lessons, complete with video content, PDF attachments, comments, and quizzes. The app ensures student progress through quiz-based advancement and provides imams with tools to monitor student performance.",
        keyFeatures: [
            "Structured curriculum management (topics, sections, lessons)",
            "Video lessons with PDF attachments",
            "Interactive comments on lessons",
            "Quiz-based progression system",
            "Real-time student progress tracking for imams",
            "Multi-language support"
        ],
        techStack: {
            Frontend: ["Flutter", "Cubit (State Management)"],
            Backend: ["Node.js with Express", "Socket.IO (for real-time comments)", "Firebase"],
            "Cloud Services": ["Firebase (FCM,Storage for images and PDFs(5GB free))"],
            "Additional Features": ["Multi-language support", "Image compression", "YouTubePlayer", "cached_network_image"]
        },
        detailedFeatures: [
            {
                title: "Curriculum Management",
                details: [
                    "Create and organize topics, sections, and lessons",
                    "Upload video content for each lesson",
                    "Attach PDF documents to lessons",
                    "Set up quizzes for each lesson"
                ]
            },
            {
                title: "Student Learning Experience",
                details: [
                    "Access structured curriculum content",
                    "Watch video lessons and download PDF attachments",
                    "Participate in lesson discussions through comments",
                    "Take quizzes to progress to the next lesson",
                    "Track personal progress through the curriculum"
                ]
            },
            {
                title: "Imam Dashboard",
                details: [
                    "Monitor student progress in real-time",
                    "View quiz results for each student",
                    "Engage with students through lesson comments",
                    "Manage curriculum content and structure"
                ]
            },
            {
                title: "Technical Features",
                details: [
                    "Real-time commenting system using Socket.IO",
                    "YouTube video integration for lessons",
                    "Efficient image caching for improved performance",
                    "Firebase integration for secure file storage",
                    "Image compression to optimize storage usage"
                ]
            }
        ],
        screenshots: [
            "assets/fiqhpath/1.jpg",
            "assets/fiqhpath/2.jpg",
            "assets/fiqhpath/3.jpg",
            "assets/fiqhpath/4.jpg",
            "assets/fiqhpath/5.jpg",
            "assets/fiqhpath/6.jpg",
            "assets/fiqhpath/7.jpg",
            "assets/fiqhpath/8.jpg",
            "assets/fiqhpath/9.jpg",
            "assets/fiqhpath/10.jpg",
            "assets/fiqhpath/11.jpg",
        ],
        githubLinkFront: { 'owner': 'h0996g', 'projectId': 'mosqueFlutter' },
        githubLinkBack: { 'owner': 'h0996g', 'projectId': 'mosqueNode' }, demoLink: "#"
    },
    "adkar-app": {
        title: "Adkar: Muslim Remembrance App",
        subtitle: "A comprehensive application for Muslim daily remembrances and Quranic verses",
        overview: "Adkar is a mobile application designed to assist Muslims with their daily remembrances (adkar), Quranic recitations . It offers a range of features including morning and evening remembrances, Quranic verses with interpretations, Allah's beautiful names, customizable rosary, and timely notifications.",
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
            "Share app with link and small description or with QR code"
        ],
        techStack: {
            Frontend: ["Flutter", "kotlin", "Cubit (State Management)"],
            Backend: ["firebase", "kotlin"],
            "Cloud Services": ["Firebase (Storage for audio, 5GB free)"],
            "Additional Features": ["Local notifications", "audio player,flutter_native_splash", "vibration", "Custom notifications with Kotlin"]
        },
        detailedFeatures: [
            {
                title: "Remembrances (Adkar)",
                details: [
                    "Morning and evening remembrances with counters",
                    "Customizable digital rosary with adjustable repetitions",
                    "Customize reminders to repeat at your chosen times, ensuring you never miss your remembrances."
                ]
            },
            {
                title: "Quranic Content",
                details: [
                    "Complete Holy Quran with reading and verse-by-verse interpretation",
                    "Selected Quranic verses with audio recitations",
                    "Multiple reciters"
                ]
            },
            {
                title: "Divine Names",
                details: [
                    "List of Allah's beautiful names (Al-Asma ul-Husna)",
                    "Detailed explanations for each name"
                ]
            },
            {
                title: "User Experience",
                details: [
                    "Customizable notification system for reminders",
                    "In-app feedback and suggestion submission",
                    "Get notified when a new version of Adkar is released, with a brief overview of the changes and improvements made."
                ]
            },
            {
                "title": "Sharing and Social",
                "details": [
                    "Effortlessly share audio with friends on social media",
                    "Share app with link and small description or with QR code"
                ]
            }
        ],
        screenshots: [
            "assets/adkar/1.jpg",
            "assets/adkar/2.jpg",
            "assets/adkar/3.jpg",
            "assets/adkar/4.jpg",
            "assets/adkar/5.jpg",
            "assets/adkar/6.jpg",
            "assets/adkar/7.jpg",
            "assets/adkar/8.jpg",
            "assets/adkar/9.jpg",
            "assets/adkar/10.jpg",
            "assets/adkar/11.jpg",
            "assets/adkar/12.jpg",
            "assets/adkar/13.jpg",
            "assets/adkar/14.jpg",
            "assets/adkar/15.jpg",
            "assets/adkar/16.jpg",
            "assets/adkar/17.jpg",
            "assets/adkar/18.jpg",
        ],
        playstoreLink: "https://play.google.com/store/apps/details?id=com.h0774g.alhou",
        "githubLink": "https://github.com/h0996g/adkar",
        "demoLink": "https://play.google.com/store/apps/details?id=com.h0774g.alhou"
    },
    "tic-tac-toe-app": {
        title: "Tic Tac Toe Game",
        subtitle: "A multiplayer Tic Tac Toe game with real-time functionality",
        overview: "This Tic Tac Toe game offers multiple play modes: against the machine, against a friend on the same device, or against a remote player using Firebase Firestore for real-time updates. It's a great example of implementing real-time functionality in a mobile game.",
        keyFeatures: [
            "Play against machine",
            "Local multiplayer on the same device",
            "Online multiplayer using Firebase Firestore",
            "Real-time game updates",
            "Practice real-time database interactions"
        ],
        techStack: {
            Frontend: ["Flutter", "Cubit (State Management)"],
            Backend: ["Firebase Firestore"],
            "Additional Features": ["Real-time updates", "Machine opponent"]
        },
        detailedFeatures: [
            {
                title: "Game Modes",
                details: [
                    "Single-player mode against machine",
                    "Local multiplayer on the same device",
                    "Online multiplayer with real-time updates"
                ]
            },
            {
                title: "Firebase Integration",
                details: [
                    "Real-time game state synchronization",
                    "Player matching for online games",
                    "Secure and scalable backend"
                ]
            },
            {
                title: "User Experience",
                details: [
                    "Intuitive game interface",
                    "Smooth transitions between turns",
                    "Real-time updates for online games"
                ]
            }
        ],
        screenshots: [
            "assets/tictactoe/1.jpg",
            "assets/tictactoe/2.jpg",
            "assets/tictactoe/3.jpg",
            "assets/tictactoe/4.jpg",
            "assets/tictactoe/5.jpg",
            "assets/tictactoe/6.jpg",
            "assets/tictactoe/7.jpg",
            "assets/tictactoe/8.jpg",
        ],
        playstoreLink: "https://play.google.com/store/apps/details?id=com.h0774g.tictactoefir",
        githubLink: "https://github.com/h0996g/tictactoeFir",
        demoLink: "#"
    },
    "responsive-design-showcase": {
        title: "Responsive Design Showcase",
        subtitle: "Demonstrating harmonious design across various devices",
        overview: "This Flutter application showcases my capabilities in creating harmonious designs that adapt seamlessly across various devices, including computers and mobile phones. The design incorporates multiple tasks and elements efficiently on a single page, highlighting the power of responsive and cohesive design principles using Flutter and GetX for state management.",
        keyFeatures: [
            "Responsive layout adapting to different screen sizes",
            "Efficient use of space to display multiple tasks",
            "Harmonious color scheme and typography",
            "Intuitive navigation across different sections",
            "Optimized performance across devices"
        ],
        techStack: {
            Frontend: ["Flutter", "GetX (State Management)"],
            Backend: ["Node.js (Simple server for items)"],
            "Additional Packages": ["flutter_slidable", "flutter_svg"],
            "Responsive Design": ["FittedBox", "MediaQuery", "LayoutBuilder"]
        },
        detailedFeatures: [
            {
                title: "Responsive Layout",
                details: [
                    "Utilizes MediaQuery for adaptive layouts",
                    "FittedBox for flexible content sizing",
                    "LayoutBuilder for conditional layouts",
                    "Flexible and Expanded widgets for proportional spacing"
                ]
            },
            {
                title: "State Management with GetX",
                details: [
                    "Efficient state management for responsive UI updates",
                    "Reactive state handling for dynamic content",
                    "GetX controllers for separation of concerns"
                ]
            },
            {
                title: "Interactive Elements",
                details: [
                    "flutter_slidable for swipeable list items",
                    "Custom SVG icons using flutter_svg",
                    "Animated transitions for smooth user experience"
                ]
            },
            {
                title: "Backend Integration",
                details: [
                    "Simple Node.js server for item management",
                    "CRUD operations: Add, Delete, and Freeze items",
                    "RESTful API for seamless frontend-backend communication"
                ]
            }
        ],
        screenshots: [
            "assets/figma/origine1.jpg",
            "assets/figma/origine2.jpg",
            "assets/figma/poco1.jpg",
            "assets/figma/poco2.jpg",
            "assets/figma/emulator1.png",
            "assets/figma/web1.png",
            "assets/figma/web2.png",
            "assets/figma/web12.png",
            "assets/figma/web22.png",
        ],
        githubLink: "https://github.com/h0996g/figma",
        demoLink: "#"
    },
"courassy-app": {
    "title": "Courassy - Mobile Learning App",
    "subtitle": "A smooth educational mobile platform with real-time messaging, sleek design, and multilingual support",
    "overview": "Courassy is an intuitive mobile app developed using Flutter. It aims to transform distance education by connecting students with professional instructors through a user-friendly interface. Courassy supports multiple languages, features an instant messaging system with file sharing, and allows learners to attend live or recorded online courses.",
    "keyFeatures": [
        "Simple and modern user interface",
        "Secure login via Google Sign-In",
        "Real-time messaging with file support (text, images, documents)",
        "Multilingual support (French, Arabic)",
        "Smooth navigation using GoRouter",
        "Custom notifications for courses and messages"
    ],
    "techStack": {
        "Frontend": ["Flutter", "BLoC (State Management)"],
        "Backend": ["REST API", "Real-time messaging system"],
        "Additional Features": [
            "Hive Local Database",
            "Multi-language support",
            "Google Sign-In Authentication",
            "GoRouter for efficient navigation",
            "Push Notifications",
            "File sharing in chat (images, documents)",
            "Responsive layout (mobile/tablet)",
            "Message and media caching"
        ]
    },
    "detailedFeatures": [
        {
            "title": "Student Experience",
            "details": [
                "Multilingual journey with dynamic language switching",
                "Attend live or recorded courses",
                "Direct messaging with instructors and file sharing",
                "Progress tracking and personalized notifications"
            ]
        },
        {
            "title": "Instructor Experience",
            "details": [
                "Create and manage courses from mobile",
                "Instant communication with students",
                "Dashboard to manage sessions and view discussions",
                "Track engagement and gather learner feedback"
            ]
        },
        {
            "title": "Technical Features",
            "details": [
                "Fast navigation using GoRouter",
                "Secure login through Google Sign-In",
                "Real-time messaging system with file support",
                "Notifications for reminders, courses, and new messages",
                "Media caching for better performance"
            ]
        }
    ],
    "screenshots": [
        "assets/courassy/1.png",
        "assets/courassy/2.png",
        "assets/courassy/3.png",
        "assets/courassy/4.png",
        "assets/courassy/5.png",
        "assets/courassy/6.png",
        "assets/courassy/7.png",
        "assets/courassy/8.png",
        "assets/courassy/9.png",
        "assets/courassy/10.png",
        "assets/courassy/11.png",
        "assets/courassy/12.png",
        "assets/courassy/13.png",
        "assets/courassy/14.png",
        "assets/courassy/15.png",
        "assets/courassy/16.png",
        "assets/courassy/17.png"
    ],
    "githubLinkFront": null,
    "githubLinkBack": null
}




    // Add more projects here
};
  
function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const project = projectsData[projectId];

    if (!project) {
        console.error("Project not found");
        return;
    }
    document.title = `${project.title} - Project Details`;

    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-subtitle').textContent = project.subtitle;
    document.getElementById('project-overview').textContent = project.overview;
    document.getElementById('github-link').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior
        if (project.githubLinkFront == null || project.githubLinkBack == null) {
            window.open(project.githubLink);
        }
        showGitHubOptions(
            { owner: project.githubLinkFront.owner, projectId: project.githubLinkFront.projectId },
            { owner: project.githubLinkBack.owner, projectId: project.githubLinkBack.projectId },
        );
    });
    // document.getElementById('demo-link').addEventListener('click', (e) => {
    //     e.preventDefault(); // Prevent the default link behavior
    //     window.open(project.demoLink, '_blank'); // Open the demo link in a new window/tab
    // });
    if (project.playstoreLink && project.playstoreLink.trim() !== '' && project.playstoreLink !== '#') {
        document.getElementById('playstore-link').addEventListener('click', (e) => {
          e.preventDefault();
          window.open(project.playstoreLink, '_blank');
        });
      } else {
        // Optionally, hide the button if the link is not valid.
        document.getElementById('playstore-link').style.display = 'none';
      }
      

    const keyFeaturesList = document.getElementById('key-features');
    project.keyFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-check feature-icon"></i>${feature}`;
        keyFeaturesList.appendChild(li);
    });

    const techStackDiv = document.getElementById('tech-stack');
    for (const [category, technologies] of Object.entries(project.techStack)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'mb-4';

        const h4 = document.createElement('h4');
        h4.textContent = category;
        h4.className = 'mb-3';
        categoryDiv.appendChild(h4);

        const techList = document.createElement('div');
        techList.className = 'd-flex flex-wrap gap-2';

        technologies.forEach(tech => {
            const techBadge = document.createElement('span');
            techBadge.className = 'badge rounded-pill';
            techBadge.textContent = tech;

            // Assign color classes based on the category
            switch (category) {
                case 'Frontend':
                    techBadge.classList.add(tech.includes('Flutter') ? 'bg-primary' : 'bg-danger');
                    break;
                case 'Backend':
                    if (tech.includes('Node.js')) {
                        techBadge.classList.add('bg-success');
                    } else if (tech.includes('MongoDB')) {
                        techBadge.classList.add('bg-danger');
                    } else {
                        techBadge.classList.add('bg-warning', 'text-dark');
                    }
                    break;
                case 'Cloud Services':
                    techBadge.classList.add('bg-info', 'text-dark');
                    break;
                case 'Machine Learning':
                    techBadge.classList.add('bg-dark');
                    break;
                default:
                    techBadge.classList.add('bg-secondary');
            }

            techList.appendChild(techBadge);
        });

        categoryDiv.appendChild(techList);

        // Add list items for Cloud Services
        if (category === 'Cloud Services') {
            const ul = document.createElement('ul');
            ul.className = 'list-unstyled mt-2 ms-2';
            // ['Push Notifications (FCM)', 'Storage (5GB free)'].forEach(item => {
            //     const li = document.createElement('li');
            //     li.innerHTML = `<small><i class="bi bi-check-circle-fill text-success me-2"></i>${item}</small>`;
            //     ul.appendChild(li);
            // });
            categoryDiv.appendChild(ul);
        }

        techStackDiv.appendChild(categoryDiv);
    }

    // 
    const featureAccordion = document.getElementById('featureAccordion');
    project.detailedFeatures.forEach((feature, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                    ${feature.title}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#featureAccordion">
                <div class="accordion-body">
                    <ul>
                        ${feature.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        featureAccordion.appendChild(accordionItem);
    });
    const githubLinkBtn = document.getElementById('github-link');
    githubLinkBtn.style.display = 'none'; // Hide by default
    
    if (project.githubLink || project.githubLinkFront || project.githubLinkBack) {
        githubLinkBtn.style.display = 'inline-block'; // Or 'flex', 'block', depending on your layout
    
        githubLinkBtn.addEventListener('click', (e) => {
            e.preventDefault();
    
            if (project.githubLink) {
                // Simple single-link case
                window.open(project.githubLink, '_blank');
            } else if (project.githubLinkFront && project.githubLinkBack) {
                // Both Front and Back links exist
                showGitHubOptions(
                    { owner: project.githubLinkFront.owner, projectId: project.githubLinkFront.projectId },
                    { owner: project.githubLinkBack.owner, projectId: project.githubLinkBack.projectId }
                );
            } else if (project.githubLinkFront) {
                // Only front-end repo
                window.open(`https://github.com/${project.githubLinkFront.owner}/${project.githubLinkFront.projectId}`, '_blank');
            } else if (project.githubLinkBack) {
                // Only back-end repo
                window.open(`https://github.com/${project.githubLinkBack.owner}/${project.githubLinkBack.projectId}`, '_blank');
            }
        });
    }
    
    

// Play Store Button Handling
document.getElementById('playstore-link').addEventListener('click', (e) => {
    e.preventDefault();
    if (project.playstoreLink && project.playstoreLink.trim() !== '' && project.playstoreLink !== '#') {
        window.open(project.playstoreLink, '_blank');
    } else {
        showComingSoonModal();
    }
});

    // const screenshotsDiv = document.getElementById('screenshots');
    // project.screenshots.forEach((screenshot, index) => {
    //     const div = document.createElement('div');
    //     div.className = 'col-4 col-md-2';
    //     div.innerHTML = `<img src="${screenshot}" alt="App Screenshot ${index + 1}" class="img-fluid screenshot">`;
    //     screenshotsDiv.appendChild(div);

    // });

    const screenshotsDiv = document.getElementById('screenshots');
    project.screenshots.forEach((screenshot, index) => {
        const div = document.createElement('div');
        div.className = 'col-4 col-md-2';
        div.innerHTML = `<img src="${screenshot}" alt="App Screenshot ${index + 1}" class="img-fluid screenshot">`;
        div.querySelector('img').addEventListener('click', () => openImageModal(index));
        screenshotsDiv.appendChild(div);
    });

    // Add event listeners for navigation buttons
    document.getElementById('prevImage').addEventListener('click', () => changeImage(-1));
    document.getElementById('nextImage').addEventListener('click', () => changeImage(1));
}

let currentImageIndex = 0;

function openImageModal(index) {
    currentImageIndex = index;
    const modalImage = document.getElementById('modalImage');
    modalImage.src = projectsData[getCurrentProjectId()].screenshots[index];
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
}

function changeImage(direction) {
    const screenshots = projectsData[getCurrentProjectId()].screenshots;
    currentImageIndex = (currentImageIndex + direction + screenshots.length) % screenshots.length;
    document.getElementById('modalImage').src = screenshots[currentImageIndex];
}

function getCurrentProjectId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
function showGitHubOptions(front, back) {
    Swal.fire({
        title: 'Select Repository',
        html: `
      <p class="swal-text">Choose which part of the project you'd like to view:</p>
      <div class="swal-button-container">
        <button id="frontend-btn" class="swal-button">Frontend</button>
        <button id="backend-btn" class="swal-button">Backend</button>
      </div>
    `,
        showConfirmButton: false,
        showCloseButton: true,
        background: '#f8f9fa',
        customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            closeButton: 'swal-close-button'
        },
        didOpen: () => {
            document.getElementById('frontend-btn').addEventListener('click', () => {
                window.open(`https://github.com/${front.owner}/${front.projectId}`);
                Swal.close();
            });
            document.getElementById('backend-btn').addEventListener('click', () => {
                window.open(`https://github.com/${back.owner}/${back.projectId}`);
                Swal.close();
            });
        }
    });
}



document.addEventListener('DOMContentLoaded', loadProjectDetails);

