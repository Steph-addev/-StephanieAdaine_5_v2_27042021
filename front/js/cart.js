let products = JSON.parse(localStorage.getItem("products"));
console.log(products);
const panierLocation = document.querySelector("#cart__items");
const insidePanier = document.querySelector(".cart__item");
const totalPanier = document.querySelector("#totalPrice");

// Objet "contact" à envoyer dans le localStorage pour confirmation de commande

// injection HTML
// Injection avec panier vide et injection panier remplit avec boucle pour afficher articles du localStorage
if (products === null || products == 0) {
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

  // Affichage des articles dans le HTML
  if (p == products.length) {
    insidePanier.innerHTML = additionArticle;
  }

  deleteItemsDelete();

  deleteAllItems();
  adjustQuantity();
  totalCart();
  // Sélectionner du bouton "commander" pour soumettre le formulaire
  const buttonValidation = document.querySelector("#order");

  // Activation de l'envoi du formulaire au click sur "commander"
  buttonValidation.addEventListener("click", (valid) => {
    valid.preventDefault();

    // Sécuriser le formulaire pour s'assurer que l'utilisateur entre des données valides
    //RegExp applicable pour le prénom, le nom et la ville
    const controlPrenomNomVille = (value) => {
      return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
    };
    //RegExp Applicable pour l'adresse
    const controlAdresse = (value) => {
      return /^[A-Za-z0-9\s]{3,100}$/.test(value);
    };
    //RegExp Aplicable pour l'email
    const controlEmail = (value) => {
      return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
    };
    const contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };
    const firstNameValid = contact.firstName;
    const lastNameValid = contact.lastName;
    const cityValid = contact.city;
    const addressValid = contact.address;
    const emailValid = contact.email;

    // Injection du HTML pour indiquer la bonne saisie ou l'erreur
    const checkFirstName = document.querySelector("#firstNameErrorMsg");
    const checklastName = document.querySelector("#lastNameErrorMsg");
    const checkCity = document.querySelector("#cityErrorMsg");
    const checkAddress = document.querySelector("#addressErrorMsg");
    const checkEmail = document.querySelector("#emailErrorMsg");

    if (controlPrenomNomVille(firstNameValid)) {
      checkFirstName.innerHTML = "<i class='fas fa-check-circle form'></i>";
    } else {
      checkFirstName.innerHTML = "<i class='fas fa-times-circle form'></i>";
    }
    if (controlPrenomNomVille(lastNameValid)) {
      checklastName.innerHTML = "<i class='fas fa-check-circle form'></i>";
    } else {
      checklastName.innerHTML = "<i class='fas fa-times-circle form'></i>";
    }
    if (controlPrenomNomVille(cityValid)) {
      checkCity.innerHTML = "<i class='fas fa-check-circle form'></i>";
    } else {
      checkCity.innerHTML = "<i class='fas fa-times-circle form'></i>";
    }
    if (controlAdresse(addressValid)) {
      checkAddress.innerHTML = "<i class='fas fa-check-circle form'></i>";
    } else {
      checkAddress.innerHTML = "<i class='fas fa-times-circle form'></i>";
    }
    if (controlEmail(emailValid)) {
      checkEmail.innerHTML = "<i class='fas fa-check-circle form'></i>";
    } else {
      checkEmail.innerHTML = "<i class='fas fa-times-circle form'></i>";
    }
    let products = [];
    for (r = 0; r < products.length; r++) {
      product.push(products[r]._id);
    }
    const envoiFormulaire = {
      contact,
      products,
    };

    //Envoi du formulaire dans le localStorage uniquement si les données sont correctes
    if (controlPrenomNomVille(firstNameValid) & controlPrenomNomVille(lastNameValid) & controlPrenomNomVille(cityValid) & controlAdresse(addressValid) & controlEmail(emailValid)) {
      localStorage.setItem("contact", JSON.stringify(contact));
      const apiConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(envoiFormulaire),
      };
      // Données à envoyer aux serveur via la méthode POST si le formulaire est bien remplit afin de renvoyer un ID de commande
      return fetch("http://localhost:3000/api/products/order", apiConfig)
        .then((response) => response.json())
        .then((order) => {
          console.log(order);
          localStorage.setItem("orderId", order.orderId);
          window.location.href = "confirmation.html";
        })
        .catch((err) => console.log("Il y a un problème: ", err));
    } else {
      alert("Merci de vérifier vos données dans le formulaire");
    }
  });
}

/* --------------------------------------FUNCTIONS -------------------------------------------*/

// Supprimer un article du panier quand on clique sur "supprimer", mise à jour du LocalStorage et disparition de l'article dans le HTML
function deleteItemsDelete() {
  const trash = document.querySelectorAll(".deleteItem");
  for (r = 0; r < trash.length; r++) {
    let suppressionById = products[r]._id;
    trash[r].addEventListener("click", (event) => {
      event.preventDefault();
      products = products.filter((products) => products._id !== suppressionById);
      localStorage.setItem("products", JSON.stringify(products));
      alert("Votre panier sera vidé");
      window.location.href = "cart.html";
    });
  }
}

function deleteAllItems() {
  const trashAll = document.querySelector(".cart__itemsDelete");
  trashAll.addEventListener("click", (action) => {
    event.preventDefault();
    localStorage.removeItem("products", JSON.stringify(products));
    window.location.href = "cart.html";
  });
}

function deleteItemsMinus() {
  const minusTrash = document.querySelectorAll(".cart__item__content__settings__quantity__icons__minus");
  for (r = 0; r < minusTrash.length; r++) {
    let suppressionById = products[r]._id;
    minusTrash[r].addEventListener("click", (event) => {
      event.preventDefault();
      products = products.filter((products) => products._id !== suppressionById);
      localStorage.setItem("products", JSON.stringify(products));
      alert("Votre panier sera vidé");
      window.location.href = "cart.html";
    });
  }
}

// Test de l'ajout de quantité sans le localStorage pour voir si ça fonctionne
// Résultat : test concluant
function adjustQuantity() {
  let a = 0;
  let updateQuantité = parseInt(products[a].quantity);
  let updatePrice = parseInt(products[a].unitPrice);
  updateProducts = products;
  function plusQuantité() {
    const plus = document.querySelectorAll(".cart__item__content__settings__quantity__icons__plus");
    console.log(plus);
    console.log(updatePrice);
    plus[a].addEventListener("click", (action) => {
      event.preventDefault();
      console.log(updateProducts);
      updateProducts[a].quantity = updateQuantité + 1;
      updateProducts[a].price = updatePrice * updateProducts[a].quantity;
      console.log(updateProducts[a].quantity);
      console.log(updateProducts[a].price);
      localStorage.setItem("products", JSON.stringify(products));
      window.location.href = "cart.html";
    });
  }
  plusQuantité();
  function minusQuantité() {
    const minus = document.querySelector(".cart__item__content__settings__quantity__icons__minus");
    if (products[a].quantity > 1) {
      minus.addEventListener("click", (action) => {
        updateProducts[a].quantity = updateQuantité - 1;
        updateProducts[a].price = updatePrice * updateProducts[a].quantity;
        localStorage.setItem("products", JSON.stringify(products));
        window.location.href = "cart.html";
      });
    } else {
      deleteItemsMinus();
    }
  }
  minusQuantité();
}

// Addition du total des produits présents dans le panier
function totalCart() {
  let totalPricePanier = [];
  for (t = 0; t < products.length; t++) {
    const totalProducts = products[t].price;
    totalPricePanier.push(totalProducts);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPanier.innerHTML = totalPricePanier.reduce(reducer, 0);
  }
}
