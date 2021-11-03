let products = JSON.parse(localStorage.getItem("products"));

// Injection avec panier vide et injection panier remplit avec boucle pour afficher articles du localStorage
if (products === null || products == 0) {
  const panierLocation = document.querySelector("#cart__items");
  panierLocation.innerHTML = "Votre panier est vide.";
  localStorage.removeItem("products", JSON.stringify(products));
} else {
  let additionArticle = [];
  for (p = 0; p < products.length; p++) {
    additionArticle =
      additionArticle +
      `
    <article class="cart__item" data-id="{product-ID}">
      <div class="cart__item__img">
        <img src="${products[p].imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${products[p].name}</h2>
          <p>${products[p].price + "€"}</p>
          <p>color: ${products[p].colors}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p class="cart__item__content__settings__quantity__text">Qté : ${products[p].quantity}</p>
              <button class="cart__item__content__settings__quantity__icons cart__item__content__settings__quantity__icons__plus">
                <i class="fas fa-plus-square"></i>
              </button>
              <button class="cart__item__content__settings__quantity__icons cart__item__content__settings__quantity__icons__minus">
                <i class="fas fa-minus-square"></i>
              </button> 
          </div>
          <div class="cart__item__content__settings__delete">
            <button class="deleteItem">Supprimer</button>
          </div>
        </div>
      </div>
    </article>
  `;
  }

  //Toutes les fonctions sont expliquées ci-après
  getArticles(additionArticle);

  deleteItems();
  deleteAllItems();

  plusQuantité();
  minusQuantité();

  totalCart();
  totalArticles();

  // Fonction qui s'exécute au clic sur commander pour soumettre la commande et récupérer l'order ID
  function confirmOrder() {
    const buttonValidation = document.querySelector("#order");
    // Activation de l'envoi du formulaire au click sur "commander"
    buttonValidation.addEventListener("click", (valid) => {
      valid.preventDefault();
      validationForm();

      //Envoi du formulaire dans le localStorage, l'order ID sera renvoyé uniquement si les données sont correctes
      if (validationForm() == true) {
        getOrderId();
      }
    });
  }
  confirmOrder();
}

/* -----------------------------------------------FUNCTIONS ----------------------------------------------*/

//Fonction pour afficher les articles dans le HTML
function getArticles(additionArticle) {
  const insidePanier = document.querySelector(".cart__item");
  if (p == products.length) {
    insidePanier.innerHTML = additionArticle;
  }
}

