document.addEventListener("DOMContentLoaded", () => {
  let allProperties = [];
  let filteredProperties = [];
  let currentPage = 1;
  let visibleItems = 5;
  const itemsPerPage = 10;

  fetch("/prythian-real-estate/data/properties.json")
    .then((response) => response.json())
    .then((data) => {
      allProperties = data.houses;
      filteredProperties = allProperties;
      renderPage(currentPage);
      renderPaginationControls();
    })
    .catch((error) => console.error("Error loading properties:", error));

  document
    .querySelector("input[type='search']")
    .addEventListener("input", (event) => {
      filterPropertiesBySearch(event.target.value);
    });

  document.getElementById("apply-filters").addEventListener("click", () => {
    filterAndSortProperties();
  });

  document.getElementById("show-more").addEventListener("click", () => {
    visibleItems = Math.min(visibleItems + 5, 10);
    renderPage(currentPage);
  });

  function renderPage(page) {
    const container = document.getElementById("properties-container");
    container.innerHTML = "";

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = filteredProperties.slice(start, end);

    let itemsToShow = paginatedItems.slice(0, visibleItems);

    itemsToShow.forEach((property) => {
      const card = document.createElement("div");
      card.classList.add("property-card");

      card.innerHTML = `
        <img src="${
          property.image
        }" alt="Property Image" class="property-image"/>
        <div class="property-info">
          <h3>${property.location}</h3>
          <p><b>Size</b> &#128900; ${property.size} m²</p>
          <p><b>Price</b> &#128900; ${property.price.toLocaleString()} €</p>
          <p><b>Amenities</b> &#128900; ${property.amenities.join(", ")}</p>
        </div>
      `;
      container.appendChild(card);
    });

    if (visibleItems < paginatedItems.length) {
      document.getElementById("show-more").style.display = "block";
    } else {
      document.getElementById("show-more").style.display = "none";
    }
  }

  function renderPaginationControls() {
    const paginationControls = document.getElementById("pagination-controls");
    paginationControls.innerHTML = "";
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.disabled = currentPage === 1;

    prevButton.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        visibleItems = 5;
        renderPage(currentPage);
        renderPaginationControls();
      }
    };

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;

    nextButton.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        visibleItems = 5;
        renderPage(currentPage);
        renderPaginationControls();
      }
    };

    paginationControls.appendChild(prevButton);
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("page-button");

      if (i === currentPage) pageButton.classList.add("active");
      pageButton.onclick = () => {
        currentPage = i;
        visibleItems = 5;
        renderPage(currentPage);
        renderPaginationControls();
      };
      paginationControls.appendChild(pageButton);
    }
    paginationControls.appendChild(nextButton);
  }

  function filterAndSortProperties() {
    filteredProperties = [...allProperties];

    const minSize = document.getElementById("size").value;
    const maxPrice = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const amenities = document.getElementById("amenities").value.toLowerCase();
    const sortType = document.getElementById("sort").value;

    if (minSize) {
      filteredProperties = filteredProperties.filter(
        (p) => parseInt(p.size) >= parseInt(minSize)
      );
    }
    if (maxPrice) {
      filteredProperties = filteredProperties.filter(
        (p) => p.price <= parseInt(maxPrice)
      );
    }
    if (location) {
      filteredProperties = filteredProperties.filter(
        (p) => p.location === location
      );
    }
    if (amenities) {
      const amenityList = amenities.split(",").map((a) => a.trim());
      filteredProperties = filteredProperties.filter((p) =>
        amenityList.every((a) =>
          p.amenities.map((am) => am.toLowerCase()).includes(a)
        )
      );
    }

    if (sortType === "asc") {
      filteredProperties.sort((a, b) => a.price - b.price);
    } else if (sortType === "desc") {
      filteredProperties.sort((a, b) => b.price - a.price);
    }

    currentPage = 1;
    renderPage(currentPage);
    renderPaginationControls();
  }

  function filterPropertiesBySearch(query) {
    filteredProperties = allProperties.filter((property) => {
      return (
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.size.toString().includes(query) ||
        property.price.toString().includes(query) ||
        property.amenities.some((amenity) =>
          amenity.toLowerCase().includes(query.toLowerCase())
        )
      );
    });

    currentPage = 1;
    renderPage(currentPage);
    renderPaginationControls();
  }
});
