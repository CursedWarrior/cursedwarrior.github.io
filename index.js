/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

document.addEventListener("DOMContentLoaded", function() {
    const coll = document.getElementsByClassName("collapsible");
    
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          const content = this.nextElementSibling;

          if (content.style.maxHeight) {
              content.style.maxHeight = null; // Collapse
          } else {
              content.style.maxHeight = content.scrollHeight + "px"; // Expand
          }
      });
  }
});


// Typing and deleting animation.

const texts = [
  "A motivated knowledge seeker.",
  "A dedicated tech aficionado.",
  "A visionary business strategiest.",
  "A forward thinking leader.",
  // "a catalyst for innovation.",
];

let currentIndex = 0;
let currentText = "";
let typingIndex = 0;
let deleting = false;
const waitTimeWrite = 900; // Time to wait after typing before deleting (in milliseconds)
const waitTimeDelete = 3000; // Time to wait after typing before deleting (in milliseconds)

function type() {
    const cursor = document.querySelector('.cursor');

    if (deleting) {
        currentText = currentText.slice(0, typingIndex - 1);
        typingIndex--;

        if (typingIndex < 0) {
            deleting = false;
            currentIndex = (currentIndex + 1) % texts.length;
            typingIndex = 0;
            setTimeout(type, waitTimeWrite); // Wait before starting to type the next text
            return; // Exit this call to avoid immediate typing
        }
    } else {

        if (typingIndex === texts[currentIndex].length) {
            deleting = true;
            setTimeout(() => {
                type(); // Start deleting after wait time
            }, waitTimeDelete);
            return; // Exit this call to avoid immediate deleting
        }

        currentText += texts[currentIndex][typingIndex];
        typingIndex++;
    }

    document.getElementById("animated-text").textContent = currentText;
    setTimeout(type, deleting ? 50 : 50);
}

// Start typing animation
type();
