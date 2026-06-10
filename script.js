import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyC2V3wNpGiCoeP-mh-une8IoJFbM_0jD34",
  authDomain: "idontknow-863d3.firebaseapp.com",
  projectId: "idontknow-863d3",
  storageBucket: "idontknow-863d3.firebasestorage.app",
  messagingSenderId: "486097634886",
  appId: "1:486097634886:web:56829f14c1cfbf8c696c47"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


setTimeout(() => {
  const loadingScreen = document.getElementById("loadingScreen");
  const mainScreen = document.getElementById("mainScreen");
  
  loadingScreen.style.opacity = "0";
  
  setTimeout(() => {
    loadingScreen.style.display = "none";
    mainScreen.style.display = "block";
    
    setTimeout(() => {
      mainScreen.style.opacity = "1";
    }, 10);
    
    loadCD(currentCD);
  }, 500);
}, 900);


const cat1 = document.getElementById("cat1");
let cat1State = false;

cat1?.addEventListener("click", () => {
  cat1State = !cat1State;
  cat1.src = cat1State ? "catt1.png" : "cat1.png";
});


const discTape = document.getElementById("disctape");
const player = document.getElementById("player");

const cds = [
  { image: "cd1.png", song: "music1.mp3" },
  { image: "cd2.png", song: "music2.mp3" },
  { image: "cd3.png", song: "music3.mp3" },
  { image: "cd4.png", song: "music4.mp3" },
  { image: "cd5.png", song: "music5.mp3" },
  { image: "cd6.png", song: "music6.mp3" },
  { image: "cd7.png", song: "music7.mp3" },
  { image: "cd8.png", song: "music8.mp3" },
  { image: "cd9.png", song: "music9.mp3" },
  { image: "cd10.png", song: "music10.mp3" },
  { image: "cd11.png", song: "music11.mp3" }
];

let currentCD = 0;

function loadCD(index) {
  discTape.src = cds[index].image;
  player.src = cds[index].song;
  player.load();
}

document.body.addEventListener("click", () => player.play(), { once: true });

discTape?.addEventListener("click", (e) => {
  e.stopPropagation();
  
  currentCD++;
  if (currentCD >= cds.length) currentCD = 0;
  
  loadCD(currentCD);
  player.play();
});


const mainScreen = document.getElementById("mainScreen");
const bookScreen = document.getElementById("bookScreen");
const cameraScreen = document.getElementById("cameraScreen");
const sagelScreen = document.getElementById("sagelScreen");
const aezthetteScreen = document.getElementById("aezthetteScreen");

function showScreen(screen) {
  mainScreen.style.display = "none";
  bookScreen.style.display = "none";
  cameraScreen.style.display = "none";
  sagelScreen.style.display = "none";
  aezthetteScreen.style.display = "none";
  
  screen.style.display = "block";
}


document.getElementById("book")?.addEventListener("click", () => showScreen(bookScreen));
document.getElementById("camera")?.addEventListener("click", () => {
  showScreen(cameraScreen);
  loadPhotos?.();
});

document.addEventListener("click", (e) => {
  if (e.target.id === "backFromBook") showScreen(mainScreen);
  if (e.target.id === "backFromCamera") showScreen(mainScreen);
});

document.getElementById("sagel")?.addEventListener("click", () => showScreen(sagelScreen));
document.getElementById("aezthette")?.addEventListener("click", () => showScreen(aezthetteScreen));

document.addEventListener("click", (e) => {
  if (e.target.id === "backToBook") showScreen(bookScreen);
});


const sagelTitle = document.getElementById("sagelTitle");
const sagelSubtitle = document.getElementById("sagelSubtitle");
const sagelDate = document.getElementById("sagelDate");

const aezTitle = document.getElementById("aezTitle");
const aezSubtitle = document.getElementById("aezSubtitle");
const aezDate = document.getElementById("aezDate");

const sagelDoc = doc(db, "notes", "sagel");
const aezDoc = doc(db, "notes", "aezthette");


function saveSagel() {
  return setDoc(sagelDoc, {
    title: sagelTitle?.value || "",
    subtitle: sagelSubtitle?.value || "",
    date: sagelDate?.value || ""
  });
}

function saveAez() {
  return setDoc(aezDoc, {
    title: aezTitle?.value || "",
    subtitle: aezSubtitle?.value || "",
    date: aezDate?.value || ""
  });
}


document.getElementById("backToBookSagel")?.addEventListener("click", async () => {
  await saveSagel();
  showScreen(bookScreen);
});

document.getElementById("backToBookAez")?.addEventListener("click", async () => {
  await saveAez();
  showScreen(bookScreen);
});


document.getElementById("saveSagel")?.addEventListener("click", async () => {
  await saveSagel();
});

document.getElementById("saveAez")?.addEventListener("click", async () => {
  await saveAez();
});


[sagelTitle, sagelSubtitle, sagelDate].forEach(el => {
  el?.addEventListener("input", saveSagel);
});

[aezTitle, aezSubtitle, aezDate].forEach(el => {
  el?.addEventListener("input", saveAez);
});


onSnapshot(sagelDoc, (snap) => {
  if (!snap.exists()) return;
  const d = snap.data();
  
  sagelTitle.value = d.title || "";
  sagelSubtitle.value = d.subtitle || "";
  sagelDate.value = d.date || "";
});

onSnapshot(aezDoc, (snap) => {
  if (!snap.exists()) return;
  const d = snap.data();
  
  aezTitle.value = d.title || "";
  aezSubtitle.value = d.subtitle || "";
  aezDate.value = d.date || "";
});
