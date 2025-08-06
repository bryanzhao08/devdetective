const url = "https://api.github.com/users/";
const input = document.getElementById("input");
const button = document.getElementById("submit");
const noResults = document.getElementById("no-results");

button.addEventListener("click", () => {
  const username = input.value.trim();
  if (!username) return;

  fetch(url + username)
    .then(res => {
      if (!res.ok) {
        throw new Error("User not found");
      }
      return res.json();
    })
    .then(data => {
      noResults.style.display = "none";
      updateProfile(data);
    })
    .catch(err => {
      console.error(err);
      noResults.style.display = "block";
    });
});

function updateProfile(data) {
  document.getElementById("avatar").src = data.avatar_url || "";
  document.getElementById("name").innerText = data.name || data.login || "Unknown User";
  document.getElementById("user").innerText = `@${data.login}`;
  document.getElementById("user").href = data.html_url || "#";
  document.getElementById("date").innerText = `Joined: ${new Date(data.created_at).toDateString()}`;
  document.getElementById("bio").innerText = data.bio || "No bio available.";
  document.getElementById("repos").innerText = data.public_repos ?? "0";
  document.getElementById("followers").innerText = data.followers ?? "0";
  document.getElementById("following").innerText = data.following ?? "0";
  document.getElementById("location").innerText = data.location || "Not available";
  document.getElementById("page").innerText = data.blog || "Not available";
  document.getElementById("page").href = data.blog || "#";
  document.getElementById("twitter").innerText = data.twitter_username || "Not available";
  document.getElementById("twitter").href = data.twitter_username
    ? `https://twitter.com/${data.twitter_username}`
    : "#";
  document.getElementById("company").innerText = data.company || "Not available";
}

// Dark Mode Toggle
const modeBtn = document.getElementById("btn-mode");
const modeText = document.getElementById("mode-text");

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  modeText.innerText = isDark ? "LIGHT" : "DARK";
});
