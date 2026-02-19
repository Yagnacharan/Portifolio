async function getProfile() {
  const username = document.getElementById("username").value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) return;

  profileDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
  headers: {
    "Accept": "application/vnd.github+json"
  }
});
 
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();

    profileDiv.innerHTML = `
      <div class="card">
        <img src="${data.avatar_url}">
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || "No bio available"}</p>

        <div class="stats">
          <div>Repos<br><b>${data.public_repos}</b></div>
          <div>Followers<br><b>${data.followers}</b></div>
          <div>Following<br><b>${data.following}</b></div>
        </div>
      </div>
    `;

  } catch (err) {
    profileDiv.innerHTML = `<p style="color:#f87171;">User not found ❌</p>`;
  }
}
