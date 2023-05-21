const phoneSection = document.getElementById('phones');
const watchesSection = document.getElementById('watches');
const cartSection = document.getElementById('cart');

const phoneDiv = document.getElementById('phone-container');
const watchesDiv = document.getElementById('watch-container');
const cartDiv = document.getElementById('cart-container');
const emptyCartDiv = document.getElementById('empty-cart');
const cartbody = document.getElementById('cart-body');

const countSpan = document.getElementById('count');

const linkPhone = document.getElementById("linkPhone");
const linkWatch = document.getElementById("linkWatch");
const linkCart = document.getElementById("linkCart");

const subtotalInput = document.getElementById('subtotal');
const vatInput = document.getElementById('vat');
const totalInput = document.getElementById('total');

function showPhoneSection() {
    watchesSection.classList.remove('d-block');
    cartSection.classList.remove('d-block');
    watchesSection.classList.add('d-none');
    cartSection.classList.add('d-none');

    phoneSection.classList.remove('d-none');
    phoneSection.classList.add('d-block');


    linkPhone.setAttribute("aria-current", "page");
    linkPhone.classList.add("active");

    linkWatch.removeAttribute("aria-current");
    linkWatch.classList.remove("active");

    linkCart.removeAttribute("aria-current");
    linkCart.classList.remove("active");
}

function showWatchSection() {
    phoneSection.classList.remove('d-block');
    cartSection.classList.remove('d-block');
    phoneSection.classList.add('d-none');
    cartSection.classList.add('d-none');

    watchesSection.classList.remove('d-none');
    watchesSection.classList.add('d-block');

    linkWatch.setAttribute("aria-current", "page");
    linkWatch.classList.add("active");

    linkPhone.removeAttribute("aria-current");
    linkPhone.classList.remove("active");

    linkCart.removeAttribute("aria-current");
    linkCart.classList.remove("active");
}

function showCartSection() {
    phoneSection.classList.remove('d-block');
    watchesSection.classList.remove('d-block');
    phoneSection.classList.add('d-none');
    watchesSection.classList.add('d-none');

    cartSection.classList.remove('d-none');
    cartSection.classList.add('d-block');

    linkCart.setAttribute("aria-current", "page");
    linkCart.classList.add("active");

    linkPhone.removeAttribute("aria-current");
    linkPhone.classList.remove("active");

    linkWatch.removeAttribute("aria-current");
    linkWatch.classList.remove("active");
}

linkPhone.addEventListener('click', function () {
    showPhoneSection();

});
linkWatch.addEventListener('click', function () {
    showWatchSection();
});
linkCart.addEventListener('click', function () {
    showCartSection();
});

const maxAllowedQuantity = 10;
function getActionControlOnCartItem(cart, priceTextView) {
    let div = document.createElement('div');
    let buttonDel = document.createElement('button');

    addImageInsideButton(buttonDel, './assets/minus.png');

    let buttonAdd = document.createElement('button');
    addImageInsideButton(buttonAdd, './assets/add.png');

    let inputNumberField = document.createElement('input');
    inputNumberField.type = "number";
    inputNumberField.style.textAlign = "center";
    inputNumberField.style.width = "56px";
    inputNumberField.style.height = "36px";
    inputNumberField.style.borderRadius = "6px";
    inputNumberField.value = cart.quantity;

    inputNumberField.addEventListener('input', function () {
        updateEntryinCart(cart, inputNumberField, priceTextView);
    });

    inputNumberField.addEventListener('keydown', function (e) {
        switch (e.key) {
            case "ArrowDown":
            case "ArrowUp":
                e.preventDefault();
                break;
            default:
                break
        }
    });

    inputNumberField.addEventListener('keyup', function () {
        updateEntryinCart(cart, inputNumberField, priceTextView);
    });

    div.appendChild(buttonDel);
    div.appendChild(inputNumberField);
    div.appendChild(buttonAdd);

    buttonDel.addEventListener('click', function () {
        let quantity = parseInt(inputNumberField.value);
        if (quantity == NaN) {
            quantity = 1;
        } else {
            quantity -= 1;
        }
        if (quantity > 0) {
            inputNumberField.value = quantity
            updateEntryinCart(cart, inputNumberField, priceTextView);
        } else {
            inputNumberField.value = 1;
            updateEntryinCart(cart, inputNumberField, priceTextView);
        }

    });

    buttonAdd.addEventListener('click', function () {
        let quantity = parseInt(inputNumberField.value);
        if (quantity == NaN) {
            quantity = 1;
        } else {
            quantity += 1;

        }
        inputNumberField.value = quantity;
        updateEntryinCart(cart, inputNumberField, priceTextView);
    });

    return div;
}

function updateEntryinCart(cart, inputNumberField, priceTextView) {
    let quantity = parseInt(inputNumberField.value);
    if (quantity > 0) {
        if (quantity > 99) {
            quantity = 99;
        }
        inputNumberField.value = quantity;
        cart.quantity = quantity;
        updateCartEntry(cart)
        priceTextView.innerText = `${cart.price} BDT`;
        updateBalance();
    } else {
        inputNumberField.value = 1;
        cart.quantity = 1;
        updateCartEntry(cart)
        priceTextView.innerText = `${cart.price} BDT`;
        updateBalance();
    }
}

