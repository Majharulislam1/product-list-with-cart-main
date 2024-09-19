const container = document.querySelector('.food_grid');
const quantity_id = document.getElementById('quantity');
const cart_container = document.querySelector('.cart_container');

const loadData = async () => {
    const res = await fetch('./data.json');
    const data = await res.json();
    displayData(data);
}



const increment = (quantity) => {
    const quant = document.getElementById(`quantity-${quantity}`);
    let cnt = parseInt(quant.innerText);
    cnt++;
    quant.innerText = cnt;
    addingClass(parseInt(quant.innerText), quantity);
    getItems();
    
}

const Decrement = (quantity) => {
    const quant = document.getElementById(`quantity-${quantity}`);
    if (parseInt(quant.innerText) > 0) {
        let cnt = parseInt(quant.innerText);
        cnt--;
        quant.innerText = cnt;
    }
    else {
        quant.innerText = 0;
    }
    addingClass(parseInt(quant.innerText), quantity);
    getItems();
}



const storedCart = () => {
    let cart = [];
    const locals_cart = localStorage.getItem('cart');
    if (locals_cart) {
        cart = JSON.parse(locals_cart);
    }
    return cart;
}

const cartItems = (items) => {
    let quantity = 0;
    for (let item of items) {
        quantity += item.quantity;
    }
    quantity_id.innerText = quantity;
}




const setItem = async (id, quantity) => {
    const cart = storedCart();
    const itemIndex = cart.findIndex(item => item.id === id);

    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        const fetchedItem = data.find(item => item.id === id);

        if (fetchedItem) {
           
            if (itemIndex !== -1) {
                cart[itemIndex].quantity = quantity;
            } else {
                const newItem = { ...fetchedItem, quantity: quantity };
                cart.push(newItem);
            }

            
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            console.error(`Item with id ${id} not found in data.json`);
        }
    } catch (error) {
        console.error("Error fetching data from data.json:", error);
    }
};



const getItems = () => {
    const saveCart = storedCart();
    console.log(saveCart)
    cartItems(saveCart);
    
}








const addingClass = (quantity, id) => {
    const image = document.querySelector(`.image_${id}`);
    const buttons = document.getElementById(`button_${id}`);

    let child = buttons.children;
    let spans = child[0].children
    if (quantity === 0) {

        buttons.classList.add('button--skoll');
        buttons.classList.remove('button--no-hover');
        image.classList.remove('image_border');
        spans[0].style.display = 'flex';
        spans[1].style.display = 'none';

        spans[0].style.display = '';
        spans[1].style.display = '';


    }
    else if (quantity > 0) {

        image.classList.add('image_border');
        buttons.classList.remove('button--skoll');
        buttons.classList.add('button--no-hover');
        spans[0].style.display = 'none';
        spans[1].style.display = 'flex';
        spans[1].classList.add('secondary');
    }
    else {

        image.classList.remove('image_border');
        buttons.classList.add('button--skoll');
        buttons.classList.remove('button--no-hover');
        spans[0].style.display = 'flex';
        spans[1].style.display = 'none';
    }


    setItem(id, quantity);

}

 

 

 

// const cart_show_data = () => {


//   for (let i of cart_items) {
//     if (i.quantity > 0) {
//         const div = document.createElement('div');
//         div.innerHTML = `
//              <div class="items">
//                               <div class="first_item">
//                                   <p class="recipe_name">Classic Tiramisu</p>
//                                   <p class="pricing_p">
//                                     <span class="quantity"><span>1</span>x</span>
//                                     <span class="recipe_price">
//                                       @ $<span>7.00</span>
//                                     </span>
//                                     <span class="recipe_total_price">$
//                                       <span>7.00</span>
//                                     </span>
//                                   </p>
//                               </div>
//                               <div class="cross_btn">
//                                 <i class='bx bx-x-circle bx-sm'></i>
//                               </div>
//                           </div>
//         `;

//         cart_container.appendChild(div);
//     }
//   }

      
   
// };




const displayData = (data) => {



    data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
                 
                 <div>
                                <div class="image_section">
                                      <img class='image_${element.id}' src="${element.image.desktop}" alt="">
                                </div>
                                <div class="button_section">
                                       <div>
                                            <button id="button_${element.id}" class="button button--skoll">
                                              <span>
                                                   
                                                  <span id="initials">
                                                       <i class='bx bx-cart-add bx-sm'></i>
                                                      <span> Add to cart</span>
                                                  </span>
                                                  <span id="secondary">
                                                        <span onclick="increment(${element.id})" id="plus"><i class='bx bx-plus-circle plus_minus'></i></span>
                                                        <span id="quantity-${element.id}" class="cart_count">0</span>
                                                        <span onclick="Decrement(${element.id})" id="minus"><i class='bx bx-minus-circle plus_minus'></i></span>
                                                  </span>
                                              </span>
                                          </button>
                                       </div>
                                </div>
                                 <div class="content_section">
                                      <p>${element.category} </p>                             
                                      <h4>${element.name}</h4>
                                      <h2>$ ${element.price}</h2>
                                 </div>
                           </div>
           
           `;

        container.appendChild(div);


    });

}






window.addEventListener('load', () => {
    localStorage.clear();
    loadData();
});



