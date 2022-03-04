
//localisation de la page en cours d'utilisation
var str = window.location.href;
//création d'une nouvelle url à partir de l'url actuelle 
var url = new URL(str);
// ajout de searchParams (gestion des paramètres de requête d'URL)=> dans ce cas précis on ajoute un id à l'url
var idProduct = url.searchParams.get("id");
console.log(idProduct);//vérification
let article = "";
//création de variables pour manipuler les éléments de la page
const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API "http://localhost:3000/api/products/"
function getArticle() {
    //utilisation d'une variable contenant l'adresse localhost avec l'id du produit
    get(API_ENDPOINT_PRODUCTS + idProduct)
        .then((res) => {
            return res.json();
        })

        // Répartition des données de l'API dans le DOM en attente d'une promesse
        .then(async function (resultatAPI) {
            article = await resultatAPI;
            console.table(article);
            if (article) {
                getPost(article);
            }
        })
        //renvoi d'une erreur dans la console si la résolution à échoué
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}
//intégration des éléments caractérisant le produit choisi
function getPost(article) {
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Insertion du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Insertion du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Insertion de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors) {
        console.table(colors);//vérification
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);//affichage de l'article

}

//Gestion du panier
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    
    //Ajout d'un eventListener quand l'utilisateur clique sur ajouter au panier
    btn_envoyerPanier.addEventListener("click", (event) => {

        event.preventDefault();//priorité du calcul par JS par rapport au navigateur

        //verification du panier avec les 2 conditions: couleur non nulle et quantité entre 1 et 100
        if (!colorPicked.value) { alert("Veuillez choisir une couleur svp"); }
        else if (quantityPicked.value == 0) { alert("Veuillez choisir une quantité (minimum 1)"); }
        else if (quantityPicked.value > 0 && quantityPicked.value <= 100 && colorPicked.value != 0) {

            //Recupération du choix de la couleur
            let choixCouleur = colorPicked.value;

            //Recupération du choix de la quantité
            let choixQuantite = quantityPicked.value;
        
            //Récupération des options de l'article à ajouter au panier
            let optionsProduit = {
                idProduit: idProduct,
                couleurProduit: choixCouleur,
                quantiteProduit: Number(choixQuantite),
                nomProduit: article.name,
                prixProduit: article.price,
                descriptionProduit: article.description,
                imgProduit: article.imageUrl,
                altImgProduit: article.altTxt
            };

            //Initialisation du local storage
            let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

            //fenêtre pop-up de confirmation avec choix de visiter le panier ou non
            const popupConfirmation = () => {
                if (window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)) {
                    window.location.href = "cart.html";
                }
            }
            
            //Importation dans le local storage de l'article suivant les conditions ci-dessous
            //Si le panier comporte déjà au moins 1 article
            if (produitLocalStorage) {
                const resultFind = produitLocalStorage.find(
                    (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
                //Si le produit commandé est déjà dans le panier
                if (resultFind) {
                    let newQuantite =
                        parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                    resultFind.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();
                    //Si le produit commandé n'est pas dans le panier
                } else {
                    produitLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();
                }
                //Si le panier est vide
            } else {
                produitLocalStorage = [];
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                popupConfirmation();
            }
        }
    });
}