function putColumnsInProductCartRow(cart, row) {
    let deleteElm = document.createElement('th');
    deleteElm.scope = 'row';
    let productElm = document.createElement('td');
    let inputElm = document.createElement('td');
    let priceElm = document.createElement('td');

    const button = document.createElement('button');
    addImageInsideButton(button, "./assets/delete.png");

    button.addEventListener('click', () => {
        removeItemFromCart(cart);
        cartDiv.removeChild(row);
        updateBadgeCount();
        updateBalance();
    });

    deleteElm.appendChild(button);

    let card = document.createElement('div');
    card.classList.add('d-flex', 'flex-row', 'w-100', 'align-items-center');

    const img = document.createElement('img');
    img.src = cart.product.icon;
    img.alt = cart.product.name;
    img.style.width = "72px";
    img.style.height = "72px";
    img.classList.add('rounded');
    card.appendChild(img);

    const h5 = document.createElement('h5');
    h5.innerText = cart.product.name;
    h5.classList.add('mx-3');

    card.appendChild(h5);
    productElm.appendChild(card);

    const p = document.createElement('p');
    p.id = `${cart.id}priceText`;
    p.innerText = cart.price + " BDT";
    p.classList.add('fw-bold', 'text-center');

    let action = getActionControlOnCartItem(cart, p);
    inputElm.classList.add('align-items-center');
    inputElm.appendChild(action);

    priceElm.appendChild(p);

    row.appendChild(deleteElm);
    row.appendChild(productElm);
    row.appendChild(inputElm);
    row.appendChild(priceElm);
}

function addImageInsideButton(button, img) {
    const imgButton = document.createElement('img');
    imgButton.src = img;
    imgButton.style.width = "24px";
    imgButton.style.height = "24px";
    imgButton.classList.add('rounded', 'img-thumbnail');
    button.appendChild(imgButton);
    button.classList.add('border-0', 'bg-transparent');
}

function putItemInProductCart(cart) {
    let element = document.createElement('tr');
    putColumnsInProductCartRow(cart, element)

    cartDiv.appendChild(element);
}

function getProductCard(product) {
    let div = document.createElement('div');
    div.classList.add('h-100', 'product-card', 'shadow-sm', 'py-2');
    const card = document.createElement('div');
    card.classList.add('card', 'border-0');
    card.style.maxWidth = '18rem';

    const img = document.createElement('img');
    img.src = product.icon;
    img.alt = product.name;
    img.classList.add("card-img-top");
    card.appendChild(img);

    const card_body = document.createElement('div');
    card_body.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.innerText = product.name;

    const p = document.createElement('p');
    p.classList.add('card-text');
    p.innerText = "BDT " + product.price;



    card_body.appendChild(h5);
    card_body.appendChild(p);

    card.appendChild(card_body);

    div.appendChild(card);

    const a = document.createElement('a');
    a.classList.add("btn", "btn-primary", 'w-75', 'mx-auto');
    a.innerText = "Add To Cart";

    a.addEventListener('click', () => {
        let cartItem = addItemInCart(product);
        updateBadgeCount();
        putItemInProductCart(cartItem);
        updateBalance();
        a.innerText = "Added";
        a.classList.add('disabled');
    })

    div.appendChild(a);
    if (isItemAllreadyInCart(product)) {
        a.classList.add('d-none');
    } else {
        a.classList.add('d-block');
    }



    return div;
}

function updateBadgeCount() {
    let badge = getBadgeCount();
    if (badge < 1) {
        countSpan.innerText = "0";

        emptyCartDiv.classList.remove('d-none', 'd-block');
        cartbody.classList.remove('d-none', 'd-block');
        emptyCartDiv.classList.add('d-block');
        cartbody.classList.add('d-none');
    } else {
        countSpan.innerText = "" + badge;

        emptyCartDiv.classList.remove('d-none', 'd-block');
        cartbody.classList.remove('d-none', 'd-block');
        cartbody.classList.add('d-block');
        emptyCartDiv.classList.add('d-none');
    }
}

function putProductInContainer(product, div) {
    let container = document.createElement('div');
    container.classList.add('p-2');
    let card = getProductCard(product);
    container.appendChild(card);
    div.appendChild(container);
}


function setupProductCards(category, container) {
    for (child of container.children) {
        container.removeChild(child);
    }
    let div = document.createElement('div');

    div.classList.add('row', 'row-cols-1', 'row-cols-md-4');

    for (let product of products) {
        if (product.category == category) {
            putProductInContainer(product, div);
        }
    }

    container.appendChild(div);
}


function updateBalance() {
    totalInput.innerText = totalprice;
    subtotalInput.innerText = subtotal;
    vatInput.innerText = vatOnPrice;
}

function setup() {
    setupProductCards(PRODUCT_CATEGORY_PHONE, phoneDiv);
    setupProductCards(PRODUCT_CATEGORY_WATCH, watchesDiv);
    countSpan.innerText = "0";
    updateBadgeCount();
    updateBalance();

}


setup();