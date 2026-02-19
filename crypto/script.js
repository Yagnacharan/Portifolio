const grid = document.getElementById("grid");
const search = document.getElementById("search");

let coins = [];

async function fetchCrypto(){
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
  );
  coins = await res.json();
  render(coins);
}

function render(data){
  grid.innerHTML="";
  data.forEach(c=>{
    const div = document.createElement("div");
    div.className="card";

    const change = c.price_change_percentage_24h.toFixed(2);

    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>$${c.current_price}</p>
      <p class="${change>=0?'up':'down'}">
        ${change}%
      </p>
    `;

    grid.appendChild(div);
  });
}

search.addEventListener("input",()=>{
  const v = search.value.toLowerCase();
  render(coins.filter(c=>c.name.toLowerCase().includes(v)));
});

fetchCrypto();
setInterval(fetchCrypto,30000);
