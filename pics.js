let pictures = ["./assets/img/Buggy in a Race.jpg", "./assets/img/Car´s Offroad Racing.jpg", "./assets/img/Dirty Off Road Car.jpg", "./assets/img/Dragster Race.jpg",
    "./assets/img/Driftcar.jpg", "./assets/img/F1 Race Oldtimer.jpg", "./assets/img/F2 Race.jpg", "./assets/img/Lambo´s in a row.jpg", "./assets/img/Nascar Race.jpg",
    "./assets/img/Oldtimer Motor.jpg", "./assets/img/Racetrack.jpg", "./assets/img/Racing Motor.jpg"
];

let currentIndex = 0;

const picsRef = document.getElementById("pics-img");
const dialog = document.getElementById("open-pics");
const picName = document.getElementById("pic-name");
const picCounter = document.getElementById("gallery-counter");
const picImage = document.querySelector("#open-pics-middle img");
const buttonClose = document.getElementById("button-close");
const buttonBack = document.getElementById("button-back");
const buttonForward = document.getElementById("button-forward");


function init() {
    render();
    initLightbox();
}

function render() {
    for (let i = 0; i < pictures.length; i++) {
        picsRef.innerHTML += template(i)
    }
}

function template(i) {
    return `<img src="${pictures[i]}" alt="${getName(i)}" data-index="${i}" tabindex="0" role="button">`
}

function getName(i) {
    const fullPath = pictures[i];
    const fileName = fullPath.split("/").pop();
    return fileName.replace(/\.[^/.]+$/, "");
}

function initLightbox() {
    picsRef.querySelectorAll("img").forEach((imgEl) => {
        imgEl.addEventListener("click", () => {
            const index = Number(imgEl.dataset.index)
            openLightbox(index)
        });
    
        imgEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const index = Number(imgEl.dataset.index);
                openLightbox(index);
            }
        });
    });

    buttonClose.addEventListener("click", closeLightbox);

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
            closeLightbox()
        }
    });

    buttonBack.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + pictures.length) % pictures.length
        updateLightbox()

    });
    buttonForward.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % pictures.length;
        updateLightbox();
    })
}

function openLightbox(index) {
    currentIndex = index
    updateLightbox()
    dialog.showModal()
};

function updateLightbox() {
    picImage.src = pictures[currentIndex]
    picImage.alt = getName(currentIndex)
    picName.textContent = getName(currentIndex)
    picCounter.textContent = `${currentIndex + 1} / ${pictures.length}`
};

function closeLightbox() {
    dialog.close()
};  