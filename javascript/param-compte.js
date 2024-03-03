// param-compte.js

document.addEventListener("DOMContentLoaded", function () {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    // Afficher les informations de l'utilisateur dans la page (à titre d'exemple)
    const nomBioInput = document.getElementById("input-nom-bio");
    const emailBioInput = document.getElementById("input-email-bio");
    const textareaBio = document.getElementById("textarea-bio");
                            

  
    // Modifier le mot de passe
    const btnModifierPass = document.getElementById("btn-modifier-pass");
    btnModifierPass.addEventListener("click", modifyPass);

    function modifyPass() {
        console.log("mot de passe modifier")  
      }
    // Supprimer le compte
    const btnSupprimerPass = document.getElementById("btn-supprimer-pass");
    btnSupprimerPass.addEventListener("click", deleteUser);
    
    function deleteUser() {
      console.log("User supprimer")  
    }
  
    // Modifier la photo
    const btnModifierPhoto = document.getElementById("btn-modifier-photo");
    btnModifierPhoto.addEventListener("click", modifyPhoto)
    function modifyPhoto() {
        console.log("Photo modifier")  
      }
    // Supprimer la photo
    const btnSupprimerPhoto = document.getElementById("btn-supprimer-photo");
    btnSupprimerPhoto.addEventListener("click", deletePhoto);

    function deletePhoto() {
        console.log("Photo supprimer")  
      }
  
    // Modifier le profil
    const btnSubmitBio = document.getElementById("btn-submit-bio");
    btnSubmitBio.addEventListener("click", function () {
      // Mettre à jour les informations du profil dans les données de l'utilisateur
      loggedInUser.nomProfil = nomBioInput.value;
      loggedInUser.identifiant = emailBioInput.value;
      loggedInUser.biographieProfil = textareaBio.value;
  
      // Mettre à jour les informations dans le localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  
      alert("Informations du profil mises à jour avec succès !");
    });
  
    // Retour au tableau de bord
    const retourTabBord = document.querySelector(".retour-tab-bord");
    retourTabBord.addEventListener("click", function () {
      window.location.href = "dachboard.html";
    });
  });
  
