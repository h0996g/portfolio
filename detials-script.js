// project-details.js

const projectsData = {
    // ... existing Creno app data ...

    "creno-app": {
        title: "Football Field Reservation App",
        subtitle: "A comprehensive solution for managing football field reservations and team activities",
        overview: "The Football Field Reservation App is a mobile application designed to streamline the process of booking football fields, managing teams, and organizing matches. It caters to players, team managers, and field owners, providing a seamless experience for all users.",
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
            "assets/creno/8.jpg"
        ],
        githubLink: "#",
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
            "Cloud Services": ["Firebase (Storage for images and PDFs, 5GB free)"],
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
        githubLink: "#",
        demoLink: "#"
    },
    "adkar-app": {
        title: "Adkar: Muslim Remembrance App",
        subtitle: "A comprehensive application for Muslim daily remembrances and Quranic verses",
        overview: "Adkar is a mobile application designed to assist Muslims with their daily remembrances (adhkar), Quranic recitations, and spiritual practices. It offers a range of features including morning and evening remembrances, Quranic verses with interpretations, Allah's beautiful names, customizable rosary, and timely notifications.",
        keyFeatures: [
            "Morning and evening remembrances with counters",
            "Holy Quran with reading and interpretation",
            "Beautiful names of Allah with explanations",
            "Customizable digital rosary",
            "Quranic verses with audio recitations",
            "Notifications for remembrances and hourly reminders",
            "User feedback and update notification system"
        ],
        techStack: {
            Frontend: ["Flutter", "Cubit (State Management)"],
            Backend: ["firebase"],
            "Cloud Services": ["Firebase (Storage for audio, 5GB free)"],
            "Additional Features": ["Customizable notifications", "audio player,flutter_native_splash", "vibration"]
        },
        detailedFeatures: [
            {
                title: "Remembrances (Adhkar)",
                details: [
                    "Morning and evening remembrances with counters",
                    "Customizable digital rosary with adjustable repetitions",
                    "Hourly remembrance notifications"
                ]
            },
            {
                title: "Quranic Content",
                details: [
                    "Complete Holy Quran with reading and verse-by-verse interpretation",
                    "Selected Quranic verses with audio recitations",
                    "Multiple reciters and recitation styles"
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
                    "Application update notifications"
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
        ],
        githubLink: "#",
        demoLink: "#"
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
        ],
        githubLink: "#",
        demoLink: "#"
    },






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
    document.getElementById('github-link').href = project.githubLink;
    document.getElementById('demo-link').href = project.demoLink;

    const keyFeaturesList = document.getElementById('key-features');
    project.keyFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-check-circle-fill feature-icon"></i>${feature}`;
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
            ['Push Notifications (FCM)', 'Storage (5GB free)'].forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<small><i class="bi bi-check-circle-fill text-success me-2"></i>${item}</small>`;
                ul.appendChild(li);
            });
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

    const screenshotsDiv = document.getElementById('screenshots');
    project.screenshots.forEach((screenshot, index) => {
        const div = document.createElement('div');
        div.className = 'col-4 col-md-2';
        div.innerHTML = `<img src="${screenshot}" alt="App Screenshot ${index + 1}" class="img-fluid screenshot">`;
        screenshotsDiv.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadProjectDetails);

