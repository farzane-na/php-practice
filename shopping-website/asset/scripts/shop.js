const $ = document;
let noteBook = null;
let autograph = null;
let bag = null;
let stationery = null;
const LocToken = localStorage.getItem("token");
let userID = null;
let cart = [];

const noteBookSection = $.querySelector(".note-book__wrapper");
const autographSection = $.querySelector(".autograph__wrapper");
const bagSection = $.querySelector(".bag__wrapper");
const stationerySection = $.querySelector(".stationery__wrapper");
const userName = $.querySelector(".nav__user-name");

const gettingUserData = async () => {
  await fetch("http://localhost/task-4/get-api.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(LocToken);

      let mainUser = data.filter((user) => user.token === LocToken);
      console.log(mainUser[0].firstname);
      userID = mainUser[0].id;
      userName.innerHTML = mainUser[0].firstname + " " + mainUser[0].lastname;
    });
};

const addToCart = (productID) => {
  let newProduct = {
    productID: productID,
    userID: userID,
    count: 1,
  };
  let checkExistProduct = cart.find(
    (item) => item.userID === userID && item.productID === productID
  );

  if (checkExistProduct) {
    let updateProduct = {
      productID: productID,
      userID: userID,
      count: checkExistProduct.count + 1,
    };
    fetch("http://localhost/task-4/add-cart-api.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } else {
    fetch("http://localhost/task-4/add-cart-api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
};

const fillNoteBookSection = () => {
  noteBookSection.innerHTML = "";
  noteBook.forEach((item) => {
    let newNoteBookTemplate = `
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn" onclick='addToCart(${item.id})'>Buy Now</button>
                </div>
            </article>
        `;
    noteBookSection.insertAdjacentHTML("beforeend", newNoteBookTemplate);
  });
};
const fillAutographSection = () => {
  autographSection.innerHTML = "";
  autograph.forEach((item) => {
    let newAutoGraphTemplate = `
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn" onclick='addToCart(${item.id})'>Buy Now</button>
                </div>
            </article>
        `;
    autographSection.insertAdjacentHTML("beforeend", newAutoGraphTemplate);
  });
};
const fillBagSection = () => {
  bagSection.innerHTML = "";
  bag.forEach((item) => {
    let newBagTemplate = `
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn" onclick='addToCart(${item.id})'>Buy Now</button>
                </div>
            </article>
        `;
    bagSection.insertAdjacentHTML("beforeend", newBagTemplate);
  });
};
const fillStationerySection = () => {
  stationerySection.innerHTML = "";
  stationery.forEach((item) => {
    let newStationeryTemplate = `
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn" onclick='addToCart(${item.id})'>Buy Now</button>
                </div>
            </article>
        `;
    stationerySection.insertAdjacentHTML("beforeend", newStationeryTemplate);
  });
};
const fillAllWrapper = () => {
  fillNoteBookSection();
  fillAutographSection();
  fillBagSection();
  fillStationerySection();
};

const fetchProductData = async () => {
  await fetch("http://localhost/task-4/asset/data/product.json")
    .then((res) => res.json())
    .then((data) => {
      noteBook = data.noteBook;
      autograph = data.autograph;
      bag = data.bag;
      stationery = data.stationery;
    });
  fillAllWrapper();
};

const getCartData = () => {
  fetch("http://localhost/task-4/cart-api.php")
    .then((res) => res.json())
    .then((data) => {
      cart = [...data];
    });
};

window.addEventListener("load", gettingUserData);
window.addEventListener("load", fetchProductData);
window.addEventListener("load", getCartData);
