var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal
var modalImg = document.getElementById("modalImage");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal(imageSrc) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.copy-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const pre = button.nextElementSibling;
            const code = pre.querySelector('code');
            const range = document.createRange();
            range.selectNode(code);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            try {
                document.execCommand('copy');
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (e) {
                console.error('Failed to copy text: ', e);
            }

            window.getSelection().removeAllRanges();
        });
    });
});