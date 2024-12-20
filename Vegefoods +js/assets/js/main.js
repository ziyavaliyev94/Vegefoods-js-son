let miniMenu = document.querySelector(".miniMenu");
let menuIcon = document.getElementById("menuIcon");
let navbarUl = document.querySelector(".navbarUl");

menuIcon.addEventListener("click", () => {
    if (navbarUl.style.display === "block") {
        navbarUl.style.display = "none";
    } else {
        navbarUl.style.display = "block";
    }
});

let firstLine = document.querySelector(".firstLine");
let page = 1;
let limit = 8;
let allData;
async function getApi() {
    try {
        page++;
        let { data } = await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss?page=${page}&limit=${limit}`);
        allData = data;
        data.forEach((item) => {
            let div = document.createElement("div");
            div.classList.add("pepper");
            div.innerHTML = `
        <i onclick="addToCard(${item.id})" class="shopIcon fa-solid fa-cart-shopping"></i>
        <i onclick="addToWish(${item.id})" class="heartIcon fa-solid fa-heart"></i>
        <img src="${item.image}" alt="">
        <div onclick="getDetail(${item.id})" class="pctContent">
            <h5>${item.title}</h5>
            <span class="newPrice">Price: ${item.price}</span>
        </div>
        `
            firstLine.append(div)
        })

    } catch (error) {
        console.log(error);
    }
}

function getDetail(id) {
    window.location.href = `/assets/pages/Detail.html?productId=${id}`

}



let moreProduct = document.getElementById("moreProduct")
moreProduct.addEventListener("click", getApi)

function addToCard(id) {
    let addtocart = document.getElementById("addtocart")
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (id) {
        let result1 = cart.find((item) => item.id == id)
        if (result1) {
            alert("Bu mehsul artiq sebetde movcutdur");
            return;
        }
        let result = allData.find((item) => item.id == id);
        if (result) {
            cart.push(result);
            alert("Mehsul sebete elave olundu")
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }
    addtocart.innerHTML = `
    <a href="./assets/pages/addToCard.html"><i class="shopIcon fa-solid fa-cart-shopping"></i></a>[${cart.length}]
    `
}
addToCard()

function addToWish(id) {
    let hearticon = document.getElementById("hearticon")
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (id) {
        let result1 = wishlist.find((item) => item.id == id)
        if (result1) {
            alert("Bu mehsul artiq wishlistde movcutdur");
            return;
        }
        let result = allData.find((item) => item.id == id);
        if (result) {
            wishlist.push(result);
            alert("Mehsul wishliste elave olundu")
            localStorage.setItem("wishlist", JSON.stringify(wishlist))
        }
    }
    hearticon.innerHTML = `
    <a href="./assets/pages/wishList.html"><i class="fa-solid fa-heart"></i></a>[${wishlist.length}]
    `

}

addToWish()

function getDate() {
    let date = new Date();
    let day = document.getElementById("day");
    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second = document.getElementById("second");
    day.innerHTML = date.getDate();
    hour.innerHTML = date.getHours();
    minute.innerHTML = date.getMinutes();
    second.innerHTML = date.getSeconds();
}

setInterval(() => {
    getDate()
}, 1000)

let carousel = document.querySelector(".caorusel-1");

let data = [
    {
        img: "https://preview.colorlib.com/theme/vegefoods/images/bg_2.jpg",
        h1: "100% FRESH & ORGANIC FOODS",
        h5: " WE DELIVER ORGANIC VEGETABLES & FRUITS",
    },
    {
        img: "https://preview.colorlib.com/theme/vegefoods/images/bg_1.jpg",
        h1: "We serve Fresh Vegestables & Fruits",
        h5: " WE DELIVER ORGANIC VEGETABLES & FRUITS",
    },
    {
        img: "https://preview.colorlib.com/theme/vegefoods/images/bg_3.jpg",
        h1: "100% FRESH & ORGANIC FOODS",
        h5: " WE DELIVER ORGANIC VEGETABLES & FRUITS",
    },

]

let firsElement = 0;
const lastElement = 1;

function visible(index) {
    carousel.innerHTML = ""
    for (let i = 0; i < lastElement; i++) {
        let itemIndex = (index + i) % data.length;
        carousel.innerHTML += `      
            <img src="${data[itemIndex].img}" alt="">
        <div class="text">
            <h1> ${data[itemIndex].h1}</h1>
            <h5> ${data[itemIndex].h1}</h5>
            <span class="viewDetailsButton"><button>View Details</button></span>
        </div>
        `
    }
}
visible(firsElement)

setInterval(() => {
    firsElement = (firsElement + 1) % data.length;
    visible(firsElement)
}, 3000)