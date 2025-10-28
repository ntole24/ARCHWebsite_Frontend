function init_header() {
    const pathParts = window.location.pathname.split("/");
    const featuresIndex = pathParts.indexOf("features");
    const currentPage = featuresIndex !== -1 ? pathParts[featuresIndex + 1] : "home";

    console.log(currentPage);

    const links = document.querySelectorAll(".header .header-link");
    let matched = false;

    links.forEach(link => {
        const name = link.dataset.name;

        const isActive = name === currentPage;
        link.classList.toggle("active", isActive);
        if (isActive) matched = true;
    });

    if (!matched) {
        const homeLink = document.querySelector('.header .header-link[data-name="home"]');
        if (homeLink) homeLink.classList.add("active");
    }
}