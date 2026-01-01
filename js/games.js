let games = [];

const gamesPromise = fetch("/js/games.json")
  .then(res => res.json())
  .then(data => {
    games = data;
  })
  .catch(err => {
    console.error("fetch err", err);
  });

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getGameCategories(g) {
  const raw = g.Categories ?? g.categories ?? g.genre ?? g.genres ?? null;

  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map(x => String(x).trim().toLowerCase());
  }

  if (typeof raw === "string") {
    return raw.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  }

  return [String(raw).toLowerCase()];
}

function gameMatchesGenre(g, genreStr) {
  if (!genreStr) return false;
  const z = genreStr.toLowerCase();
  const x = getGameCategories(g);
  return x.includes(z);
}

function loadGames(list, divid) {
  const container = document.getElementById(divid);
  if (!container) {
    console.warn("container not found:", divid);
    return;
  }
  container.innerHTML = "";

  let finalList;

  if (list === "all") {
    finalList = games;
  }
  else if (list === "random") {
    finalList = getRandomItems(games, 6);
  }
  else if (typeof list === "string") {
    finalList = games.filter(g => gameMatchesGenre(g, list));
  }
  else if (Array.isArray(list)) {
    finalList = list;
  }
  else {
    finalList = [];
  }
  if (!finalList || finalList.length === 0) {
    const msg = document.createElement("div");
    msg.className = "no-results";
    msg.textContent = "No games found.";
    container.appendChild(msg);
    return;
  }

  const sorted = [...finalList].sort((a, b) =>
    (a.title || "").localeCompare(b.title || "")
  );

  const frag = document.createDocumentFragment();

  sorted.forEach(g => {
    const div = document.createElement("div");
    div.className = "game";

    const img = document.createElement("img");
    img.src = g.image;
    img.alt = g.title || "game";

    div.appendChild(img);

    div.onclick = () => {
      
      const e = (g.title || "").replace(/\s+/g, "-").replace(/:/g, "");
      const ee = e.replace('---', '-');
      window.location.href = `/g/${ee}.html`;
    };

    frag.appendChild(div);
  });

  container.appendChild(frag);
}
