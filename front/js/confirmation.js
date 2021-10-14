let products = JSON.parse(localStorage.getItem("products"));

// Injection de l'orderId dans le HTML, récupéré depuis le storage lors de la confirmation de commande
function getOrderId() {
  const idLocation = document.querySelector("#orderId");
  orderId = localStorage.getItem("orderId");
  idLocation.textContent = orderId;
}
getOrderId();

// Suppression des données du localStorage une fois que la page de validation de commande est réalisée
// Permet de ne pas garder les données enregistrer pour une prochaine commande: remise à 0
localStorage.clear();
