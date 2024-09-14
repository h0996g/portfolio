function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
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


