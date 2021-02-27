const menuAbout = document.getElementById('menuAbout');

const startBtn = document.getElementById('btnStart');





const handleAboutClick = evt => {
    document.location.href = 'about.html';
}

menuAbout.addEventListener("click", handleAboutClick);