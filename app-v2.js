/*
Játék szabályok:

-Ha egy játékos 2x 6-ost dob egymás után, akkot az összes eddigi pontját elveszíti és a dobás joga a másik játékosra szál.
-Adjunk a programhoz egy olyan lehetőséhet, hogy a felhasználói felületen meg lehessen adni, hogy a győztesnek hány pontot kell elérnije.
-Legyen még egy kocka, Ha az egyk kockával 1-est dob, akkor veszítse el a körben elért pontszámát.
*/

var pontszamok, korPontszam, aktivJatekos, jatekFolyamatban, elozoDobas;

init();

/*document.querySelector("#current-" + aktivJatekos).textContent = kocka;*/
/*document.querySelector('#current-' + aktivJatekos).innerHTML = '<u>' + kocka + '</u>';*/

//var nev = document.querySelector('#name-0').textContent;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (jatekFolyamatban) {
    //kell egy véletlen szám
    var kocka1 = Math.floor(Math.random() * 6) + 1;
    var kocka2 = Math.floor(Math.random() * 6) + 1;

    //eredmény megjelenitése

    document.getElementById("dice-1").src = "img/dice-" + kocka1 + ".png";
    document.getElementById("dice-2").src = "img/dice-" + kocka2 + ".png";
    kockaKiBeKapcsolas("be");
    if (kocka1 != 0 && kocka2 !== 2) {
      korPontszam += kocka1 + kocka2;
      document.querySelector("#current-" + aktivJatekos).textContent = korPontszam;
    } else {
      kovetkezoJatekos();
    }
  }
  /*
    if (kocka === 6 && elozoDobas === 6) {
      // A játékos elvesziti az összes pontszámát
      pontszamok[aktivJatekos] = 0;

          //Az összes pontszám frissitése a képernyőn(UI)
    document.querySelector("#score-" + aktivJatekos).textContent = 0;

    kovetkezoJatekos();
    
    } else if (kocka !== 1) {
      //körben alért pontszám frissirése ha nem 1-et dobunk
      //itt adjuk hozzá a számot az aktuaáis ponthoz
      korPontszam += kocka;
      document.querySelector("#current-" + aktivJatekos).textContent =
        korPontszam;
    } else {
      //következő játékos
      kovetkezoJatekos();
    }
    elozoDobas = kocka;*/
});

//Megtartom gomb esemény kezelője

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (jatekFolyamatban) {
    //összes pontszám frissitése a kódban
    pontszamok[aktivJatekos] += korPontszam;

    //Az összes pontszám frissitése a képernyőn(UI)

    document.querySelector("#score-" + aktivJatekos).textContent =
      pontszamok[aktivJatekos];

    var elerendoPontszam = document.querySelector(".elerendo-pontszam").value;

    // hamis: 0, --, null undefine
    //igaz: minden más egyéb
    if (!elerendoPontszam || isNaN(elerendoPontszam)) {
      elerendoPontszam = 15;
    }
    /*if(elerendoPontszam && !isNaN(elerendoPontszam)){
      elerendoPontszam = elerendoPontszam;
    } else {
      elerendoPontszam = 15;
    } */
    console.log(elerendoPontszam);

    //nyert a játékos?
    if (pontszamok[aktivJatekos] >= elerendoPontszam) {
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

  kockaKiBeKapcsolas("ki");
}

// új játék inditása

document.querySelector(".btn-new").addEventListener("click", init);

// init függvény

function init() {
  pontszamok = [0, 0];
  aktivJatekos = 0;
  korPontszam = 0;
  jatekFolyamatban = true;
  elozoDobas = 0;

  kockaKiBeKapcsolas("ki");
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

function kockaKiBeKapcsolas(funkcio) {
  //funkcio 'ki', 'be'
  if (funkcio === "ki") {
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
  } else if (funkcio === "be") {
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
  }
}
