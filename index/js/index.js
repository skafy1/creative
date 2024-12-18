const $ = selector => {
    return document.querySelector(selector);
};

const list = $(".list");
const items = Array.from(list.querySelectorAll("li"));
let currentIndex = 0;

function updateClasses() {
    items.forEach((item, index) => {
        item.classList.remove("hide", "prev", "act", "next");
        if (index === (currentIndex - 1 + items.length) % items.length) {
            item.classList.add("prev");
        } else if (index === currentIndex) {
            item.classList.add("act");
        } else if (index === (currentIndex + 1) % items.length) {
            item.classList.add("next");
        } else {
            item.classList.add("hide");
        }
    });
}

function next() {
    currentIndex = (currentIndex + 1) % items.length;
    updateClasses();
}

function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateClasses();
}


function slide(element) {
    if (element.classList.contains('next')) {
        next();
    } else if (element.classList.contains('prev')) {
        prev();
    }
}

const slider = $(".list");
const swipe = new Hammer($(".swipe"));

slider.onclick = event => {
    const target = event.target.closest("li");
    if (target) {
    slide(target);
    }
};

swipe.on("swipeleft", () => {
    next();
});

swipe.on("swiperight", () => {
    prev();
});

updateClasses();