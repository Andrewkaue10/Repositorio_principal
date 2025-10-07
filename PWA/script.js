const btnLocation = document.getElementById("getLocation");
const info = document.getElementById("info");

btnLocation.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    info.innerHTML = "<p> Seu navegador não suporta geolocalização.</p>";
  }
});

async function showPosition(position) {
  try {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const geoData = await geoRes.json();

    if (!geoData.address || !geoData.address.country) {
      info.innerHTML = "<p> Não consegui identificar o país.</p>";
      return;
    }

    const country = geoData.address.country;
    const countryRes = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const countryData = await countryRes.json();

    const c = countryData[0];
    info.innerHTML = `
      <h2>${c.name.common} ${c.flag || "🏳️"}</h2>
      <p><b>Capital:</b> ${c.capital ? c.capital[0] : "Não disponível"}</p>
      <p><b>População:</b> ${c.population.toLocaleString()}</p>
      <p><b>Continente:</b> ${c.region}</p>
      <img src="${c.flags.svg}" width="120">
    `;
  } catch (err) {
    console.error(err);
    info.innerHTML = "<p> Erro ao buscar os dados.</p>";
  }
}

function showError(error) {
  info.innerHTML = "<p> Erro: " + error.message + "</p>";
}

/* ==== CÂMERA ==== */
const btnCamera = document.getElementById("openCamera");
const btnPhoto = document.getElementById("takePhoto");
const video = document.getElementById("camera");
const canvas = document.getElementById("snapshot");
let stream;

btnCamera.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    btnPhoto.style.display = "inline-block";
  } catch (err) {
    alert(" Erro ao acessar a câmera: " + err);
  }
});

btnPhoto.addEventListener("click", () => {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
});
