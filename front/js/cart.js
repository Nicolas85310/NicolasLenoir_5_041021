
//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart() {
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let produit in produitLocalStorage) {
            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);

            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
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

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;

            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            // refresh rapide
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

//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du nom
    form.firstName.addEventListener('change', function () {
        valid(this, charRegExp, 'Votre prénom doit-être uniquement composé de lettres.')
    });


    // Ecoute de la modification du prénom
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


    //validation des champs
    let count = 0;

    const valid = function (input, RegExp, msgerror) {
        
        let ErrorMsg = input.nextElementSibling;
        let EmptyFieldsMsg = "Veuillez renseigner ce champs";

        if (RegExp.test(input.value) && (ErrorMsg.innerHTML == msgerror || ErrorMsg.innerHTML == EmptyFieldsMsg)) {
            count--;
            ErrorMsg.innerHTML = "";
        }

        else if (RegExp.test(input.value)) {
            ErrorMsg.innerHTML = "";
        }

        else if (ErrorMsg.innerHTML == msgerror || ErrorMsg.innerHTML == EmptyFieldsMsg){
            count = count + 0;
        }

        else {
            ErrorMsg.innerHTML = msgerror;
            count++;
        }
        
        
        console.log(count);
        if (!input.value) { ErrorMsg.innerHTML = EmptyFieldsMsg; }
        if (count > 0) {
            order.disabled = true;
        } else { order.disabled = false; }
    };

}


getForm();


//Envoi des informations client au localstorage
function postForm() {
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event) => {

        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');


        //vérification des champs vides et blocage de la commande si c'est le cas suivant le navigteur
        if (
            !inputName.value ||
            !inputLastName.value ||
            !inputAdress.value ||
            !inputCity.value ||
            !inputMail.value) {

            //action à réaliser si les "required" dans les <input> ne fonctionnent pas ...

        } else {


            //Construction d'un array depuis le local storage
            let idProducts = [];
            for (let i = 0; i < produitLocalStorage.length; i++) {
                idProducts.push(produitLocalStorage[i].idProduit);
            }
            console.log(idProducts);

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

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            };
            //.then((response) => console.log(response))
            //fetch("http://localhost:3000/api/products/order", options)
            post(API_ENDPOINT_PRODUCTS_ORDER, options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);

                    document.location.href = "confirmation.html";
                })

                .catch((err) => {
                    alert("Problème avec fetch : " + err.message);
                });
        }
    })
}

postForm();
