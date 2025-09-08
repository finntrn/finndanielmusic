const PROJECT_ID = "52lnqf2k";
const DATASET = "production";

const QUERY = encodeURIComponent(`*[_type == "project"]{
  title,
  image{asset->{url}},
  url,
  behavior,
  hoverText,
  modalType,
  gallery[]{asset->{url}},
  videoFile{asset->{url}},
  modalTitle,
  modalDescription
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${QUERY}`;

// Z-INDEX TABS CODE


// STICKY CODE

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.tab-nav');
    const spacer    = document.getElementById('nav-spacer');
    const triggerEl = document.getElementById('nav-trigger');

    // 1. Compute the document-Y where the nav SHOULD stick
    const triggerRect = triggerEl.getBoundingClientRect();
    const stickY      = triggerRect.top + window.scrollY;

    // 2. Figure out nav’s total “hole” in the flow (margin-top + height)
    const navStyles = getComputedStyle(nav);
    const marginTop = parseFloat(navStyles.marginTop);
    const navHeight = nav.getBoundingClientRect().height;
    const hole      = marginTop + navHeight;

    // 3. On every scroll, compare scrollY ↔ stickY
    window.addEventListener('scroll', () => {
        if (window.scrollY >= stickY) {
            if (!nav.classList.contains('fixed')) {
                nav.classList.add('fixed');
                spacer.style.height = `${hole}px`;
            }
        } else {
            if (nav.classList.contains('fixed')) {
                nav.classList.remove('fixed');
                spacer.style.height = '0';
            }
        }
    });


});

// GRID PLACEMENT


document.addEventListener("DOMContentLoaded", () => {
    const songs = {
        imnotready: "/music/imnotready.mp3",
        iwasaghost: "/music/iwasaghost.mp3",
        inyourroom: "/music/inyourroom.mp3",
        lyingdeadinthesun: "/music/lyingdeadinthesun.mp3",
        easy: "/music/easy.mp3",
        youshouldvesaidgoodbye: "/music/youshouldvesaidgoodbye.mp3",
        morethanyourlove: "/music/morethanyourlove.mp3"
    };

    let currentAudio = null;
    let currentButton = null;

    document.querySelectorAll(".play-button").forEach(button => {
        button.addEventListener("click", () => {
            const songDiv = button.closest(".song");
            const songId = songDiv.id;
            const songSrc = songs[songId];

            if (!songSrc) {
                console.warn("No audio file mapped for:", songId);
                return;
            }

            // Stop current song if another is playing
            if (currentAudio && currentAudio.src.includes(songSrc)) {
                // Pause if same song clicked
                if (!currentAudio.paused) {
                    currentAudio.pause();
                    button.innerHTML = playIcon();
                } else {
                    currentAudio.play();
                    button.innerHTML = pauseIcon();
                }
            } else {
                if (currentAudio) {
                    currentAudio.pause();
                    if (currentButton) currentButton.innerHTML = playIcon();
                }
                currentAudio = new Audio(songSrc);
                currentAudio.play();
                button.innerHTML = pauseIcon();
                currentButton = button;

                currentAudio.onended = () => {
                    button.innerHTML = playIcon();
                };
            }
        });
    });

    function playIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
    }

    function pauseIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"/></svg>`;
    }
});