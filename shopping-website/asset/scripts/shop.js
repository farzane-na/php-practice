const $ = document;
let noteBook = null;
let autograph = null;
let bag = null;
let stationery = null;

const noteBookSection=$.querySelector(".note-book__wrapper")
const autographSection=$.querySelector(".autograph__wrapper")
const bagSection=$.querySelector(".bag__wrapper")
const stationerySection=$.querySelector(".stationery__wrapper")

const fillNoteBookSection=()=>{
    noteBookSection.innerHTML=""
    noteBook.forEach(item=>{
        let newNoteBookTemplate=`
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn">Buy Now</button>
                </div>
            </article>
        `
        noteBookSection.insertAdjacentHTML("beforeend",newNoteBookTemplate)
    })
}
const fillAutographSection=()=>{
    autographSection.innerHTML=""
    autograph.forEach(item=>{
        let newAutoGraphTemplate=`
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn">Buy Now</button>
                </div>
            </article>
        `
        autographSection.insertAdjacentHTML("beforeend",newAutoGraphTemplate)
    })
}
const fillBagSection=()=>{
    bagSection.innerHTML=""
    bag.forEach(item=>{
        let newBagTemplate=`
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn">Buy Now</button>
                </div>
            </article>
        `
        bagSection.insertAdjacentHTML("beforeend",newBagTemplate)
    })
}
const fillStationerySection=()=>{
    stationerySection.innerHTML=""
    stationery.forEach(item=>{
        let newStationeryTemplate=`
            <article class="section__item">
                <div class="section_img">
                    <img src=${item.image} alt="">
                </div>
                <h3 class="section__title">${item.name}</h3>
                <div class="section__handler">
                    <span class="section__price">${item.price} $</span>
                    <button class="section__btn">Buy Now</button>
                </div>
            </article>
        `
        stationerySection.insertAdjacentHTML("beforeend",newStationeryTemplate)
    })
}

const fillAllWrapper=()=>{
    fillNoteBookSection()
    fillAutographSection()
    fillBagSection()
    fillStationerySection()
}

const fetchData=async()=>{
    await fetch("http://localhost/task-4/asset/data/product.json")
      .then((res) => res.json())
      .then((data) => {
        noteBook = data.noteBook;
        autograph = data.autograph;
        bag = data.bag;
        stationery = data.stationery;
      });
    fillAllWrapper()
}


window.addEventListener("load",fetchData)