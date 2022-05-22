const input = document.querySelector(".search");
const btn = document.querySelector(".search_btn");
const searchResults = document.querySelector(".search_box");

const endpoint = "https://en.wikipedia.org/w/api.php?";
const params = {
  origin: "*",
  format: "json",
  action: "query",
  prop: "extracts|pageimages",
  piprop: "original",
  exchars: 350,
  exintro: true,
  explaintext: true,
  generator: "search",
  gsrlimit: 20,
};

const clearResults = () => {
  searchResults.innerHTML = "";
};

const showResults = (results) => {
  results.forEach((result) => {
    searchResults.innerHTML += `
    <div class="search_results">
    <div class="search_results-title"><h2>${result.title}</h2></div>
    <div class="search_results-description"><p>${result.intro}</p></div>
    <div class="search_results-btn"><a href="https://en.wikipedia.org/?curid=${result.pageId}">Read more</a></div>
    </div>
    `;
  });
};

const gatherData = (pages) => {
  const results = Object.values(pages).map((page) => ({
    pageId: page.pageid,
    title: page.title,
    intro: page.extract,
  }));

  showResults(results);
};

const getData = async () => {
  const inputV = input.value;

  params.gsrsearch = inputV;
  clearResults();
  const { data } = await axios.get(endpoint, { params });

  console.log(data);
  gatherData(data.query.pages);
};

const keyEvent = (e) => {
  if (e.key === "Enter") {
    getData();
  }
};

const registerEventHandlers = () => {
  input.addEventListener("keydown", keyEvent);
  btn.addEventListener("click", getData);
};

registerEventHandlers();


