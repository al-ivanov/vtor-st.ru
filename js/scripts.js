document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal"),
        trigger = document.querySelectorAll(".back__call, .back__call-button"),
        closeButton = document.querySelector(".close-button"),
        fadeSliderItems = document.querySelectorAll(".fade-slider__item");
    let index = 0;
    
    function toggleModal(e) {
        if (e !== undefined)
            e.preventDefault();
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    for(let i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener("click", toggleModal);
    }
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick)

    new WOW().init();

    setInterval(() => {
        fadeSliderItems[index].classList.remove("fade-slider__item--visible");
        index++;
        index = index > fadeSliderItems.length - 1 ? 0 : index;
        fadeSliderItems[index].classList.add("fade-slider__item--visible");
    }, 5000);

});