// Fonction pour supprimer un article du panier quand on clique sur "supprimer", mise à jour du LocalStorage et disparition de l'article dans le HTML
function deleteItems() {
  const trash = document.querySelectorAll(".deleteItem");
  trash.forEach((btn, i) =>
    btn.addEventListener("click", (event) => {
      deleteItemSelected(i);
      alert("Cet article sera supprimé de votre panier");
      window.location.href = "cart.html";
    })
  );
  function deleteItemSelected(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// Fonction pour supprimer tous les articles du panier quand on clique sur "vider le panier", mise à jour du LocalStorage et disparition de l'article dans le HTML
function deleteAllItems() {
  const trashAll = document.querySelector(".cart__itemsDelete");
  trashAll.addEventListener("click", (action) => {
    event.preventDefault();
    localStorage.removeItem("products", JSON.stringify(products));
    alert("Votre panier sera vidé");
    window.location.href = "cart.html";
  });
}

// Fonction pour supprimer tous les articles du panier quand on clique sur "vider le panier", mise à jour du LocalStorage et disparition de l'article dans le HTML
function deleteItemsMinus() {
  const minusTrash = document.querySelectorAll(".cart__item__content__settings__quantity__icons__minus");
  for (r = 0; r < minusTrash.length; r++) {
    let suppressionById = products[r]._id;
    minusTrash[r].addEventListener("click", (event) => {
      event.preventDefault();
      products = products.filter((products) => products._id !== suppressionById);
      localStorage.setItem("products", JSON.stringify(products));
      alert("Cet article sera supprimé de votre panier");
      window.location.href = "cart.html";
    });
  }
}

// Fonction pour augmenter la quantité d'un article
function plusQuantité() {
  const plus = document.querySelectorAll(".cart__item__content__settings__quantity__icons__plus");
  for (let q = 0; q < plus.length; q++) {
    let updateQuantité = parseInt(products[q].quantity);
    let updatePrice = parseInt(products[q].unitPrice);
    updateProducts = products;
    plus[q].addEventListener("click", (event) => {
      event.preventDefault();
      updateProducts[q].quantity = updateQuantité + 1;
      updateProducts[q].price = updatePrice * updateProducts[q].quantity;
      localStorage.setItem("products", JSON.stringify(products));
      window.location.href = "cart.html";
    });
  }
}

// Fonction pour diminuer la quantité d'un article jusqu'à 1 article
// En dessous de 1, la quantité de l'article sera égale à 0 et l'article sera supprimé du panier
function minusQuantité() {
  const minus = document.querySelectorAll(".cart__item__content__settings__quantity__icons__minus");
  for (let q = 0; q < minus.length; q++) {
    let updateQuantité = parseInt(products[q].quantity);
    let updatePrice = parseInt(products[q].unitPrice);
    updateProducts = products;
    if (products[q].quantity > 1) {
      minus[q].addEventListener("click", (event) => {
        event.preventDefault();
        updateProducts[q].quantity = updateQuantité - 1;
        updateProducts[q].price = updatePrice * updateProducts[q].quantity;
        localStorage.setItem("products", JSON.stringify(products));
        window.location.href = "cart.html";
      });
    } else {
      deleteItemsMinus();
    }
  }
}

// Addition du total des produits présents dans le panier
function totalCart() {
  const totalPanier = document.querySelector("#totalPrice");
  let totalPricePanier = [];
  for (t = 0; t < products.length; t++) {
    const totalProducts = products[t].price;
    totalPricePanier.push(totalProducts);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPanier.innerHTML = totalPricePanier.reduce(reducer, 0);
  }
}

// Fonction pour additioner le nombre de produits présents dans le panier
function totalArticles() {
  const numberArticles = document.querySelector("#totalQuantity");
  let totalArticlesPanier = [];
  for (q = 0; q < products.length; q++) {
    const totalQuantity = parseInt(products[q].quantity);
    totalArticlesPanier.push(totalQuantity);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    numberArticles.innerHTML = totalArticlesPanier.reduce(reducer, 0);
  }
}

// Fonction globale pour sécuriser le formulaire et s'assurer que l'utilisateur entre des données valides
function validationForm() {
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  // Fonction pour validation du champs prénom
  function regExpFirstName() {
    // Récupération des données saisies
    const firstNameValid = contact.firstName;
    // Injection du HTML
    const checkFirstName = document.querySelector("#firstNameErrorMsg");

    // Indication de la bonne saisie ou l'erreur dans le HTML
    if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstNameValid)) {
      checkFirstName.innerHTML = "<i class='fas fa-check-circle form'></i>";
      return true;
    } else {
      checkFirstName.innerHTML = "<i class='fas fa-times-circle form'></i> format incorrect";
    }
  }

  // Fonction pour validation du champs nom
  function regExpLastName() {
    // Récupération des données saisies
    const lastNameValid = contact.lastName;
    // Injection du HTML
    const checklastName = document.querySelector("#lastNameErrorMsg");

    // Indication de la bonne saisie ou l'erreur dans le HTML
    if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastNameValid)) {
      checklastName.innerHTML = "<i class='fas fa-check-circle form'></i>";
      return true;
    } else {
      checklastName.innerHTML = "<i class='fas fa-times-circle form'></i> format incorrect";
    }
  }

  // Fonction pour validation du champs ville
  function regExpCity() {
    // Récupération des données saisies
    const cityValid = contact.city;
    // Injection du HTML
    const checkCity = document.querySelector("#cityErrorMsg");

    // Indication de la bonne saisie ou l'erreur dans le HTML
    if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(cityValid)) {
      checkCity.innerHTML = "<i class='fas fa-check-circle form'></i>";
      return true;
    } else {
      checkCity.innerHTML = "<i class='fas fa-times-circle form'></i> format incorrect";
    }
  }

  // Fonction pour validation des champs de l'adresse
  function regExpAddress() {
    // Récupération des données saisies
    const addressValid = contact.address;
    // Injection du HTML
    const checkAddress = document.querySelector("#addressErrorMsg");

    // Indication de la bonne saisie ou l'erreur dans le HTML
    if (/^[A-Za-z0-9\s]{3,100}$/.test(addressValid)) {
      checkAddress.innerHTML = "<i class='fas fa-check-circle form'></i>";
      return true;
    } else {
      checkAddress.innerHTML = "<i class='fas fa-times-circle form'></i> format incorrect";
    }
  }

  // Fonction pour validation des champs de l'email
  function regExpEmail() {
    // Récupération des données saisies
    const emailValid = contact.email;
    // Injection du HTML
    const checkEmail = document.querySelector("#emailErrorMsg");

    // Indication de la bonne saisie ou l'erreur dans le HTML
    if (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(emailValid)) {
      checkEmail.innerHTML = "<i class='fas fa-check-circle form'></i>";
      return true;
    } else {
      checkEmail.innerHTML = "<i class='fas fa-times-circle form'></i> format incorrect";
    }
  }

  //Envoi du formulaire dans le localStorage uniquement si les données sont correctes
  if (regExpFirstName() & regExpLastName() & regExpCity() & regExpEmail() & regExpAddress()) {
    return true;
  } else {
    alert("Merci de vérifier vos données dans le formulaire");
  }
}

// Fonction pour récupérer l'order ID en envoyant les informations de contact {string} et produits (array of string de product-ID)
function getOrderId() {
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  let products = [];
  for (r = 0; r < products.length; r++) {
    product.push(products[r]._id);
  }
  const envoiFormulaire = {
    contact,
    products,
  };

  // Fonction API qui renvoie l'order ID si la requête est bonne
  function sendToServer(envoiFormulaire) {
    localStorage.setItem("contact", JSON.stringify(contact));
    return fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envoiFormulaire),
    })
      .then((response) => response.json())
      .then((order) => {
        localStorage.setItem("orderId", order.orderId);
        window.location.href = "confirmation.html" + "?" + "name" + "=" + order.orderId;
        localStorage.clear();
      })
      .catch((err) => alert("Il y a un problème: ", err));
  }
  sendToServer(envoiFormulaire);
}
