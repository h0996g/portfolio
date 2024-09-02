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
        overview: "Adkar is a mobile application designed to assist Muslims with their daily remembrances (adkar), Quranic recitations, and spiritual practices. It offers a range of features including morning and evening remembrances, Quranic verses with interpretations, Allah's beautiful names, customizable rosary, and timely notifications.",
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
            "Additional Features": ["Local notifications", "audio player,flutter_native_splash", "vibration"]
        },
        detailedFeatures: [
            {
                title: "Remembrances (Adkar)",
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
        githubLink: "https://github.com/h0996g/adkar",
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

