const nameInput = document.getElementById("name");
const vornameInput = document.getElementById("vorname");
const telefonInput = document.getElementById("telefonnr");
const kontakteListe = document.getElementById("meine-kontakte");
const farbeInput = document.getElementById("farbe");
const kontaktForm = document.getElementById("kontakt-form");
const anzahlKontakte = document.getElementById("kontakte-anzahl");

const meineKontakteListe = [
  // importierte Daten
  ["Luke", "Skywalker", "123456", "#8593ed"],
  ["Han", "Solo", "789456", "#74ad63"],
  ["Lea", "Organa", "456789", "#ed85df"],
];

const meineKontaktListeNeu = [];

function updateKontaktAnzahl() {
  anzahlKontakte.textContent = meineKontaktListeNeu.length;
}

function kontaktErstellen() {
  const neuerVorname = vornameInput.value.trim();
  const neuerNachname = nameInput.value.trim();
  const neueTelefonnr = telefonInput.value.trim();
  const neueFarbe = farbeInput.value;

  if (neuerVorname && neuerNachname && neueTelefonnr) {
    const einKontakt = document.createElement("div");
    einKontakt.className = "ein-kontakt";

    const farbStreifen = document.createElement("div");
    farbStreifen.className = "farbstreifen";
    farbStreifen.style.backgroundColor = neueFarbe;
    einKontakt.appendChild(farbStreifen);

    const datenContainer = document.createElement("div");
    datenContainer.className = "daten-container";
    einKontakt.appendChild(datenContainer);

    const ersteZeile = document.createElement("div");
    ersteZeile.className = "erste-zeile";
    datenContainer.appendChild(ersteZeile);

    const zweiteZeile = document.createElement("div");
    zweiteZeile.className = "zweite-zeile";
    datenContainer.appendChild(zweiteZeile);

    const vorName = document.createElement("p");
    vorName.textContent = neuerVorname;
    ersteZeile.appendChild(vorName);

    const nachName = document.createElement("p");
    nachName.textContent = neuerNachname;
    ersteZeile.appendChild(nachName);

    const telefonIcon = document.createElement("i");
    telefonIcon.className = "fa-solid fa-phone";
    telefonIcon.style.color = neueFarbe;
    zweiteZeile.appendChild(telefonIcon);

    const telefonLink = document.createElement("a");
    /*const linkText = document.createTextNode(neueTelefonnr);
    telefonLink.appendChild(linkText);
    telefonLink.title = linkText;*/
    telefonLink.href = "tel:" + neueTelefonnr;
    telefonLink.textContent = neueTelefonnr;
    zweiteZeile.appendChild(telefonLink);

    kontakteListe.appendChild(einKontakt);

    // Felder zurücksetzen
    vornameInput.value = "";
    nameInput.value = "";
    telefonInput.value = "";

    // Kontakt-Liste neu befüllen
    neuerKontaktLiEintrag = [];
    neuerKontaktLiEintrag.push(neuerVorname);
    neuerKontaktLiEintrag.push(neuerNachname);
    neuerKontaktLiEintrag.push(neueTelefonnr);
    neuerKontaktLiEintrag.push(neueFarbe);

    meineKontaktListeNeu.push(neuerKontaktLiEintrag);
    updateKontaktAnzahl();
  } else {
    alert("Bitte alle Felder ausfüllen! 😊");
  }
}

// Bestehende Kontakte laden
// "kontakt" ist ein Eintrag aus meineKontakteListe
/*
meineKontakteListe.forEach(function (kontakt) {
  const vorname = kontakt[0];
  const nachname = kontakt[1];
  const telefon = kontakt[2];
  const farbe = kontakt[3];

  vornameInput.value = vorname;
  nameInput.value = nachname;
  telefonInput.value = telefon;
  farbeInput.value = farbe;
  kontaktErstellen();
});*/

// Kontakte aus local Storage laden
const gespeicherteKontakte = JSON.parse(
  localStorage.getItem("localStoredKontakte")
);

if (gespeicherteKontakte != null) {
  gespeicherteKontakte.forEach(function (kontakt) {
    const vorname = kontakt[0];
    const nachname = kontakt[1];
    const telefon = kontakt[2];
    const farbe = kontakt[3];

    vornameInput.value = vorname;
    nameInput.value = nachname;
    telefonInput.value = telefon;
    farbeInput.value = farbe;
    kontaktErstellen();
  });
  document.getElementById("empty-state").style.display = "none";
  document.getElementById("kontakte-overview").style.display = "flex";
} else {
  document.getElementById("empty-state").style.display = "block";
  document.getElementById("kontakte-overview").style.display = "none";
}

// Kontakte hinzufügen bei neuem Listen-Eintrag
kontaktForm.addEventListener("submit", function (event) {
  event.preventDefault(); // verhindert Seiten-Neuladen
  kontaktErstellen();
  document.getElementById("empty-state").style.display = "none";
  document.getElementById("kontakte-overview").style.display = "flex";
  localStorage.setItem(
    "localStoredKontakte",
    JSON.stringify(meineKontaktListeNeu)
  );
});
