// Récupération API des meubles et affichage des éléments
(async function () {
  const articles = await appearanceArticles();

  for (article of articles) {
    displayArticles(article);
  }
})();

/* ------------------------------------------------------------------------------FUNCTIONS ----------------------------------------------------------------------------------*/

// Récupération des produits de l'API avec la methode fetch GET
function appearanceArticles() {
  return fetch("http://localhost:3000/api/products")
    .then(function (results) {
      return results.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (erreur) {
      alert("Il y a une erreur de chargement. Merci de vous assurer que le port 3000 est bien activé puis d'actualiser la page");
    });
}

// Injection du code dans le HTML
function displayArticles(article) {
  const infoArticles = document.getElementById("template");
  const duplicateArticles = document.importNode(infoArticles.content, true);

  duplicateArticles.querySelector(".productId").setAttribute("href", "product.html" + "?" + "id=" + article._id);
  duplicateArticles.querySelector(".productImage").setAttribute("src", article.imageUrl);
  duplicateArticles.querySelector(".productImage").setAttribute("alt", article.altTxt);
  duplicateArticles.querySelector(".productName").textContent = article.name;
  duplicateArticles.querySelector(".productDescription").textContent = article.description;

  document.querySelector("#items").appendChild(duplicateArticles);
}
