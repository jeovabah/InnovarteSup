let carts = document.querySelectorAll(".buy-cart");
const btn = document.querySelector("#send")
var btnRefresh =document.getElementById("#refresh"); 
let products = [
    {
        name: "Whey Protein Isolado",
        tag:"wheyisolado",
        price:135,
        inCart:0
    },
    {
        name: "Whey Protein Concentrado ",
        tag:"wheyproteinconcentrado",
        price:175,
        inCart:0
    },
    {
        name: "Top Whey 3w +Performance",
        tag:"topwhey3w",
        price:167,
        inCart:0
    },
    {
        name: "Top whey 3W +Sabor",
        tag:"topwhey3wsabor",
        price:167,
        inCart:0
    },
    {
        name: "Whey Grego 3W trisabor",
        tag:"wheygrego3w",
        price:160,
        inCart:0
    },
    {
        name: "Whey 100% Max",
        tag:"whey100",
        price:135,
        inCart:0
    },
    {
        name: "Refil Whey 100% Whey",
        tag:"refilwhey100",
        price:50,
        inCart:0
    },
    {
        name: "Whey profit Isolate Protein Mix",
        tag:"wheyprofit",
        price:90,
        inCart:0
    },
    {
        name: "Creatina Max Titanium 300g",
        tag:"creatina300g",
        price:115,
        inCart:0
    },
    {
        name: "Creatina Vitafor 300g",
        tag:"creatinaVitafor",
        price:90,
        inCart:0
    },
    {
        name: "Creatina Black Skull 300g",
        tag:"creatinaBlack",
        price:67,
        inCart:0
    },
    {
        name: "Max Titanium 2 Hot 200g",
        tag:"2hot",
        price:95,
        inCart:0
    },
    {
        name: "Pre-Workout Horus 150g",
        tag:"horus",
        price:95,
        inCart:0
    },
    {
        name: "Pre-Workout Diabo Verde 150g",
        tag:"diaboVerde",
        price:80,
        inCart:0
    },
    {
        name: "Dakness Badseed",
        tag:"darknessBad",
        price:95,
        inCart:0
    }

];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener("click", ()=> {
        cartNumbers(products[i]);
        totalCost(products[i]);
        setName(products[i])
    })
}

function onLoadCartNumbers(){
    var productNumbers = localStorage.getItem("cartNumbers");
    
    if (productNumbers){
        document.querySelector(".num-cart span").textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem("cartNumbers");

    productNumbers = parseFloat(productNumbers);

    if  ( productNumbers ){
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".num-cart span").textContent = 
        productNumbers + 1;
    }else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".num-cart span").textContent = 1;
    }
    setName(product);
    setItems(product);
}
function setItems (product){
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);

   if (cartItems!= null){
       
        if(cartItems[product.tag]==undefined) {
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart +=1; 
   } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
   }    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost (product){
    let cartCost = localStorage.getItem("totalCost");

    console.log("My cartCost is" , cartCost);
    console.log(typeof cartCost);
    
    if(cartCost != null){
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost" , cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    console.log(cartItems);
    console.log( cartItems)
    if( cartItems && productContainer ) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` <div class="product"> <img src="./midia/${item.tag}.jpeg"> <span style="border-right:4px solid black">${item.name}</span> 
            </div>
            <div class="quantity">
                
                <span>${item.inCart}</span>
                  
            </div>
            <div class="total"> 
                R$${item.inCart * item.price}
            </div>
            
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle>
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    R$${cartCost}
                </h4>
            </div> 
        `;

        
    }
}

function enviarMensagem(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".button-checker");
    let cartCost = localStorage.getItem("totalCost");

    
    let obj = cartItems;
    
    obj = JSON.decycle(obj);
    console.log(JSON.stringify(obj));
    
    obj = JSON.retrocycle(obj);
    console.log(obj); 

    

    if( cartItems && productContainer ) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
           
            
         /*var texto = `Pedido: ${item.name}
------------
preço: R$${cartCost}
------------
quantidade: ${item.inCart}`;
    texto=window.encodeURIComponent(texto);
    window.open("https://api.whatsapp.com/send?phone=" + "5585991039732" + "&text=" + texto, "_blank"); */
            var texto=`Pedido: ${item.name}
.
Preço: R$${item.price}, Total: R$${cartCost}`
var cost = `  Preço: ${cartCost} `
    productContainer.innerHTML+= `
    <div class="div-enviar">
     <p>Pedido: ${item.name + ", " + "R$"+item.price}</p>
     <a class="btn-send" target="_blank" href='https://api.whatsapp.com/send?phone=5585991039732&text="${texto}"'>Prosseguir para o <i class="fab fa-whatsapp"></i></a>
     </div>
     `

            
        });

    }
    
}
function setName (product){
    let cartItems = localStorage.getItem("nameInCart");
    cartItems = JSON.parse(cartItems);
 
    if (cartItems!= null){
        
         if(cartItems[product.name]==undefined) {
             cartItems = {
                 ...cartItems,
                  [product.name] : "----- Pedido Feito" 
             }
         }
         cartItems[product.name].price; 
    } else {
         product.inCart = 1;
         cartItems = {
             [product.name]: "----- Mais um Pedido : "
         }
    }    
     
     localStorage.setItem("nameInCart", JSON.stringify(cartItems));
 }
 
  function cartZero(){
        localStorage.clear();
        location.reload();
  }


displayCart();
onLoadCartNumbers();
