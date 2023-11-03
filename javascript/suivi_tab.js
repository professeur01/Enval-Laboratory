//_______________________FILTER TAB AND INPUT______________________________________________
//Filter input______________
const inputSuivi = document.getElementById('input_suivi');
const tbody = document.querySelector('tbody');
const suiviLotTitle = document.getElementById('suivi_lot_title');
const suiviEtatLabo = document.getElementById('suivi_etat_title');
const suiviprevueDate = document.getElementById('suivi_prevue_title');
const suiviRapportTitle = document.getElementById('suivi_rapport_title');

const suiviArray = [
    {lot:"Cyanure libre",etat:'Reçu',date:'20/03/2023',rapport:'Disponible'},
    {lot:"pH/Temperature",etat:'Reçu',date:'16/03/2023',rapport:'Disponible'},
    {lot:"CO2 libre",etat:'Reçu',date:'15/03/2023',rapport:'Disponible'},
    {lot:"Carbonate",etat:'Reçu',date:'14/03/2023',rapport:'Disponible'},
    {lot:"TE202303001",etat:'Reçu',date:'12/03/2023',rapport:'Disponible'},
    {lot:"Couleur Brute",etat:'Reçu',date:'17/03/2023',rapport:'Non disponible'},
    {lot:"Conductivité electrique",etat:'Non Reçu',date:'15/03/2023',rapport:'Non disponible'},
    {lot:"Chlourire",etat:'Non Reçu',date:'15/03/2023',rapport:'Non disponible'},
    {lot:"TE20230190",etat:'Reçu',date:'14/03/2023',rapport:'Non disponible'},
    {lot:"E202302023",etat:'Non Reçu',date:'12/03/2023',rapport:'Non disponible'}]

// Fonction afficher tbody
function afficherTbody(suiviArray) {
    tbody.innerHTML = "";
    suiviArray.forEach(element => {
        tbody.innerHTML += `
        <tr class="suivi-titre">
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.lot}</td>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.etat}</td>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.date}</td>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.rapport}</td>
        <td style="text-align: center;"><a href="suividetail.html"><button class="btn_com"style="">Voir</button></a></td>
    </tr>`
    });
;
  }
  afficherTbody(suiviArray);
  //FILTRER UN INPUT___________________________

// Ajoutez un écouteur d'événement pour l'input
inputSuivi.addEventListener("input", function(event) {
    const inputValue = inputSuivi.value.trim().toLowerCase(); // Récupérer la valeur de l'input en supprimant les espaces inutiles et en la mettant en minuscules

    // Filtrer les données en temps réel en fonction de la valeur de labo
    const filteredCommandeArray = suiviArray.filter(element => element.rapport.toLowerCase().includes(inputValue));

    // Afficher les résultats dans le tableau
    afficherTbody(filteredCommandeArray);

    // Si aucun résultat n'est trouvé, afficher un message approprié
    if (filteredCommandeArray.length === 0) {
        tbody.innerHTML = "<tr ><td colspan='5'>Aucune donnée à afficher.</td></tr>";
        tbody.style.textAlign="center";
    }
});
// TRIE DE PAR ORDRE AMPHABÉTIQUE LOT---------------------------------------------
let sortDirection = 1; // 1 pour tri A à Z, -1 pour tri Z à A

suiviLotTitle.addEventListener("click", () => {
    // Inverse la direction de tri à chaque clic
    sortDirection *= -1;

    // Trie le tableau suiviArray en fonction de la propriété "lot"
    suiviArray.sort((a, b) => {
        const lotA = a.lot.toLowerCase();
        const lotB = b.lot.toLowerCase();
        if (lotA > lotB) return -1 * sortDirection;
        
        if (lotA < lotB) return 1 * sortDirection;
        
        return 0;
    });
     // Affiche le texte "bas" ou "haut" en fonction de la direction du tri
     suiviLotTitle.innerHTML = `Lot ${sortDirection === 1 ? '<i class="bi bi-arrow-up"></i>' : ' <i class="bi bi-arrow-down"></i>'}`;

    // Affiche le tableau trié dans le tableau HTML
    afficherTbody(suiviArray);
});
// TRIE DE PAR ORDRE AMPHABÉTIQUE ETAT---------------------------------------------

let sortDirectionEtat = 1; // 1 pour tri A à Z, -1 pour tri Z à A

suiviEtatLabo.addEventListener("click", () => {
    // Inverse la direction de tri à chaque clic
    sortDirectionEtat *= -1;

    // Trie le tableau suiviArray en fonction de la propriété "lot"
    suiviArray.sort((a, b) => {
        const etatA = a.etat.toLowerCase();
        const etatB = b.etat.toLowerCase();
        if (etatA > etatB) return -1 * sortDirectionEtat;
        
        suiviEtatLabo.innerHTML = `Etat <i class="bi bi-arrow-down"></i>`;

        if (etatA < etatB) return 1 * sortDirectionEtat;
        return 0;
    });

     // Affiche le texte "bas" ou "haut" en fonction de la direction du tri
     suiviEtatLabo.innerHTML = `Lot ${sortDirectionEtat === 1 ? '<i class="bi bi-arrow-up"></i>' : ' <i class="bi bi-arrow-down"></i>'}`;

    // Affiche le tableau trié dans le tableau HTML
    afficherTbody(suiviArray);
});
// TRIE DE PAR ORDRE NUMÉRIQUE DES JOURS DE LA DATE ------------------------------
let daySortDirection = 1; // 1 for ascending, -1 for descending

suiviprevueDate.addEventListener("click", () => {
    // Inverse the sorting direction on each click
    daySortDirection *= -1;

    // Sort the suiviArray based on the "date" property by extracting the day part
    suiviArray.sort((a, b) => {
        const dayA = parseInt(a.date.split('/')[0]); // Assumes date format is "DD/MM/YYYY"
        const dayB = parseInt(b.date.split('/')[0]);
        return (dayA - dayB) * daySortDirection;
    });

    // Display "up" or "down" text based on the sorting direction
    suiviprevueDate.innerHTML = `Date prévue ${daySortDirection === 1 ? '<i class="bi bi-arrow-up"></i>' : '<i class="bi bi-arrow-down"></i>'}`;

    // Display the sorted table in the HTML table
    afficherTbody(suiviArray);
});
// TRIE DE PAR ORDRE AMPHABÉTIQUE Rapport--------------------------------------------
let sortDirectionRapport = 1; // 1 pour tri A à Z, -1 pour tri Z à A

suiviRapportTitle.addEventListener("click", () => {
    // Inverse la direction de tri à chaque clic
    sortDirectionRapport *= -1;

    // Trie le tableau suiviArray en fonction de la propriété "lot"
    suiviArray.sort((a, b) => {
        const rapportA = a.rapport.toLowerCase();
        const rapportB = b.rapport.toLowerCase();
        if (rapportA > rapportB) return -1 * sortDirectionRapport;
        
        if (rapportA < rapportB) return 1 * sortDirectionRapport;
        
        return 0;
    });
     // Affiche le texte "bas" ou "haut" en fonction de la direction du tri
     suiviRapportTitle.innerHTML = `Rapport ${sortDirectionRapport === 1 ? '<i class="bi bi-arrow-up"></i>' : ' <i class="bi bi-arrow-down"></i>'}`;

    // Affiche le tableau trié dans le tableau HTML
    afficherTbody(suiviArray);
});

