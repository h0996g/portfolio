function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
function openComingSoonModal() {
  document.getElementById('comingSoonModal').classList.remove('hidden');
}

function closeComingSoonModal() {
  document.getElementById('comingSoonModal').classList.add('hidden');
}

// Optional: close on outside click
window.onclick = function (event) {
  const comingSoonModal = document.getElementById('comingSoonModal');
  const downloadModal = document.getElementById('downloadModal');

  if (event.target === comingSoonModal) {
    comingSoonModal.classList.add('hidden');
  }
  if (event.target === downloadModal) {
    downloadModal.classList.add('hidden');
  }
};
function openDownloadModal() {
  document.getElementById('downloadModal').classList.remove('hidden');
}

function closeDownloadModal() {
  document.getElementById('downloadModal').classList.add('hidden');
}

window.onclick = function(event) {
  const modal = document.getElementById('downloadModal');
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
}
function showPopup() {
  document.getElementById('comingSoonPopup').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
}

function closePopup() {
  document.getElementById('comingSoonPopup').style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close popup when clicking outside
document.getElementById('comingSoonPopup').addEventListener('click', function(e) {
  if (e.target === this) {
    closePopup();
  }
});

// Close popup when pressing Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});
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
// Add this to your existing script.js file

function toggleContent(contentType) {
  const projectsContent = document.getElementById('projects-content');
  const tutorialsContent = document.getElementById('tutorials-content');
  const projectsBtn = document.querySelector('.toggle-btn:first-child');
  const tutorialsBtn = document.querySelector('.toggle-btn:last-child');

  if (contentType === 'projects') {
    projectsContent.classList.add('active');
    tutorialsContent.classList.remove('active');
    projectsBtn.classList.add('active');
    tutorialsBtn.classList.remove('active');
  } else {
    tutorialsContent.classList.add('active');
    projectsContent.classList.remove('active');
    tutorialsBtn.classList.add('active');
    projectsBtn.classList.remove('active');
  }
}


