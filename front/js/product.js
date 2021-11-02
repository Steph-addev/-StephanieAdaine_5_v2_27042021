// Récupération API des articles individuellement et ajout au panier

(async function (article) {
  const articles = await appearanceArticle();
  getProductId(articles);
})();

/* ------------------------------------------------------------------------------FUNCTIONS ----------------------------------------------------------------------------------*/

// Fonction de récupération de l'API par GET depuis le server, récupération des détails des articles
function appearanceArticle() {
  return fetch("http://localhost:3000/api/products")
    .then(function (results) {
      return results.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (erreur) {
      alert("Il y a une erreur de chargement. Merci de vous assurer que le port 3000 est bien activé.");
    });
}

// Fonction de récupération de l'Id produit pour l'affichage d'un seul produit sur la page produit.html. Utilisation de URLSearchParams.
function getProductId(articles) {
  const recupUrl = window.location.search;
  const recupId = new URLSearchParams(recupUrl);
  console.log(articles);
  const idInUrl = recupId.get("id");
  const idSelector = articles.find((article) => article._id === idInUrl);
  displayArticle(idSelector);
  addToCart(idSelector);
}

// Fonction pour l'affichage sur la page HTML des détails du produit-ID
function displayArticle(idSelector) {
  getOptionsArticle(idSelector);
  htmlInjectionDatas(idSelector);
}

// Fonction pour l'injection des données de l'API dans la page HTML.
// Visible ensuite grâce à la fonction displayArticle()
function htmlInjectionDatas(idSelector) {
  const positionArticle = document.getElementById("article");
  positionArticle.querySelector(".item__imgUrl").setAttribute("src", idSelector.imageUrl);
  positionArticle.querySelector(".item__imgUrl").setAttribute("alt", idSelector.altTxt);
  positionArticle.querySelector("#title").textContent = idSelector.name;
  positionArticle.querySelector("#description").textContent = idSelector.description;
  positionArticle.querySelector("#price").textContent = idSelector.price;
}

// Fonction pour l'injection dans le HTML des options de vernissage par boucle pour afficher les éléments sous forme de tableau selon le nombre d'options.
// Visible ensuite grâce à la fonction displayArticle()
function getOptionsArticle(idSelector) {
  const varnishChoice = idSelector.colors;
  console.log(varnishChoice);
  let varnishStructure = [];
  varnishChoice.forEach((item) => {
    varnishStructure =
      varnishStructure +
      `
<option value="${item}">${item}</option>
`;
  });

  const positionOption = document.getElementById("article");
  positionOption.querySelector("#colors").innerHTML = varnishStructure;
}

// Fonction : au clic sur le bouton "ajouter au panier", la fonction rassemble les éléments sélectionnés par l'utilisateur pour créer son panier.
// Le panier est ensuite enregistré dans le localStorage
function addToCart(idSelector) {
  const clikPanier = document.getElementById("addToCart");
  clikPanier.addEventListener("click", (shop) => {
    event.preventDefault();
    const idOptionProduit = document.querySelector("#colors");
    const idQuantityProduit = document.querySelector("#quantity");
    let choixUx = idOptionProduit.value;
    console.log(choixUx);
    const choixQt = idQuantityProduit.value;
    let produitPanier = {
      colors: choixUx,
      _id: idSelector._id,
      name: idSelector.name,
      price: idSelector.price,
      unitPrice: idSelector.price,
      imageUrl: idSelector.imageUrl,
      description: idSelector.description,
      quantity: choixQt,
    };
    addItemstoStorage(produitPanier);
  });
}

// Fonction pour ajouter les articles au panier sous conditions (éviter les doublons)
function addItemstoStorage(produitPanier) {
  let saveInLocalStorage = JSON.parse(localStorage.getItem("products"));
  const quantityLocation = document.querySelector("#quantity");
  const unitPriceLocation = document.querySelector("#price");
  let quantPrice = quantityLocation.value * unitPriceLocation.textContent;

  // Si le localStorage est vide, ajouter un premier article
  // Sinon si l'id et la couleur d'un article sont déjà dans le panier, ajouter la quantité à l'article.
  // Si le cas ne s'applique pas, ajouter un nouvel article
  if (saveInLocalStorage === null) {
    saveInLocalStorage = [];
    produitPanier.price = quantPrice;
    saveInLocalStorage.push(produitPanier);
    localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
    alert("Votre article a bien été ajouté au panier");
    console.log(saveInLocalStorage);
    console.log(produitPanier.colors + " produitPanier.colors - je suis le premier article ajouté");
  } else {
    let equals = false;
    for (let a = 0; a < saveInLocalStorage.length; a++) {
      if (produitPanier._id === saveInLocalStorage[a]._id && produitPanier.colors === saveInLocalStorage[a].colors) {
        equals = true;
        let addedQuantité = parseInt(saveInLocalStorage[a].quantity, 10) + parseInt(produitPanier.quantity, 10);
        let totalPrice = produitPanier.price * addedQuantité;
        saveInLocalStorage[a].quantity = addedQuantité;
        saveInLocalStorage[a].price = totalPrice;
        alert("La quantité de votre article a bien été mise à jour");
      }
    }
    if (equals == false) {
      produitPanier.price = quantPrice;
      saveInLocalStorage.push(produitPanier);
      alert("Votre article a bien été ajouté au panier");
    }
    localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
  }
}
