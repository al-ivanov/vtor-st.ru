document.addEventListener("DOMContentLoaded", () => {
    let modal = document.querySelector(".modal"),
        trigger = document.querySelectorAll(".back__call"),
        closeButton = document.querySelector(".close-button");
    
    function toggleModal() {
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
});