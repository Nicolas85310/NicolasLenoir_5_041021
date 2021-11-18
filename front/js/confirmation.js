//affichage de la confirmation + numéro de commande
function main() {
    const idNode = document.getElementById("orderId");//récupération du numéro de commande
    idNode.innerText = localStorage.getItem("orderId");//affichage sur la page du numéro de commande
    console.log(localStorage.getItem("orderId"))//vérification
    localStorage.clear();//RAZ du localstorage
}

main();

