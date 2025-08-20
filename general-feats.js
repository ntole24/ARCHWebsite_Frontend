const dropdown = document.getElementById("channels-dropdown");
const submenu = document.getElementById("channels-nav");

dropdown.addEventListener("mouseenter", () => {
    submenu.classList.add("show");
});

dropdown.addEventListener("mouseleave", () => {
    submenu.classList.remove("show");
});
