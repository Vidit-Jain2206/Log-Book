let items = [];
const addBtn = document.getElementById("add");
const subsBtn = document.getElementById("substract");
const clearBtn = document.getElementById("clear");
const table = document.getElementById("table-body");
const itemsLocalStorage = JSON.parse(localStorage.getItem("items"));
const bal = document.getElementById("balance");
// let balance=0;
let action = "";

if (itemsLocalStorage) {
  items = itemsLocalStorage;
  render(items);
}

function render(item) {
  let balance = 0;
  let listItems = "";
  for (let index = 0; index < item.length; index++) {
    if (item[index].action === "Credited") {
      let prevBalance = parseInt(balance, 10);
      let enterAmount = parseInt(items[index].amo, 10);
      balance = prevBalance + enterAmount;
    }
    if (item[index].action === "Debited") {
      let prevBalance = parseInt(balance, 10);
      let enterAmount = parseInt(items[index].amo, 10);
      balance = prevBalance - enterAmount;
    }
    listItems += `
      <tr>
      <th> ${index + 1}
      <td> ${item[index].tit}
      <td> ${item[index].amo}
      <td> ${item[index].da}
      <td> ${item[index].action}
      </tr>
      `;
  }
  table.innerHTML = listItems;
  bal.textContent = "Balance: " + balance;
}

function addAmount() {
  let title = document.getElementById("title");
  let amount = document.getElementById("amount");
  let date = document.getElementById("date");
  let tit = title.value;
  let amo = amount.value;
  let da = date.value;
  action = "Credited";
  // let prevBalance=parseInt(balance,10);
  // let enterAmount=parseInt(amo,10);
  // balance=prevBalance+enterAmount;
  items.push({ tit, amo, da, action });
  title.value = "";
  amount.value = "";
  date.value = "";
  localStorage.setItem("items", JSON.stringify(items));
  render(items);
}

function subsAmount() {
  let title = document.getElementById("title");
  let amount = document.getElementById("amount");
  let date = document.getElementById("date");
  let tit = title.value;
  let amo = amount.value;
  let da = date.value;
  action = "Debited";
  // let prevBalance=parseInt(balance,10);
  // let enterAmount=parseInt(amo,10);
  // balance = prevBalance - enterAmount;
  items.push({ tit, amo, da, action });
  title.value = "";
  amount.value = "";
  date.value = "";
  localStorage.setItem("items", JSON.stringify(items));
  render(items);
}

function clearAmount() {
  if (confirm("Do you want to clear Transactionss")) {
    localStorage.clear();
    items = [];
    // balance=0;
    render(items);
  }
}
