const $ = document;

const userName = $.querySelector(".nav__user-name");
const token = localStorage.getItem("token");
let userID = null;
let noteBook = null;
let bag = null;
let autograph = null;
let stationery = null;
let allProduct = null;

const gettingProduct = async () => {
  await fetch("http://localhost/task-4/asset/data/product.json")
    .then((res) => res.json())
    .then((data) => {
      noteBook = data.noteBook;
      bag = data.bag;
      autograph = data.autograph;
      stationery = data.stationery;
      allProduct=[...noteBook,...bag,...autograph,...stationery]
      console.log(allProduct)
    });
};

const gettingUserData = () => {
  fetch("http://localhost/task-4/get-api.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let mainUser = data.filter((user) => user.token === token);
      userName.innerHTML = mainUser[0].firstname + " " + mainUser[0].lastname;
      userID = mainUser[0].id;
    });
};

const gettingCartData = () => {
  fetch("http://localhost/task-4/cart-api.php")
  .then(res=>res.json())
  .then(data=>{
    
  })
};

const initAllFunc = () => {
  gettingUserData();
  gettingCartData();
  gettingProduct();
};
window.addEventListener("load", initAllFunc);
