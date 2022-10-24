/*
Játék szabályok:

- A játék 2 szereplős és körökre osztott
- Minden egyes körben az adott játékos dob a kockával, ahányszor csak szeretne. A dobások eredménye hozzáadódik a játékos adott körben
  elért pontszámához, ami értelem szerűen minden körben nulláról indul.
- Ha az aktuális játékos 1-et dob, akkor az összes addigi pontja elveszik, és átadja a dobás jogát a következő játékosnak.
- A játékos választhatja a 'Megtartom' gombot is. Ebben az esetben az adott körben elért pontok száma, hozzáadódik a játékos összes
  pontszámához. Majd a dobás joga a másik játékosra száll.
- Az a játékos nyer, aki előbb eléri a 100 pontot.  

*/

var pontszamok, korPontszam, aktivJatekos, jatekFolyamatban;

init();

/*document.querySelector("#current-" + aktivJatekos).textContent = kocka;*/
/*document.querySelector('#current-' + aktivJatekos).innerHTML = '<u>' + kocka + '</u>';*/

//var nev = document.querySelector('#name-0').textContent;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (jatekFolyamatban) {
    //kell egy véletlen szám
    var kocka = Math.floor(Math.random() * 6) + 1;

    //eredmény megjelenitése

    var kockaDom = document.querySelector(".dice");
    kockaDom.style.display = "block";
    kockaDom.src = "img/dice-" + kocka + ".png";

    //körben alért pontszám frissirése ha nem 1-et dobunk
    if (kocka !== 1) {
      //itt adjuk hozzá a számot az aktuaáis ponthoz
      korPontszam += kocka;
      document.querySelector("#current-" + aktivJatekos).textContent =
        korPontszam;
    } else {
      //következő játékos
      kovetkezoJatekos();
    }
  }
});

//Megtartom gomb esemény kezelője

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (jatekFolyamatban) {
    //összes pontszám frissitése a kódban
    pontszamok[aktivJatekos] += korPontszam;

    //Az összes pontszám frissitése a képernyőn(UI)

    document.querySelector("#score-" + aktivJatekos).textContent =
      pontszamok[aktivJatekos];

    //nyert a játékos?
    if (pontszamok[aktivJatekos] >= 15) {
      document.querySelector("#name-" + aktivJatekos).textContent = "Gyoztes!";
      document
        .querySelector(".player-" + aktivJatekos + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + aktivJatekos + "-panel")
        .classList.remove("active");
      jatekFolyamatban = false;
    } else {
      //következő játékosra való kapcsolás
      kovetkezoJatekos();
    }
  }
});

//következő játékos

function kovetkezoJatekos() {
  aktivJatekos === 0 ? (aktivJatekos = 1) : (aktivJatekos = 0);
  korPontszam = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

// új játék inditása

document.querySelector(".btn-new").addEventListener("click", init);

// init függvény

function init() {
  pontszamok = [0, 0];
  aktivJatekos = 0;
  korPontszam = 0;
  jatekFolyamatban = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";

  document.getElementById("name-0").textContent = "Frodo";
  document.getElementById("name-1").textContent = "Samu";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
