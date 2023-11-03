export const user = [
  {
    id: 1,
    identifiant: "awal",
    password: "awal",
    phraseUser: "mouton",
    imageProfil: "",
    nomProfil: "",
    biographieProfil: ""
  },
  {
    id: 2,
    identifiant: "dino",
    password: "dino",
    phraseUser: "mouton",
    imageProfil: "",
    nomProfil: "",
    biographieProfil: ""
  },
];
const body = document.querySelector("body");
const imputIdentifiant = document.getElementById("imput-identifiant");
const imputMotDePasse = document.getElementById("imput-mot-de-passe");
const forgetLink = document.getElementById("forget-link");
const linkConnect = document.getElementById("link-connect");
const buttonClick = document.querySelector(".button");
const divButtonLink = document.getElementById("div-button-link");
const popupPasswordIncorrect = document.querySelector(
  ".popup-password-incorrect"
);
const popupPasswordBanni = document.querySelector(".popup-password-banni");
const popupTimerDeblockage = document.querySelector(".popup-timer-deblockage");

// Insersion de l'objet user dans le locale storage
const usersLocale = JSON.parse(localStorage.getItem("usersStocker")) || [];

// Ajout du nouveau user à usersLocale
usersLocale.push(user);

// Mise à jour du local storage
function miseAJourLocalStorage() {
  localStorage.setItem("usersStocker", JSON.stringify(usersLocale));
}
miseAJourLocalStorage();

// Ajout evenement button connexion

const maxAttempts = 3; // Nombre maximal de tentatives
let loginAttempts = localStorage.getItem("loginAttempts") || 0; // Initialiser le compteur d'essais depuis le localStorage

// Au début de votre script
linkConnect.addEventListener("click", () => {
  const IdentifiantValue = imputIdentifiant.value;
  const MotDePasseValue = imputMotDePasse.value;
  const userFind = user.find(
    (item) =>
      item.identifiant === IdentifiantValue && item.password === MotDePasseValue
  );

  if (userFind) {
    location.href = "/dachboard.html";
  } else {
    loginAttempts++;

    if (loginAttempts < maxAttempts) {
      // Afficher le popup incorrect
      function startPopupIncorrect() {
        popupPasswordIncorrect.style.display = "block";
      }

      setTimeout(startPopupIncorrect, 1000);

      function closePopupIncorrect() {
        popupPasswordIncorrect.style.display = "none";
      }

      setTimeout(closePopupIncorrect, 5000);
    } else {
      // Si le nombre maximal de tentatives est atteint, afficher le popup banni
      function startPopupBanni() {
        popupPasswordBanni.style.display = "block";
      }

      setTimeout(startPopupBanni, 1000);

      function closePopupBanni() {
        popupPasswordBanni.style.display = "none";
      }

      setTimeout(() => {
        closePopupBanni();

        // Réinitialiser le compteur d'essais dans le localStorage
        //localStorage.setItem("loginAttempts", 0);

        // Afficher le prompt uniquement si loginAttempts est maintenant supérieur ou égal à 3
        if (parseInt(localStorage.getItem("loginAttempts")) >= 3) {
       
          const phraseSecrete = window.prompt(
            "La question secrète: Quel est le surnom de Nueveu ?"
          );

          const userFindSecrete = user.find(
            (item) => item.phraseUser === phraseSecrete
          );

          if (userFindSecrete) {
            window.location.href = "dachboard.html";
          } else {
            // Traiter le cas où la réponse à la question secrète est incorrecte
            
            // Affichage du popup Timer Deblolockage
            function startPopupTimer() {
              popupTimerDeblockage.style.display = "block";
            }

            setTimeout(startPopupTimer, 1000);

            function closePopupTimer() {
              popupTimerDeblockage.style.display = "none";
            }


            function disableAdd() {
              buttonClick.disabled = true;
              imputIdentifiant.disabled = true;
              imputMotDePasse.disabled = true;
            }
            disableAdd();
            // Timer de deblockage de 5 minute

            const departMinutes = 5;
            let temps = departMinutes * 60;

            const timerElement = document.getElementById("timer");

            setInterval(() => {
              let minutes = parseInt(temps / 60, 10);
              let secondes = parseInt(temps % 60, 10);

              minutes = minutes < 10 ? "0" + minutes : minutes;
              secondes = secondes < 10 ? "0" + secondes : secondes;

              timerElement.innerText = `${minutes}:${secondes}`;
              temps = temps <= 0 ? 0 : temps - 1;
            }, 1000);
            setTimeout(closePopupTimer,  300000 );
           
            // Fin Timer de deblockage de 5 minute
            function disableremove() {
              buttonClick.disabled = false;
              imputIdentifiant.disabled = false;
              imputMotDePasse.disabled = false;
            }
            disableremove(); 
            

           
          }

        }
      }, 4000);
    }


    // Mettre à jour le compteur d'essais dans le localStorage
    localStorage.setItem("loginAttempts", loginAttempts);
  }


});

