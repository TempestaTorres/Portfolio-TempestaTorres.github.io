// Scroll event listener

let isScrolling = false;

 function addScrollingListener(scroller) {
     window.addEventListener('scroll', (e) => {

         if (!isScrolling) {
             window.requestAnimationFrame(() => {
                 scroller(e);
                 isScrolling = false;
             });
             isScrolling = true;
         }
     });
 }

 // Detect if element is partially visible
function isPartiallyVisible(element) {

     const rc = element.getBoundingClientRect();
     const top = rc.top;
     const bottom = rc.bottom;
     const height = rc.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}
// Detect if element is fully visible
function isFullyVisible(element) {
    const rc = element.getBoundingClientRect();
    const top = rc.top;
    const bottom = rc.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}
// Scroll to target element
function smoothScroll(target) {

    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
// Scrolling Observer
function scrollingObserver(targetElement, callback, threshold) {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {

        callback(entries);
    }, {
        threshold: threshold // Trigger when 10% of the div is visible
    });
    // Start observing the target
    observer.observe(targetElement);
}

function getScrollPosition() {
     return document.documentElement.scrollTop;
}

function addParallaxScrolling(targetElement) {

    let ticking = false;

    function updateParallax() {
        const scrolled = window.scrollY;
        const parallax = scrolled * 0.5;
        targetElement.style.transform = `translateY(${parallax}px)`;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    window.addEventListener('scroll', requestTick);
}