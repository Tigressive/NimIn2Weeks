const menuAbout = document.getElementById('menuAbout');

const handleAboutClick = evt => {
    document.location.href = 'about.html';
}

menuAbout.addEventListener("click", handleAboutClick);