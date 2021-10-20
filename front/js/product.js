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
  console.log(varnishChoice);
  let varnishStructure = [];
  varnishChoice.forEach((item) => {
    varnishStructure =
      varnishStructure +
      `
<option value="${item}">${item}</option>
`;
  });

  /*   for (element of varnishChoice) {
    console.log(element);
    varnishStructure =
      varnishStructure +
      `
    <option>${element}</option>
    `;
  } */
  /* for (let v = 0; v < varnishChoice.length; v++)  {
    varnishStructure =
      varnishStructure +
      `
    <option value="${v}">${varnishChoice[v]}</option>
    `;
  }*/
  const positionOption = document.getElementById("article");
  positionOption.querySelector("#colors").innerHTML = varnishStructure;
}

// Au clic sur le bouton "ajouter au panier", la fonction rassemble les éléments sélectionnés par l'utilisateur pour créer son panier.
// Le panier est ensuite enregistrer dans le localStorage
function addToCart(idSelector) {
  const clikPanier = document.getElementById("addToCart");
  clikPanier.addEventListener("click", (shop) => {
    event.preventDefault();
    let i = 0;
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

// If idSelector and couleur is true alors ajouter quantité sinon ajouter new article to localStorage
function addItemstoStorage(produitPanier) {
  /*     let saveInLocalStorage = JSON.parse(localStorage.getItem("products"));
      const quantityLocation = document.querySelector("#quantity");
      const unitPriceLocation = document.querySelector("#price");
      let quantPrice = quantityLocation.value * unitPriceLocation.textContent;
      let addedQuantité = parseInt(saveInLocalStorage.quantity, 10) + parseInt(produitPanier.quantity, 10);
      let totalPrice = produitPanier.price * totalQuantité;
      if (saveInLocalStorage /* || (produitPanier._id != saveInLocalStorage._id && produitPanier.colors != saveInLocalStorage.colors)) {
        saveInLocalStorage.quantity = addedQuantité;
        saveInLocalStorage.price = totalPrice;
        saveInLocalStorage.push(produitPanier);
        localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        alert("Votre article a bien été ajouté au panier");
        console.log(saveInLocalStorage);
      } else {
        saveInLocalStorage = [];
        produitPanier.price = quantPrice;
        saveInLocalStorage.push(produitPanier);
        localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        alert("Votre article a bien été ajouté au panier");
        console.log(saveInLocalStorage);
      } */

  let saveInLocalStorage = JSON.parse(localStorage.getItem("products"));
  const quantityLocation = document.querySelector("#quantity");
  const unitPriceLocation = document.querySelector("#price");
  let quantPrice = quantityLocation.value * unitPriceLocation.textContent;
  let a = 0;

  if (saveInLocalStorage === null /* || (produitPanier._id != saveInLocalStorage._id && produitPanier.colors != saveInLocalStorage.colors) */) {
    saveInLocalStorage = [];
    produitPanier.price = quantPrice;
    saveInLocalStorage.push(produitPanier);
    localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
    alert("Votre article a bien été ajouté au panier");
    console.log(saveInLocalStorage);
    console.log(produitPanier.colors + " produitPanier.colors - je suis le premier article ajouté");

    /*  let produit = produitPanier.colors;
        for (property in produit) {
          console.log(`${property}: ${produit[property]}`);
        }*/
  } else {
    /*  if (saveInLocalStorage.every((e) => e._id !== produitPanier._id)) {
          console.log("if");
          produitPanier.quantity += 1;
          saveInLocalStorage.push(produitPanier);
          localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        } else {
          const searchInLocalStorage = saveInLocalStorage.find((e) => e._id === produitPanier._id);
          console.log(searchInLocalStorage);
          saveInLocalStorage.quantity = searchInLocalStorage.quantity += 1;
          localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        } */
    /* let addedQuantité = parseInt(saveInLocalStorage.quantity, 10) + parseInt(produitPanier.quantity, 10);
        let totalPrice = produitPanier.price * addedQuantité;
        saveInLocalStorage.quantity = addedQuantité;
        saveInLocalStorage.price = totalPrice;
        saveInLocalStorage.push(produitPanier);
        localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        alert("Votre article a bien été ajouté au panier"); */
    /*    console.log(produitPanier); */
    /*       for (a = 0; a < saveInLocalStorage.length; a++) {
          console.log(saveInLocalStorage.every(e => e._id !== produitPanier._id)) ; */
    /*         console.log("Ci-dessous l'id et la couleur du produitPanier");
          console.log(produitPanier._id + " panier._id");
          console.log(produitPanier.colors + " panier.colors");
          console.log("-");
          console.log("Ci-dessous l'id et la couleur du saveInLocalStorage");
          console.log(saveInLocalStorage[a]._id + " saveInLocalStorage[a]._id");
          console.log(saveInLocalStorage[a].colors + " saveInLocalStorage[a].colors");
          console.log("-");
          console.log("Ci-dessous : Check si produitPanier et saveInLocalStorage ont la même couleur");
          console.log(produitPanier.colors === saveInLocalStorage[a].colors);
          console.log("-");
          console.log("Ci-dessous : Check si produitPanier et saveInLocalStorage ont le même id");
          console.log(produitPanier._id === saveInLocalStorage[a]._id);
          console.log("-");
          console.log("Ci-dessous : Check si produitPanier === saveInLocalStorage pour l'id ET la couleur");
          console.log(produitPanier._id === saveInLocalStorage[a]._id && produitPanier.colors === saveInLocalStorage[a].colors);
          console.log("fin de la boucle"); */

    /* Object.values(saveInLocalStorage[a].colors).forEach((val) => console.log(Object.values(saveInLocalStorage[a].colors).join("")));
     */
    /*         console.log(produitPanier.colors);
          console.log(saveInLocalStorage[a].colors);
          console.log(a); */
    if ((produitPanier._id === saveInLocalStorage[a]._id) != null && produitPanier.colors === saveInLocalStorage[a].colors) {
      console.log("j'ai mon id et color identique au local storage");
      /* let addedQuantité = parseInt(saveInLocalStorage[a].quantity, 10) + parseInt(produitPanier.quantity, 10);
            let totalPrice = produitPanier.price * addedQuantité;
            saveInLocalStorage[a].quantity = addedQuantité;
            saveInLocalStorage[a].price = totalPrice; */
      localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
      alert("Votre article a bien été ajouté au panier");
    } else {
      console.log("l'une de mes conditions ne fonctionne pas");
      console.log(produitPanier);
      saveInLocalStorage.push(produitPanier);
      localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
      console.log("je suis le else 2");
      console.log(saveInLocalStorage);
    }

    //____________________________________________________________BOUCLE DO WHILE__________________________________________________________________ ECHEC
    /* do {
            let addedQuantité = parseInt(saveInLocalStorage.quantity, 10) + parseInt(produitPanier.quantity, 10);
            let totalPrice = produitPanier.price * addedQuantité;
            saveInLocalStorage.quantity = addedQuantité;
            saveInLocalStorage.price = totalPrice;
            saveInLocalStorage.push(produitPanier);
            alert("Votre article a bien été ajouté au panier");
            localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
            break;
          } while (saveInLocalStorage[a]._id === saveInLocalStorage[a]._id && saveInLocalStorage[a].colors === saveInLocalStorage[a].colors); */

    //____________________________________________________________BOUCLE WHILE IF break__________________________________________________________________ ECHEC
    /*         while ((produitPanier._id === saveInLocalStorage[a]._id && produitPanier.colors === saveInLocalStorage[a].colors) === true) {
            console.log("j'ai mon id et color identique au local storage");
            let addedQuantité = parseInt(saveInLocalStorage[a].quantity, 10) + parseInt(produitPanier.quantity, 10);
            let totalPrice = produitPanier.price * addedQuantité;
            saveInLocalStorage[a].quantity = addedQuantité;
            saveInLocalStorage[a].price = totalPrice;
            localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
            alert("Votre article a bien été ajouté au panier");
  
            if (produitPanier._id in saveInLocalStorage === null) break;
            {
              saveInLocalStorage.push(produitPanier);
              localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
              console.log("je suis le else 2");
              console.log(saveInLocalStorage);
            }
          } */
    //_____________________________________________________________BOUCLE PROPERTY_______________________________________________________________________________ AUCUN CHANGEMENT
    /*         let colorLenght = saveInLocalStorage[a].colors;
          console.log(colorLenght);
          for (const value of colorLenght) {
            console.log(value);
          }
          let colorNumber = colorLenght.length;
          console.log(colorNumber); */

    /* let colors = saveInLocalStorage[i].colors;
          for (property in colors) {
            console.log(`${property}: ${colors[property]}`);
          }
          let produit = produitPanier.colors;
          for (property in produit) {
            console.log(`${property}: ${produit[property]}`);
          } */

    // _________________________________________________BOUCLE FOR EACH valeur____________________________________________________________________________________ ECHEC
    /*         const key = localStorage.key(i);
          console.log(`${key}: ${localStorage.getItem(key)}`);
          Object.values(saveInLocalStorage[a].colors).forEach((val) => console.log(Object.values(saveInLocalStorage[a].colors)));
          console.log(saveInLocalStorage[a].colors + " je suis saveInLocalStorage[i].colors");
          console.log(Object.values(saveInLocalStorage[i].colors).join(""));
          console.log(Object.values(saveInLocalStorage)); */

    /*   let saveInLocalStorage = JSON.parse(localStorage.getItem("products"));
        let i = 0;
        let totalQuantité = parseInt(saveInLocalStorage[i].quantity, 10) + parseInt(produitPanier.quantity, 10);
        let totalPrice = produitPanier.price * totalQuantité;
    
        if (saveInLocalStorage === null || (produitPanier._id === saveInLocalStorage[s]._id && produitPanier.colors === saveInLocalStorage[s].colors)) {
          saveInLocalStorage = [];
          saveInLocalStorage.push(produitPanier);
          totalPrice;
          localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
          console.log("je suis le if 1");
          console.log(saveInLocalStorage);
          console.log(produitPanier._id == saveInLocalStorage._id);
        } else {
          console.log("je suis le else 1");
          for (s = 0; s < saveInLocalStorage.length; s++) {
            if (produitPanier._id === saveInLocalStorage[s]._id && produitPanier.colors === saveInLocalStorage[s].colors) {
              console.log(produitPanier._id == saveInLocalStorage._id);
              let totalQuantité = parseInt(saveInLocalStorage[s].quantity, 10) + parseInt(produitPanier.quantity, 10);
              let totalPrice = produitPanier.price * totalQuantité;
              console.log(totalPrice);
              let updateStorage = saveInLocalStorage;
              updateStorage[s].quantity = totalQuantité;
              updateStorage[s].price = totalPrice;
              saveInLocalStorage = updateStorage;
              console.log(saveInLocalStorage);
              localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
              console.log("Je suis le if 2");
              console.log(saveInLocalStorage);
              return;
            } else {
              saveInLocalStorage.push(produitPanier);
              localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
              console.log("je suis le else 2");
              console.log(saveInLocalStorage);
              console.log(produitPanier._id == saveInLocalStorage._id);
              break;
            }
          }
        } */
    /*     if (saveInLocalStorage != null) {
          for (s = 0; s < saveInLocalStorage.length; s++) {
            if (produitPanier._id === saveInLocalStorage[s]._id && produitPanier.colors === saveInLocalStorage[s].colors) {
              let totalQuantité = parseInt(saveInLocalStorage[s].quantity, 10) + parseInt(produitPanier.quantity, 10);
              let totalPrice = idSelector.price * totalQuantité;
              let updateStorage = saveInLocalStorage;
              updateStorage[s].quantity = totalQuantité;
              updateStorage[s].price = totalPrice;
              saveInLocalStorage = updateStorage;
              console.log(saveInLocalStorage);
              localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
              console.log("Je suis le if 2");
              console.log(saveInLocalStorage);
            } else {
              console.log("Je suis le else 1");
              console.log(saveInLocalStorage, produitPanier);
              saveInLocalStorage.push(produitPanier);
              localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
              break;
            }
            continue;
          }
        } else {
          saveInLocalStorage = [];
          saveInLocalStorage.push(produitPanier);
          localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
          console.log("je suis le else 2");
          console.log(saveInLocalStorage);
        } */

    /* ;
          localStorage.setItem("products", JSON.stringify(saveInLocalStorage)); */

    /* let saveInLocalStorage = JSON.parse(localStorage.getItem("products"));
  const quantityLocation = document.querySelector("#quantity");
  const unitPriceLocation = document.querySelector("#price");
  let quantPrice = quantityLocation.value * unitPriceLocation.textContent;
  let i = 0;

  if (saveInLocalStorage === null) {
    saveInLocalStorage = [];
    produitPanier.price = quantPrice;
    saveInLocalStorage.push(produitPanier);
    localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
    alert("Votre article a bien été ajouté au panier");
    console.log(typeof produitPanier._id);
    console.log(typeof saveInLocalStorage[i]._id);
    /* console.log(produitPanier);
    console.log("je suis le if 1"); 
    console.log("je suis le if 1");
    console.log(produitPanier.colors + " je suis produitPanier.colors");

    console.log(saveInLocalStorage[i].colors + " je suis saveInLocalStorage[i].colors");

    /* const key = localStorage.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`);

    let color = saveInLocalStorage[i];
    let colors = saveInLocalStorage[i]._id;
    for (property in colors) {
      console.log(`${property}: ${colors[property]}`);
    }

    for (const colorsArray of colors) {
      console.log(colorsArray + "je suis colorsArray");
    } 
  } else {
    for (i = 0; i < saveInLocalStorage.lenght; i++) {
      console.log("je suis le else 1");
      console.log(saveInLocalStorage.lenght + " je suis saveInLocalStorage.lenght");
      Object.values(saveInLocalStorage[i].colors).forEach((val) => console.log(Object.values(saveInLocalStorage[i].colors).join("")));
      if (produitPanier._id === saveInLocalStorage[i]._id && produitPanier.colors === saveInLocalStorage[i].colors) {
        let addedQuantité = parseInt(saveInLocalStorage[i].quantity, 10) + parseInt(produitPanier.quantity, 10);
        let totalPrice = produitPanier.price * addedQuantité;
        saveInLocalStorage[i].quantity = addedQuantité;
        console.log(addedQuantité);
        saveInLocalStorage[i].price = totalPrice;
        console.log(totalPrice);
        localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        alert("Votre article a bien été ajouté au panier");
        console.log(produitPanier._id + " je suis produitPanier.colors");
        console.log(saveInLocalStorage[i]._id + " je suis saveInLocalStorage[i].colors");
        /*         Object.keys(localStorage).forEach((key) => {
          console.log(localStorage.getItem(key));
          console.log("je suis le local");
        }); */
    /*  let color = saveInLocalStorage[i];
        let colors = saveInLocalStorage[i]._id;
        for (property in colors) {
          console.log(`${property}: ${colors[property]}`);
        }
        for (const colorsArray of colors) {
          console.log(colorsArray + "je suis colorsArray");
        } 
        console.log("je suis le if 2");
        return;
      } else {
        produitPanier.price = quantPrice;
        saveInLocalStorage.push(produitPanier);
        localStorage.setItem("products", JSON.stringify(saveInLocalStorage));
        alert("Votre article a bien été ajouté au panier");
        console.log(produitPanier._id + " je suis produitPanier.colors");
        console.log(saveInLocalStorage[i]._id + " je suis saveInLocalStorage[i].colors");
        /*         let color = saveInLocalStorage[i];
        let colors = saveInLocalStorage[i]._id;
        for (property in colors) {
          console.log(`${property}: ${colors[property]}`);
        }
        for (const colorsArray of colors) {
          console.log(colorsArray + "je suis colorsArray");
        } 
        console.log("je suis le else 2");
        break;
      }
    }
    /*     const key = localStorage.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`); */
    /*     Object.values(saveInLocalStorage[i].colors).forEach((val) => console.log(Object.values(saveInLocalStorage[i].colors)));
    console.log(saveInLocalStorage[i].colors + " je suis saveInLocalStorage[i].colors");
    console.log(Object.values(saveInLocalStorage[i].colors).join("")); 
  }
 */
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
}
