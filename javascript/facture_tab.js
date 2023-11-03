//_______________________FILTER TAB AND INPUT______________________________________________
//Filter input______________
const inputFacture = document.getElementById('input_facture');
const tbody = document.querySelector('tbody');
const factureFacTitle = document.getElementById('facture_fac_title');
const factureFacLabo = document.getElementById('facture_fac_labo');
const factureFacDatef = document.getElementById('facture_fac_datef');
//const factureFacCliquezf = document.getElementById('facture_fac_cliquezf');
const factureArray = [
    {numero:"00001",labo:'Enval',date:'10/03/2023',index:'enval'},
    {numero:"00002",labo:'Biochimie',date:'10/03/2023',index:'biochi'},
    {numero:"00003",labo:'Biologie',date:'11/03/2023',index:'biologie'},
    {numero:"00004",labo:'Biologie',date:'12/03/2023',index:'biologie'},
    {numero:"00005",labo:'Enval',date:'12/03/2023',index:'enval'},
    {numero:"00006",labo:'Biochimie',date:'12/03/2023',index:'biochi'},
    {numero:"00007",labo:'Enval',date:'13/03/2023',index:'enval'},
    {numero:"00008",labo:'Géologie',date:'13/03/2023',index:'geolo'},
    {numero:"00009",labo:'Enval',date:'13/03/2023',index:'enval'}]

// Fonction afficher tbody
function afficherTbody(factureArray) {
    tbody.innerHTML = "";
    factureArray.forEach(element => {
        tbody.innerHTML += `
        <tr class="facture-titre">
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.numero}</td>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.labo}</td>
        <td style="text-align: center;border-right: solid 1px #8f8a8a;">${element.date}</td>
        <td style="text-align: center;"><a href="suividetail.html"><button class="btn_com"style="">Voir</button></a></td>
    </tr>`
    });
;
  }
  afficherTbody(factureArray);
  //FILTRER UN INPUT___________________________

// Ajoutez un écouteur d'événement pour l'input
inputFacture.addEventListener("input", function(event) {
    const inputValue = inputFacture.value.trim().toLowerCase(); // Récupérer la valeur de l'input en supprimant les espaces inutiles et en la mettant en minuscules

    // Filtrer les données en temps réel en fonction de la valeur de labo
    const filteredFactureArray = factureArray.filter(element => element.labo.toLowerCase().includes(inputValue));

    // Afficher les résultats dans le tableau
    afficherTbody(filteredFactureArray);

    // Si aucun résultat n'est trouvé, afficher un message approprié
    if (filteredFactureArray.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4'>Aucune donnée à afficher.</td></tr>";
        tbody.style.textAlign="center";
    }
});


//___________________________________
  //TRIER UN LES VALEURS DU TABLEAU___________________________
  let ascendingOrder = true;
  
  // Ajoutez un écouteur d'événement pour le tri sur le titre de la facture
  factureFacTitle.addEventListener("click", function () {
      // Triez le tableau en fonction de la propriété "numero" en ordre croissant ou décroissant
      if (ascendingOrder) {
          factureArray.sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
          factureFacTitle.innerHTML = `Facture <i class="bi bi-arrow-down"></i>`
      } else {
          factureArray.sort((a, b) => parseInt(b.numero) - parseInt(a.numero));
          factureFacTitle.innerHTML = `Facture <i class="bi bi-arrow-up"></i>`
      }
  
      // Inversez l'ordre de tri pour le prochain clic
      ascendingOrder = !ascendingOrder;
  
      // Affichez les données triées dans le tableau
      afficherTbody(factureArray);
  });
  // TRIE DE PAR ORDRE NUMÉRIQUE DES JOURS DE LA DATE ------------------------------
let daySortDirection = -1; // 1 for ascending, -1 for descending

factureFacDatef.addEventListener("click", () => {
    // Inverse the sorting direction on each click
    daySortDirection *= -1;

    // Sort the factureArray based on the "date" property by extracting the day part
    factureArray.sort((a, b) => {
        const dayA = parseInt(a.date.split('/')[0]); // Assumes date format is "DD/MM/YYYY"
        const dayB = parseInt(b.date.split('/')[0]);
        return (dayA - dayB) * daySortDirection;
    });

    // Display "up" or "down" text based on the sorting direction
    factureFacDatef.innerHTML = `Date ${daySortDirection === -1 ? '<i class="bi bi-arrow-up"></i>' : '<i class="bi bi-arrow-down"></i>'}`;

    // Display the sorted table in the HTML table
    afficherTbody(factureArray);
});

  
