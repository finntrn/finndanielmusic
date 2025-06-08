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
