document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal"),
        trigger = document.querySelectorAll(".back__call, .back__call-button"),
        closeButton = document.querySelector(".close-button"),
        fadeSliderItems = document.querySelectorAll(".fade-slider__item"),
        modalForm = document.querySelector(".modal__form"),
        formCheckbox = document.querySelector(".modal__conf-checkbox"),
        formSuccess = document.querySelector(".form-success");
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

    function send(event){
        if(!formCheckbox.checked) {
            alert("Вы должны согласиться с политикой конфиденциальности");
            event.preventDefault();
        }

        console.log("Отправка запроса");
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var req = new XMLHttpRequest();
        req.open('POST', "../mailer/smart.php", true);
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
            json = JSON.parse(this.response); // Ебанный internet explorer 11
                console.log(json);
                
                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == "success") {
                    // Если сообщение отправлено
                    //alert("Сообщение отправлено");
                    modalForm.style.display = "none";
                    formSuccess.style.display = "block";
                } else {
                    // Если произошла ошибка
                    alert("Ошибка. Сообщение не отправлено");
                }
            // Если не удалось связаться с php файлом
            } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
        
        // Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function() {alert("Ошибка отправки запроса");};
        req.send(new FormData(event.target));
    }


    for(let i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener("click", toggleModal);
    }
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

    modalForm.addEventListener("submit", send);

    new WOW().init();

    setInterval(() => {
        fadeSliderItems[index].classList.remove("fade-slider__item--visible");
        index++;
        index = index > fadeSliderItems.length - 1 ? 0 : index;
        fadeSliderItems[index].classList.add("fade-slider__item--visible");
    }, 5000);

});