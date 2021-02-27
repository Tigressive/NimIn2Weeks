const menuAbout = document.getElementById('menuAbout');

const startBtn = document.getElementById('btnStart');

// const handleAboutClick = evt => {
//     document.location.href = 'about.html';
// }

const handleStartClick = evt => {
    document.location.href = 'nim.html';
}

// menuAbout.addEventListener("click", handleAboutClick);

startBtn.addEventListener("click", handleStartClick);
