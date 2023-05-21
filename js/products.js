class Product {

    constructor(id, name, price, category, icon) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.icon = icon;
    }
}

const PRODUCT_CATEGORY_PHONE = "PHONE";
const PRODUCT_CATEGORY_WATCH = "WATCH";

let products = [
    new Product(1, "Pixel 7a", 61500, PRODUCT_CATEGORY_PHONE, "https://adminapi.applegadgetsbd.com/storage/media/thumb/Pixel-7a-1-1762.jpg"),
    new Product(2, "Infinix Note 12", 22000, PRODUCT_CATEGORY_PHONE, "https://adminapi.applegadgetsbd.com/storage/media/thumb/12-pro---Volcanic-Grey-6558.jpg"),
    new Product(3, "Infinix Hot 20", 14400, PRODUCT_CATEGORY_PHONE, "https://adminapi.applegadgetsbd.com/storage/media/thumb/hot-20---Sonic-Black-3326.jpg"),
    new Product(4, "Gallaxy A34 5G", 32500, PRODUCT_CATEGORY_PHONE, "https://adminapi.applegadgetsbd.com/storage/media/thumb/Galaxy-A34-5G-Awesome-Graphite-4542.jpg"),
    new Product(5, "Pixel 7", 54500, PRODUCT_CATEGORY_PHONE, "https://adminapi.applegadgetsbd.com/storage/media/thumb/Pixel-7-Obsidian-1130.jpg"),

    new Product(6, "Zeblaze Meteor Smartwatch", 3500, PRODUCT_CATEGORY_WATCH, "https://adminapi.applegadgetsbd.com/storage/media/thumb/3777-50687.jpg"),
    new Product(7, "Zeblaze Btalk Lite", 2990, PRODUCT_CATEGORY_WATCH, "https://adminapi.applegadgetsbd.com/storage/media/thumb/ZEBLAZE-BTALK-LITE-Up-6450.jpg"),
    new Product(8, "Huawei Watch Buds", 52000, PRODUCT_CATEGORY_WATCH, "https://adminapi.applegadgetsbd.com/storage/media/thumb/huawei-watch-buds-price-in-bangladesh-1066.png"),
    new Product(9, "Kieslect KR Pro Calling Smart Watch", 6300, PRODUCT_CATEGORY_WATCH, "https://adminapi.applegadgetsbd.com/storage/media/thumb/Kieslect-KR-Pro-Smart-Watch-(4)-9953.jpg")
]
class ProductCart {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    get price() {
        return this.product.price * this.quantity;
    }
}


const VAT = 0.07;
let cartItems = [];
let subtotal = 0;
let vatOnPrice = 0;
let totalprice = 0;


function addItemInCart(item) {
    let productCart;
    let price = 0;
    let found = false;
    for (let index in cartItems) {
        if (cartItems[index].product.id == item.id) {
            cartItems[index].quantity += 1;
            productCart = cartItems[index];
            found = true;
        }

        price += cartItems[index].price;
    }

    if (!found) {
        let cart = new ProductCart(item, 1);
        cartItems.push(cart);
        price += cart.price;
        productCart = cart;
    }

    subtotal = price;
    vatOnPrice = Math.floor(subtotal * VAT);
    totalprice = price + vatOnPrice;

    return productCart;
}

function removeItemFromCart(item) {
    let price = 0;
    let newArr = []
    for (index in cartItems) {
        if (cartItems[index].product.id == item.product.id) {
            continue;
        }
        newArr.push(cartItems[index]);
        price += cartItems[index].price;
    }

    cartItems = newArr;

    subtotal = price;
    vatOnPrice = Math.floor(subtotal * VAT);
    totalprice = price + vatOnPrice;
}

function updateCartEntry(item) {
    let price = 0;
    let newArr = []
    for (index in cartItems) {
        if (cartItems[index].product.id == item.product.id) {
            cartItems[index].quantity = item.quantity;
        }
        newArr.push(cartItems[index]);
        price += cartItems[index].price;
    }

    cartItems = newArr;

    subtotal = price;
    vatOnPrice = Math.floor(subtotal * VAT);
    totalprice = price + vatOnPrice;
}

function isItemAllreadyInCart(product) {
    for (var item of cartItems) {
        if (item.product.id == product.id) {
            return true;
        }
    }
    return false;
}

function getBadgeCount() {
    return cartItems.length;
}