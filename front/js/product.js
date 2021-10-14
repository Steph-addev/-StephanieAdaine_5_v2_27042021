// Récupération API des articles individuellement et ajout au panier

(async function (article) {
  const articles = await appearanceArticle();
  getProductId(articles);
})();

/* --------------------------------------FUNCTIONS -------------------------------------------*/

// Récupération de l'API par GET depuis le server, récupération des détails des articles
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

// Récupération de l'Id produit pour l'affichage d'un seul produit sur la page produit.html
function getProductId(articles) {
  const recupUrl = window.location.search;
  const recupId = new URLSearchParams(recupUrl);
  console.log(articles);
  const idInUrl = recupId.get("id");
  const idSelector = articles.find((article) => article._id === idInUrl);
  displayArticle(idSelector);
  addToCart(idSelector);
}

// Affichage sur la page HTML des détails du produit-ID
function displayArticle(idSelector) {
  getOptionsArticle(idSelector);
  htmlInjectionDatas(idSelector);
}

// Injection des données de l'API dans la page HTML
function htmlInjectionDatas(idSelector) {
  const positionArticle = document.getElementById("article");
  positionArticle.querySelector(".item__imgUrl").setAttribute("src", idSelector.imageUrl);
  positionArticle.querySelector(".item__imgUrl").setAttribute("alt", idSelector.altTxt);
  positionArticle.querySelector("#title").textContent = idSelector.name;
  positionArticle.querySelector("#description").textContent = idSelector.description;
  positionArticle.querySelector("#price").textContent = idSelector.price;
}

// Affichage des options de vernissage par boucle pour afficher les éléments sous forme de tableau selon le nombre d'options
function getOptionsArticle(idSelector) {
  const varnishChoice = idSelector.colors;
  let varnishStructure = [];
  for (let v = 0; v < varnishChoice.length; v++) {
    varnishStructure =
      varnishStructure +
      `
    <option value="${v}">${varnishChoice[v]}</option>
    `;
  }
  const positionOption = document.getElementById("article");
  positionOption.querySelector("#colors").innerHTML = varnishStructure;
}

// Au clic sur le bouton "ajouter au panier", la fonction rassemble les éléments sélectionnés par l'utilisateur pour créer son panier.
// Le panier est ensuite enregistrer dans le localStorage
function addToCart(idSelector) {
  const clikPanier = document.getElementById("addToCart");
  clikPanier.addEventListener("click", (shop) => {
    event.preventDefault();
    const idOptionProduit = document.querySelector("#colors");
    const idQuantityProduit = document.querySelector("#quantity");
    const choixUx = idOptionProduit.value;
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

// If idSelector and couleur is true alors ajouter quantité sinon ajouter new article to localStorage
function addItemstoStorage(produitPanier) {
  let saveInLocalStorage = JSON.parse(localStorage.getItem("products"));
  const quantityLocation = document.querySelector("#quantity");
  const unitPriceLocation = document.querySelector("#price");
  let quantPrice = quantityLocation.value * unitPriceLocation.textContent;

  if (saveInLocalStorage === null) {
    saveInLocalStorage = [];
    produitPanier.price = quantPrice;
    saveInLocalStorage.push(produitPanier);
    localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
    alert("Votre article a bien été ajouté au panier");
    console.log(saveInLocalStorage);
    console.log(produitPanier);
    console.log("je suis le if 1");
  } else {
    console.log("je suis le else 1");
    for (i = 0; i < saveInLocalStorage.length; i++) {
      if (produitPanier._id === saveInLocalStorage[i]._id && produitPanier.colors === saveInLocalStorage[i].colors) {
        let addedQuantité = parseInt(saveInLocalStorage[i].quantity, 10) + parseInt(produitPanier.quantity, 10);
        let totalPrice = produitPanier.price * addedQuantité;
        saveInLocalStorage[i].quantity = addedQuantité;
        console.log(addedQuantité);
        saveInLocalStorage[i].price = totalPrice;
        console.log(totalPrice);
        localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        alert("Votre article a bien été ajouté au panier");
        console.log(saveInLocalStorage);
        console.log(produitPanier);
        console.log("je suis le if 2");
        return;
      } else {
        produitPanier.price = quantPrice;
        saveInLocalStorage.push(produitPanier);
        localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        alert("Votre article a bien été ajouté au panier");
        console.log(saveInLocalStorage);
        console.log(produitPanier);
        console.log("je suis le else 2");
        break;
      }
    }
  }

  /*  let saveInLocalStorage = JSON.parse(localStorage.getItem("products"));
  const quantityLocation = document.querySelector("#quantity");
  const unitPriceLocation = document.querySelector("#price");
  let quantPrice = quantityLocation.value * unitPriceLocation.textContent;
  let addedQuantité = parseInt(saveInLocalStorage.quantity, 10) + parseInt(produitPanier.quantity, 10);
  let totalPrice = produitPanier.price * totalQuantité;
  if (saveInLocalStorage === null || (produitPanier._id != saveInLocalStorage._id && produitPanier.colors != saveInLocalStorage.colors)) {
    saveInLocalStorage = [];
    produitPanier.price = quantPrice;
    saveInLocalStorage.push(produitPanier);
    localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
    alert("Votre article a bien été ajouté au panier");
    console.log(saveInLocalStorage);
  } else {
    saveInLocalStorage.quantity = addedQuantité;
    saveInLocalStorage.price = totalPrice;
    saveInLocalStorage.push(produitPanier);
    localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
    alert("Votre article a bien été ajouté au panier");
    console.log(saveInLocalStorage);
  } */
}
