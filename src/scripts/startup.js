const bootLines = [
  "[ OK ] Initializing system...",
  "[ OK ] Loading kernel modules...",
  "[ OK ] Mounting /dev...",
  "[ OK ] Checking network interfaces...",
  "[ OK ] Establishing secure session...",
  "[ OK ] Preparing login sequence...",
  "",
  "System ready."
];

const bootScreen = document.getElementById("boot-screen");
const loginModal = document.getElementById("login-modal");
const playModal = document.getElementById("play-modal");
const wraps = document.querySelectorAll(".wrap");
const usernameInputField = document.getElementById("username");

let lineIndex = 0;

function typeBootLine() {
  if (lineIndex < bootLines.length) {
    const line = document.createElement("div");
    line.textContent = bootLines[lineIndex];
    bootScreen.appendChild(line);
    bootScreen.scrollTop = bootScreen.scrollHeight; // auto scroll
    lineIndex++;
    setTimeout(typeBootLine, 700); // delay between lines
  } else {
    // Show modal after boot completes
    setTimeout(() => {
      bootScreen.remove();
      loginModal.style.display = "block";
    }, 1000);
  }
}

function boot() {
  playModal.remove();
  document.body.classList.remove("landing-page");
  document.body.classList.add("startup-page");
  bootScreen.style.display = "block";
  typeBootLine();
}

function play() {
  const value = usernameInputField.value;
  if (value === "") { 
    document.getElementById("user").textContent = "player";
  } else {
    document.getElementById("user").textContent = value;
  }
  
  loginModal.remove();
  
  document.body.classList.remove("startup-page");
  document.body.classList.add("terminal-page");
      
  wraps.forEach(wrapper => {
    wrapper.style.display = "flex";
  });
  
  //load scripts
  let script1 = document.createElement("script");
  let script2 = document.createElement("script");
  let script3 = document.createElement("script");
  script1.type = "module";
  script1.src = "scripts/commands.js";
  script2.type = "module";
  script2.src = "scripts/advance.js";
  script3.type = "module";
  script3.src = "scripts/main.js";
  document.body.appendChild(script1);
  document.body.appendChild(script2);
  document.body.appendChild(script3);
}

