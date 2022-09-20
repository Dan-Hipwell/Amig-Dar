const navLinks = [
    {'label': "Adventurers", 'href': "PC.html"},
    {'label': "Denizens", 'href': "NPC.html"},
    {'label': "Lore", 'href': "Lore.html"},
]

/* 
Function to populate a standard header
*/
function populateHeader(header) {
    // Add world image
    let globe = document.createElement("img");
    globe.id = "worldimage";
    globe.src = "images/Amig'dar basic concept colour.png";
    globe.alt = "The world of Amig'Dar";
    header.appendChild(globe);
    // Add titles
    let title1 = document.createElement("h1");
    title1.textContent = "The world of Amig'Dar";
    header.appendChild(title1)
    let title2 = document.createElement("h2");
    title2.id = "subheading";
    title2.textContent = "A wiki-page for all your adventuring needs";
    header.appendChild(title1)
    // Add nav bar
    let nav = document.createElement("nav");
    nav.id = "header-nav-menu";
    for (let item of navLinks) {
        // Create each link
        let obj = document.createElement("a");
        obj.className = "main-nav-menu";
        obj.textContent = item['label'];
        obj.href = item['href'];
        nav.appendChild(obj);
    }
    header.appendChild(nav);
}

/*
Function to populate footer
*/
function populateFooter(footer) {
    // Add authorship to Dan
    let authorship = document.createElement("p");
    let preface1 = document.createElement("span")
    preface1.textContent = "Created by "
    authorship.appendChild(preface1);
    let link1 = document.createElement("a");
    link1.href = "https://github.com/Dan-Hipwell";
    link1.textContent = "Dan Hipwell"
    authorship.appendChild(link1);
    footer.appendChild(authorship);
    // Add credit for bg image
    let bgCredit = document.createElement("p");
    let preface2 = document.createElement("span");
    preface2.textContent = "Background: ";
    bgCredit.appendChild(preface2);
    let link2 = document.createElement("a");
    link2.href = "https://swordartonline.fandom.com/wiki/Aincrad";
    link2.textContent = "Aincrad";
    bgCredit.appendChild(link2);
    let postface2 = document.createElement("span");
    postface2.textContent = " from Sword Art Online"
    bgCredit.appendChild(postface2);
    footer.appendChild(bgCredit)
}

/*
Master function calling all other populate functions
*/
function populateAll() {
    // Populate header
    populateHeader(document.getElementById("home-page-header"));
    populateFooter(document.getElementById("home-page-footer"));
    
}

// Bind to window load event
window.onload = populateAll
