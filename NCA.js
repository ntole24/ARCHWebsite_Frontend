function createCarousel(containerId, data) {
  const container = document.getElementById(containerId);
  let index = 0;
  const visibleCount = 3;

  const prevBtn = document.createElement("button");
  prevBtn.className = "carousel__button carousel__button--prev";
  prevBtn.textContent = "‹";

  const nextBtn = document.createElement("button");
  nextBtn.className = "carousel__button carousel__button--next";
  nextBtn.textContent = "›";

  const itemsWrapper = document.createElement("div");
  itemsWrapper.className = "carousel__items";

  function renderItems() {
    itemsWrapper.innerHTML = "";
    const visibleItems = data.slice(index, index + visibleCount);

    visibleItems.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "carousel__item";
      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <p class="carousel__caption">${item.title}</p>
      `;
      itemsWrapper.appendChild(itemDiv);
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index + visibleCount >= data.length;
  }

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      renderItems();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (index + visibleCount < data.length) {
      index++;
      renderItems();
    }
  });

  renderItems();

  container.appendChild(prevBtn);
  container.appendChild(itemsWrapper);
  container.appendChild(nextBtn);
}

// Sample data with local images
const reportsData = [
  { title: "Report 1 - Aug 2024", img: "images/report1.jpg" },
  { title: "Report 2 - Sep 2024", img: "images/report2.jpg" },
  { title: "Report 3 - Oct 2024", img: "images/report3.jpg" },
  { title: "Report 4 - Nov 2024", img: "images/report4.jpg" }
];

const searchlightData = [
  { title: "seARCHLight Ep. 1", img: "images/search1.jpg" },
  { title: "seARCHLight Ep. 2", img: "images/search2.jpg" },
  { title: "seARCHLight Ep. 3", img: "images/search3.jpg" }
];

const podiumData = [
  { title: "Podium Ep. 1", img: "images/podium1.jpg" },
  { title: "Podium Ep. 2", img: "images/podium2.jpg" },
  { title: "Podium Ep. 3", img: "images/podium3.jpg" }
];

const photoData = [
  { title: "Photo Coverage 1", img: "images/photo1.jpg" },
  { title: "Photo Coverage 2", img: "images/photo2.jpg" },
  { title: "Photo Coverage 3", img: "images/photo3.jpg" },
  { title: "Photo Coverage 4", img: "images/photo4.jpg" }
];

// Build carousels
createCarousel("reports-carousel", reportsData);
createCarousel("searchlight-carousel", searchlightData);
createCarousel("podium-carousel", podiumData);
createCarousel("photo-carousel", photoData);
