const menuAbout = document.getElementById("menuAbout");

const startBtn = document.getElementById("btnStart");

// const handleAboutClick = evt => {
//     document.location.href = 'about.html';
// }

const handleStartClick = (evt) => {
  let difficulties = document.getElementsByName("difficulty");
  let difficulty;

  for (diff of difficulties) {
    if (diff.checked) {
      difficulty = diff.value;
    }
  }

  let misere = document.getElementById("misere").checked;

  // TODO: Send difficulty to nim on other side.

  document.location.href = "nim.html";
};

// menuAbout.addEventListener("click", handleAboutClick);

startBtn.addEventListener("click", handleStartClick);
