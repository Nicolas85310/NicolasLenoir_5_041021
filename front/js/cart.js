
//Initialisation du local storage

//utilisation de JSON.parse pour retranscrire en chaîne de charactères ou en objet
// (ici l'élément "produit") interprétable en JS.
//=>intégration du même coup dans une variable
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);//affiche les produits dans la console
const positionEmptyCart = document.querySelector("#cart__items");//récupération du css


//récupération des articles du panier et affichage
function getCart() {
    //si panier vide
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;//renvoi affichage de l'état du panier en html

        //sinon récupération des articles du panier
    } else {
        for (let produit in produitLocalStorage) {
            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);//nouvelle position de "article"
            productArticle.className = "cart__item";
            //Ajoute d'un nouvel attribut
            productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);

            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);//nouvelle position de "div"
            productDivImg.className = "cart__item__img";

            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);//nouvelle position de "img"
            productImg.src = produitLocalStorage[produit].imgProduit;
            productImg.alt = produitLocalStorage[produit].altImgProduit;

            // Insertion du contenu
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            // Insertion du titre
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";

            // Insertion du titre h2
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = produitLocalStorage[produit].nomProduit;

            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
            productColor.style.fontSize = "20px";

            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";

            // Insertion de l'élément "div"
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            // Insertion de la quantité "div"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            // Insertion de "Qté : "
            let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = "Qté : ";

            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = produitLocalStorage[produit].quantiteProduit;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            // Insertion de l'élément de supression "div"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            // Insertion de "p" supprimer
            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }
    }
}
getCart();
//Récupération du total des totaux
function getTotals() {

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
        totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change", (event) => {

            event.preventDefault();

            //intégrer la nouvelle quantité dans un tableau 
            let quantityModif = qttModif[k].value;
            const newLocalStorage = {
                idProduit: produitLocalStorage[k].idProduit,
                imgProduit: produitLocalStorage[k].imgProduit,
                altImgProduit: produitLocalStorage[k].altImgProduit,
                nomProduit: produitLocalStorage[k].nomProduit,
                couleurProduit: produitLocalStorage[k].couleurProduit,
                prixProduit: produitLocalStorage[k].prixProduit,
                quantiteProduit: quantityModif
            };

            produitLocalStorage[k] = newLocalStorage;


            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            location.reload();

        })

    }
}
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[j].idProduit;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte suppression du produit et reload de la page
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

//récupération des données du formulaire
function getForm() {
    
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières(Regex)
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    //Application des règles regex au moment de la saisie

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
        valid(this, charRegExp, 'Votre prénom doit-être uniquement composé de lettres.')
    });


    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function () {
        valid(this, charRegExp, 'Votre nom doit-être uniquement composé de lettres.')

    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function () {
        valid(this, addressRegExp, 'Votre adresse doit être du style (numéro + rue/voie/impasse).')
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function () {
        valid(this, charRegExp, 'Votre ville de résidence doit-être uniquement composée de lettres.')
    });

    // Ecoute de la modification du @
    form.email.addEventListener('change', function () {
        valid(this, emailRegExp, 'Votre adresse mail doit être du style (monadresse@fai.fr). ')
    });


    

    //initialisation du compteur count
    let count = 0;
    //validation des champs (conditions permettant le click du submit)
    const valid = function (input, RegExp, msgerror) {

        let ErrorMsg = input.nextElementSibling;
        let EmptyFieldsMsg = "Veuillez renseigner ce champs";

        //fabrication d'un compteur de messages d'erreur avec count-- et count++
        if (RegExp.test(input.value) && (ErrorMsg.innerHTML == msgerror || ErrorMsg.innerHTML == EmptyFieldsMsg)) {
            count--;
            ErrorMsg.innerHTML = "";
        }

        else if (RegExp.test(input.value)) {
            ErrorMsg.innerHTML = "";
        }

        else if (ErrorMsg.innerHTML == msgerror || ErrorMsg.innerHTML == EmptyFieldsMsg) {
            count = count + 0;
        }

        else {
            ErrorMsg.innerHTML = msgerror;
            count++;
        }


        console.log(count);//controle le nombre de messages d'erreur

        if (!input.value) { ErrorMsg.innerHTML = EmptyFieldsMsg; }
        else if (!RegExp.test(input.value) && ErrorMsg.innerHTML == EmptyFieldsMsg) {
            ErrorMsg.innerHTML = msgerror;
        }
        if (count > 0) {
            order.disabled = true;//désactive le bouton commnder si présence de message d'erreur
        } else { order.disabled = false; }
    };

}


getForm();


//Envoi des informations client et du contenu du panier au localstorage
function postForm() {
    const btn_commander = document.getElementById("order");

    //Ecouter le panier (promesse)
    btn_commander.addEventListener("click", (event) => {
        //event.preventDefault();


        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');


        //vérification si panier vide ou champs vide:blocage du bouton commander si c'est le cas.
        if (produitLocalStorage === null || produitLocalStorage == 0) {
            //choix de l'utilisateur à poursuivre ses achats ou rester sur la même page
            if (window.confirm("Votre panier est vide,pour commander,vous devez choisir des produits sur la page Acceuil.Voulez-vous retourner à la page Acceuil ?")) {
                window.location.href = "index.html";
            } else { window.location.href = "cart.html"; }


        //Indique à l'utilisateur de remplir le formulaire intégralement vide
        } else if (
            !inputName.value &&
            !inputLastName.value &&
            !inputAdress.value &&
            !inputCity.value &&
            !inputMail.value) { alert("Veuillez entrer vos coordonnées avant de commander"); }


        //Indique à l'utilisateur de remplir le champ vide indiqué
        else if (
            !inputName.value ||
            !inputLastName.value ||
            !inputAdress.value ||
            !inputCity.value ||
            !inputMail.value) //utilisation des bulles de signalisation en html grace à l'attribut "required" 
        { }

        else {

            //Construction d'un array depuis le local storage
            let idProducts = [];
            for (let i = 0; i < produitLocalStorage.length; i++) {
                idProducts.push(produitLocalStorage[i].idProduit);
            }
            console.log(idProducts);//vérification

            //intégration dans un objet: valeurs du formulaire et référence produit sélectionnée
            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: idProducts,
            }
            
            //envoie du formulaire et des données vers le localstorage
            const options = {
                method: 'POST',
                body: JSON.stringify(order),//convertit les valeur de order en chaîne JSON.
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            };
            //.then((response) => console.log(response))
            //fetch("http://localhost:3000/api/products/order", options)
            post(API_ENDPOINT_PRODUCTS_ORDER, options)//envoyer au localstorage les données "stringifiées"
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.clear();//initialisation
                    
                    //insertion du numéro de commande dans l'url de page de confirmation
                    document.location.href = "confirmation.html?orderNumber=" + data.orderId;
                })
        }
    }

    )
}

postForm();
