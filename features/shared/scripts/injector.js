/**
 * Dynamically injects shared HTML components (and their optional CSS/JS files)
 * into the current page based on `<div id="...">` placeholders.
 *
 * Each component is represented by a folder whose name matches the <div> ID.
 * If a matching folder is found under the specified base path, the injector:
 *   1. Loads `{id}.html` and injects it into the corresponding <div>.
 *   2. Optionally loads `{id}.css` into <head> if the file exists.
 *   3. Optionally loads `{id}.js` into <body> if the file exists.
 *
 * This pattern reduces repetitive boilerplate for shared UI parts
 * (e.g., headers, footers, navbars) across multiple pages.
 *
 * @param {string} [basePath="../components"]
 *        The relative path from this script to the shared components' directory.
 * @returns {Promise<void>}
 *        Resolves when all components have been loaded and injected.
 */
async function loadComponents(basePath = "../shared/components") {
    const elements = document.querySelectorAll("div[id]");

    for (const el of elements) {
        const id = el.id;
        const folderPath = `${basePath}/${id}`;
        const htmlPath = `${folderPath}/${id}.html`;
        const cssPath = `${folderPath}/${id}.css`;
        const jsPath = `${folderPath}/${id}.js`;

        try {
            const htmlResponse = await fetch(htmlPath);
            if (!htmlResponse.ok) {
                console.warn(`Missing HTML for component: ${id}`);
                continue;
            }

            el.innerHTML = await htmlResponse.text();

            const cssResponse = await fetch(cssPath);
            if (cssResponse.ok && !document.querySelector(`link[href="${cssPath}"]`)) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = cssPath;
                document.head.appendChild(link);
                console.log(`Loaded CSS for ${id}`);
            }

            const jsResponse = await fetch(jsPath);
            if (jsResponse.ok && !document.querySelector(`script[src="${jsPath}"]`)) {
                const script = document.createElement("script");
                script.src = jsPath;

                script.onload = () => {
                    const initFunctionName = `init_${id}`;

                    if (typeof window[initFunctionName] === "function") {
                        window[initFunctionName]();
                    }
                };

                document.body.appendChild(script);
                console.log(`Loaded JS for ${id}`);
            }

            console.log(`Loaded component: ${id}`);
        } catch (err) {
            console.error(`Failed to load component: ${id}`, err);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => loadComponents());
