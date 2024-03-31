let openShopping=document.querySelector('.shopping');
let closeShopping=document.querySelector('.closeShopping');
let list=document.querySelector('.list');
let listCard=document.querySelector('.listCard');
let body=document.querySelector('body');
let total=document.querySelector('.total');
let quantity=document.querySelector('.quantity');

openShopping.addEventListener('click',()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click',()=>{
    body.classList.remove('active');
})
let products=[
    {
        id:1,
        name:'CORNETTO',
        image:'cornetto.jpg',
        price:150
    },
    {
        id:2,
        name:'VANILLA',
        image:'vennila1.jpg',
        price:90
    },
    {
        id:3,
        name:'STRAWBERRY',
        image:'strawberry1.jpg',
        price:90
    },
    {
        id:4,
        name:'BLACKCURRANT',
        image:'bc.jpg',
        price:100
    },
    {

        id:5,
        name:'MAGNUM',
        image:'magnum.jpg',
        price:200
    },
    {
        id:6,
        name:'MINT CHOCOLATE',
        image:'chocolate mint.jpg',
        price:150
    },
    {
        id:7,
        name:'CHOCOLATE',
        image:'choco.jpg',
        price:100
    },
    {

        id:8,
        name:'BUTTERSCOTCH',
        image:'butterscotch1.jpg',
        price:100
    },
];
let listCards=[];
function initApp(){
    products.forEach((value,key)=>{
            let newDiv=document.createElement('div');
            newDiv.classList.add('item');
            newDiv.innerHTML=`
                <img src="img/${value.image}" style="border-radius:20%;width:70%;"/>
                <div class="title" style="font-size:30px;font-weight:800;">${value.name}</div>
                <div class="price" style="font-size:30px;font-weight:500;">Rs:${value.price.toLocaleString()}</div>
                <button onclick="addToCard(${key})" style="background-color:orange;">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    })
    }
    initApp();
    function addToCard(key){
        if(listCards[key]==null){
            listCards[key]=products[key];
            listCards[key].quantity=1;
        }
        reloadCard();  
    }
    function reloadCard(){
        listCard.innerHTML='';
        let count=0;
        let totalPrice=0;
        listCards.forEach((value,key)=>{
            totalPrice=totalPrice+listCards[key].price;
            count=count+value.quantity;
            if(value!=null){
                let newDiv=document.createElement('li');
                newDiv.innerHTML=`
                    <div><img src="img/${value.image}"/></div>
                    <div>${value.name}</div>
                    <div>${value.price.toLocaleString()}</div>
                    <div>${value.quantity}</div>
                    <div>
                        <button onclick="changeQuantity(${key},${value.quantity-(1)})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key},${value.quantity+(1)})">+</button>
                    </div>
                `;
                listCard.appendChild(newDiv);
            }
        })
        total.innerText=totalPrice.toLocaleString();
        quantity.innerText=count;
    }
    function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    }
    else{        
        listCards[key].quantity = quantity;
        listCards[key].price =quantity * products[key].price; // Recalculate the price based on the new quantity
    }
    reloadCard();
}


