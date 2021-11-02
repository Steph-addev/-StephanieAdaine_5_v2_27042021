// Fonction pour récupérer l'order ID dans la barre d'adresse pour le réinjecter dans le HTML de la page de confirmation
function getOrderId() {
  const idLocation = document.querySelector("#orderId");
  const recupUrl = window.location.search;
  const recupOderId = new URLSearchParams(recupUrl);
  const orderIdInUrl = recupOderId.get("name");
  idLocation.textContent = orderIdInUrl;
}
getOrderId();
