
document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const form = document.querySelector('#form');
    const switchButtons = document.querySelector('.link-item-group');
    const toTopButton = document.querySelector('#to-top');
    const separator = document.querySelector(".separator");
    const separatorSecond = document.querySelector(".separator-2");
    const separatorThird = document.querySelector(".separator-3");
    const separatorForth = document.querySelector(".separator-4");
    const separatorFifth = document.querySelector(".separator-5");
    const header = document.querySelector(".header");
    const autoSlider = document.querySelector(".auto-slider");
    const autoSliderButtons = document.querySelector(".auto-slider-buttons");

    let sliderIndex;
    let sliderVisible = false;
    let timerID;

    function isSliderVisible(element) {
        sliderVisible = element[0].isIntersecting;
    }

    function sliderHandler(slider, classActive) {

        for (let i = 0; i < slider.children.length; i++) {

            if (slider.children[i].classList.contains(classActive)) {
                slider.children[i].classList.remove(classActive);
            }
        }
        for (let i = 0; i < autoSliderButtons.children.length; i++) {

            if (autoSliderButtons.children[i].classList.contains(classActive)) {
                autoSliderButtons.children[i].classList.remove(classActive);
            }
        }
        slider.children[sliderIndex].classList.add(classActive);
        autoSliderButtons.children[sliderIndex].classList.add(classActive);

        if (++sliderIndex === slider.children.length) {
            sliderIndex = 0;
        }
    }

    function setTimer(slider, classActive) {

        timerID = setInterval( () => {

            if (sliderVisible) {

                sliderHandler(slider, classActive);
            }
        }, 3000);
    }
    function sliderObserver(slider, classActive) {

        sliderIndex = 1;
        slider.children[0].classList.add(classActive);
        autoSliderButtons.children[0].classList.add(classActive);

        for (let i = 0; i < autoSliderButtons.children.length; i++) {
            autoSliderButtons.children[i].itemID = i;
            //console.log('Item ID= '+ autoSliderButtons.children[i].itemID);
        }
        setTimer(slider, classActive);
    }

    function setObserver(scrollElement, classNameActive) {

        const ScrollItems = document.querySelectorAll(scrollElement);

            ScrollItems.forEach(Item => {

                if (isPartiallyVisible(Item)) {
                    Item.classList.add(classNameActive);
                }
                else if (Item.classList.contains(classNameActive)) {
                    Item.classList.remove(classNameActive);
                }

            });
    }

    function headerObserver(e) {

        if (window.scrollY > 0) {
            header.classList.add('bg-gray-900', 'backdrop-blur-md', 'shadow-sm');
            header.classList.remove('bg-transparent');
        }
        else if (window.scrollY === 0) {
            header.classList.remove('bg-gray-900', 'backdrop-blur-md', 'shadow-sm');
            header.classList.add('bg-transparent');
        }
    }

    function scrollObserver(e) {

        headerObserver(e);
        setObserver('.slide-right', 'slide-right-active');
        setObserver('.slide-up', 'slide-up-active');
        setObserver('.fade-in', 'fade-in-visible');
    }

    function processScrolling(entries) {

            if (entries[0].isIntersecting) {
                entries[0].target.classList.add('separator-full');
            }
            else {
                entries[0].target.classList.remove('separator-full');
            }
    }
    // Entry point

    try {
        validateForm(form);
        addScrollingListener(scrollObserver);
        scrollingObserver(separator, processScrolling, 0.1);
        scrollingObserver(separatorSecond, processScrolling, 0.1);
        scrollingObserver(separatorThird, processScrolling, 0.1);
        scrollingObserver(separatorForth, processScrolling, 0.1);
        scrollingObserver(separatorFifth, processScrolling, 0.1);
        scrollingObserver(autoSlider, isSliderVisible, 0.1);
        sliderObserver(autoSlider, 'slide-active');

        autoSliderButtons.addEventListener('click', (e) => {

            e.preventDefault();

            if (e.target.nodeName === 'BUTTON') {

                clearInterval(timerID);

                sliderIndex = e.target.itemID;

                sliderHandler(autoSlider, 'slide-active')

                setTimer(autoSlider, 'slide-active');

            }
            e.stopPropagation();
        });

        toTopButton.addEventListener('click', (e) => {
            e.preventDefault();
                window.scrollTo(0, 0);
            e.stopPropagation();
        });

        switchButtons.addEventListener('click', (e) => {
            e.preventDefault();

            if (e.target.nodeName === 'BUTTON') {
                switch (e.target.ariaLabel) {
                    case 'switch to light mode':

                        const darkMode = document.querySelector('button[aria-label="switch to dark mode"]');
                        if (darkMode) {
                            darkMode.classList.remove('d-none');
                            darkMode.classList.add('inline-flex');
                            e.target.classList.remove('inline-flex');
                            e.target.classList.add('d-none');

                            const darks = document.querySelectorAll('.dark');

                            for (let i = 0; i < darks.length; i++) {

                                darks[i].classList.remove('dark');
                                darks[i].classList.add('white');
                            }
                        }
                        break;
                    case 'switch to dark mode':

                        const lightMode = document.querySelector('button[aria-label="switch to light mode"]');
                        if (lightMode) {
                            lightMode.classList.remove('d-none');
                            lightMode.classList.add('inline-flex');
                            e.target.classList.remove('inline-flex');
                            e.target.classList.add('d-none');
                        }

                        const lights = document.querySelectorAll('.white');

                        for (let i = 0; i < lights.length; i++) {

                            lights[i].classList.remove('white');
                            lights[i].classList.add('dark');
                        }
                        break;
                }
            }
            e.stopPropagation();
        });
    }
    catch (e) {
        console.error(e);
    }
});