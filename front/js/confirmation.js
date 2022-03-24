//affichage de la confirmation + numéro de commande

function recupNumber() {

    //localisation de la page actuelle
    var str = window.location.href;

    //création d'une nouvelle url à partir de l'url actuelle 
    var url = new URL(str);

    //ajout de searchParams (gestion des paramètres de requête d'URL)=> récupérer ce que contient "ordernumber"
    var text = url.searchParams.get('orderNumber');

    //vérification
    //console.log(text);

    //selection de la balise span
    var m = document.getElementById("orderId");

    //intégration de la chaine (ou noeud)
    m.appendChild(document.createTextNode(text));

}

recupNumber();


