//_______________________FILTER TAB AND INPUT______________________________________________
//Filter input______________
const inputCommande = document.getElementById('input_commande');
console.log(inputCommande);
const tbody = document.querySelector('tbody');
const commandeComTitle = document.getElementById('commande_com_title');
const commandeComLabo = document.getElementById('commande_labo_title');
const commandeComDate = document.getElementById('commande_date_title');
const commandeStatusTitle = document.getElementById('commande_status_title');

const commandeArray = [
    {numero:"00001",labo:'Enval',date:'10/03/2023',status:'Encours',index:'enval'},
    {numero:"00002",labo:'codeloccol',date:'10/03/2023',status:'Encours',index:'codeloccol'},
    {numero:"00003",labo:'ANSI',date:'12/03/2023',status:'Terminée',index:'ansi'},
    {numero:"00004",labo:'CIPMEN',date:'12/03/2023',status:'Encours',index:'cypmen'},
    {numero:"00005",labo:'ADU',date:'13/03/2023',status:'Terminée',index:'adu'},
    {numero:"00006",labo:'codeloccol',date:'14/03/2023',status:'Encours',index:'codeloccol'},
    {numero:"00007",labo:'Enval',date:'14/03/2023',status:'Encours',index:'enval'},
    {numero:"00009",labo:'ANSI',date:'16/03/2023',status:'Encours',index:'ansi'},
    {numero:"000010",labo:'ADU',date:'18/03/2023',status:'Terminée',index:'adu'}]

// Fonction afficher tbody
function afficherTbody(commandeArray) {
    tbody.innerHTML = "";
    commandeArray.forEach(element => {
        tbody.innerHTML += `
        <tr>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.numero}</td>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.labo}</td>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.date}</td>
        <td style="text-align: center;color: red;border-right: solid 1px #8f8a8a;">${element.status}</td>
        <td style="text-align: center;"><a href="suividetail.html"><button class="btn_com"style="">Voir</button></a></td>
    </tr>`
    });
;
  }
  afficherTbody(commandeArray);
  //FILTRER UN INPUT___________________________

// Ajoutez un écouteur d'événement pour l'input
inputCommande.addEventListener("input", function(event) {
    const inputValue = inputCommande.value.trim().toLowerCase(); // Récupérer la valeur de l'input en supprimant les espaces inutiles et en la mettant en minuscules

    // Filtrer les données en temps réel en fonction de la valeur de labo
    const filteredCommandeArray = commandeArray.filter(element => element.labo.toLowerCase().includes(inputValue));

    // Afficher les résultats dans le tableau
    afficherTbody(filteredCommandeArray);

    // Si aucun résultat n'est trouvé, afficher un message approprié
    if (filteredCommandeArray.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>Aucune donnée à afficher.</td></tr>";
        tbody.style.textAlign="center";
    }
});
//___________________________________
  //TRIER UN LES VALEURS DU TABLEAU___________________________
  let ascendingOrder = true;
  
  // Ajoutez un écouteur d'événement pour le tri sur le titre de la facture
  commandeComTitle.addEventListener("click", function () {
      // Triez le tableau en fonction de la propriété "numero" en ordre croissant ou décroissant
      if (ascendingOrder) {
        commandeArray.sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
        commandeComTitle.innerHTML = `Commande <i class="bi bi-arrow-down"></i>`
      } else {
        commandeArray.sort((a, b) => parseInt(b.numero) - parseInt(a.numero));
        commandeComTitle.innerHTML = `Commande <i class="bi bi-arrow-up"></i>`
      }
  
      // Inversez l'ordre de tri pour le prochain clic
      ascendingOrder = !ascendingOrder;
  
      // Affichez les données triées dans le tableau
      afficherTbody(commandeArray);
  });
    // TRIE DE PAR ORDRE NUMÉRIQUE DES JOURS DE LA DATE ------------------------------
let daySortDirection = -1; // 1 for ascending, -1 for descending

commandeComDate.addEventListener("click", () => {
    // Inverse the sorting direction on each click
    daySortDirection *= -1;

    // Sort the factureArray based on the "date" property by extracting the day part
    commandeArray.sort((a, b) => {
        const dayA = parseInt(a.date.split('/')[0]); // Assumes date format is "DD/MM/YYYY"
        const dayB = parseInt(b.date.split('/')[0]);
        return (dayA - dayB) * daySortDirection;
    });

    // Display "up" or "down" text based on the sorting direction
    commandeComDate.innerHTML = `Date ${daySortDirection === -1 ? '<i class="bi bi-arrow-up"></i>' : '<i class="bi bi-arrow-down"></i>'}`;

    // Display the sorted table in the HTML table
    afficherTbody(commandeArray);
});


