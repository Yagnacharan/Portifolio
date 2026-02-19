const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();

  text.value = '';
  amount.value = '';
}

function renderTransactions() {
  list.innerHTML = '';

  transactions.forEach(t => {
    const sign = t.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(t.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
      ${t.text}
      <span>${sign}₹${Math.abs(t.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${t.id})">x</button>
    `;

    list.appendChild(item);
  });

  updateValues();
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((a,b)=>a+b,0).toFixed(2);
  const inc = amounts.filter(a=>a>0).reduce((a,b)=>a+b,0).toFixed(2);
  const exp = (
    amounts.filter(a=>a<0).reduce((a,b)=>a+b,0) * -1
  ).toFixed(2);

  balance.innerText = `₹${total}`;
  income.innerText = `₹${inc}`;
  expense.innerText = `₹${exp}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction);
renderTransactions();
