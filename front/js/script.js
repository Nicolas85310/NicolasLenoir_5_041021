fillSection();

// Récupération des articles de l'API
async function getArticles() {
//var articlesCatch = await fetch("http://localhost:3000/api/products")
//utilisation d'une variable (@localhost) et attendre la résolution d'une promesse(Récupération des articles)
    var articlesCatch = await get(API_ENDPOINT_PRODUCTS)
    return await articlesCatch.json();//utilisation de JSON pour faciliter la résolution
}

// Répartition des données de l'API dans le DOM avec utilisation de promesse
async function fillSection() {
    var result = await getArticles()
        .then(function (resultatAPI) {
            const articles = resultatAPI;
            console.table(articles);//vérification
            for (let article in articles) {//affichage de l'ensemble des produits et leur caractéristique

                // Insertion de l'élément "a"
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${resultatAPI[article]._id}`;

                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // Insertion de l'image
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = resultatAPI[article].imageUrl;
                productImg.alt = resultatAPI[article].altTxt;

                // Insertion du titre "h3"
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = resultatAPI[article].name;

                // Insertion de la description "p"
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = resultatAPI[article].description;
            }
        })//si la promesse est rejetée,affichage d'une erreur 
        .catch(function (error) {
            return error;
        });
}