// Function to toggle responsive navigation
function toggleNavigation() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Add event listener for button click

let inputText = document.getElementById("myTxtInput");

// Async function to fetch data
async function fetchAsync(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    alert("Failed to fetch news. Please try again later.");
  }
}

// Function to display news articles
// Modal functionality
const modal = document.getElementById("myModal");
const closeBtn = modal.querySelector(".close");
const modalBody = modal.querySelector(".modal-body");

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Fetch news and display in the modal
async function fetchNews() {
  const inputText = document.getElementById("myTxtInput").value.trim();

  if (!inputText) {
    alert("Please enter a topic name.");
    return;
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    inputText
  )}&country=ca&max=10&token=96e20d8a142eb676d6804f79a9d6d9ba`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      alert("No news found for the given topic.");
      return;
    }

    displayNews(data.articles);
    modal.style.display = "block";
  } catch (error) {
    console.error("Error fetching news:", error);
    alert("Failed to fetch news. Please try again later.");
  }
}

// Display news in modal
function displayNews(articles) {
  modalBody.innerHTML = ""; // Clear previous content

  articles.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.className = "news-article";

    articleDiv.innerHTML = `
  <h3>${article.title}</h3>
  <img src="${article.image || "placeholder.jpg"}" alt="${
      article.title
    }" style="width: 60%; max-height: 200px; object-fit: cover; display: block; margin: 10px auto;">
  <p>${article.description || "Description not available."}</p>
`;

    modalBody.appendChild(articleDiv);
  });
}

// Add event listener to the button
document.querySelector(".myBtn").addEventListener("click", fetchNews);
