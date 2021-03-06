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

  let playStyles = document.getElementsByName("playStyle");
  let ps;
  for (playStyle of playStyles) {
    if (playStyle.checked) {
      ps = playStyle.value;
    }
  }

  // TODO: Send difficulty to nim on other side.

  localStorage.setItem("nim_options_difficulty", difficulty);
  localStorage.setItem("nim_options_misere", misere);
  localStorage.setItem("nim_options_play_style", ps);

  document.location.href = "nim.html";
};

// menuAbout.addEventListener("click", handleAboutClick);

startBtn.addEventListener("click", handleStartClick);
