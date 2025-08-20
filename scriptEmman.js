function createCarousel(containerId, data, isPhoto = false) {
      const container = document.getElementById(containerId);
      let index = 0;
      const visibleCount = 4;

      const featured = document.createElement("div");
      featured.className = "featured";
      if (!isPhoto) {
        featured.innerHTML = `<h3>${data[0].title}</h3><p>${data[0].date}</p>`;
      }

      const carousel = document.createElement("div");
      carousel.className = "carousel";

      const prev = document.createElement("button");
      prev.textContent = "‹";
      const next = document.createElement("button");
      next.textContent = "›";

      const itemsWrapper = document.createElement("div");
      itemsWrapper.className = "carousel-items";

      function renderItems() {
        itemsWrapper.innerHTML = "";
        const visibleItems = data.slice(index, index + visibleCount);
        visibleItems.forEach(item => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "carousel-item";
          itemDiv.innerHTML = `<strong>${item.title}</strong>${item.date ? `<p>${item.date}</p>` : ""}`;
          itemsWrapper.appendChild(itemDiv);
        });

        if (!isPhoto && data[index]) {
          featured.innerHTML = `<h3>${data[index].title}</h3><p>${data[index].date}</p>`;
        }

        prev.disabled = index === 0;
        next.disabled = index + visibleCount >= data.length;
      }

      prev.onclick = () => {
        if (index > 0) {
          index--;
          renderItems();
        }
      };

      next.onclick = () => {
        if (index + visibleCount < data.length) {
          index++;
          renderItems();
        }
      };

      renderItems();
      if (!isPhoto) container.appendChild(featured);
      carousel.appendChild(prev);
      carousel.appendChild(itemsWrapper);
      carousel.appendChild(next);
      container.appendChild(carousel);
    }

    const videoData = [
      { title: "Video Title", date: "January 1, 2025" },
      { title: "Video Title", date: "January 2, 2025" },
      { title: "Video Title", date: "January 3, 2025" },
      { title: "Video Title", date: "January 4, 2025" },
      { title: "Video Title", date: "January 5, 2025" },
    ];

    const photoAlbums = [
      { title: "Album 1" },
      { title: "Album 2" },
      { title: "Album 3" },
      { title: "Album 4" },
      { title: "Album 5" },
    ];

    createCarousel("videoSection", videoData);
    createCarousel("livestreamSection", videoData);
    createCarousel("photoSection", photoAlbums, true);