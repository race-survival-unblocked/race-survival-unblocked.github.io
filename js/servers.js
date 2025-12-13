document.addEventListener('DOMContentLoaded', () => {
  const serverBox = document.getElementById('serverBox');
  const url = "https://raw.githubusercontent.com/15serge/geo11cdn964128468129/refs/heads/main/jklhaserbo8iguhbqw08934uhrg9-uqher9-guhqw-9ugh.json";

  async function loadServers() {
    serverBox.innerHTML = 'Loading servers…';
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Network response was not OK: ' + res.status);
      const data = await res.json();

      // Accept either a single object or an array of objects
      const servers = Array.isArray(data) ? data : [data];

      // Clear container
      serverBox.innerHTML = '';

      if (servers.length === 0) {
        serverBox.textContent = 'No servers found.';
        return;
      }

      servers.forEach(server => {
        const card = createServerCard(server);
        serverBox.appendChild(card);
      });
    } catch (err) {
      console.error('Failed to load servers:', err);
      serverBox.innerHTML = `<div class="error">Failed to load servers: ${escapeHtml(err.message)}</div>`;
    }
  }

  function createServerCard(server) {
    const div = document.createElement('div');
    div.className = 'server-item';

    // Title
    const title = document.createElement('h3');
    title.textContent = server.title ?? 'Untitled server';
    title.style="display: inline-block; margin-top: 7px;";
    div.appendChild(title);

    // URL
    if (server.URL) {
      const link = document.createElement('a');
      link.href = server.URL;
      link.textContent = server.URL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className="server-link";

      // optional: open button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.marginLeft = '10px';
      btn.textContent = 'Open';
      btn.onclick = () => window.open(server.URL, '_blank', 'noopener');
      btn.className="server-btn";
      div.appendChild(btn);
      div.appendChild(link);
    } else if (server.url) { // handle lowercase key
      const link = document.createElement('a');
      link.href = server.url;
      link.textContent = server.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      div.appendChild(link);
    } else {
      const note = document.createElement('div');
      note.textContent = 'No URL provided';
      div.appendChild(note);
    }

    return div;
  }

  // small helper to avoid injecting raw error text as HTML
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // run loader
  loadServers();
});