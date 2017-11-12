/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

$(".top-clear").click(function(){
    Cart = [];
    updateCart();
});

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    var x = -1;
    for(var i=0;i<Cart.length;i++){
        if(pizza.id === Cart[i].pizza.id && size === Cart[i].size){
            x = i;
        }
    }

    if(x == -1){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }else{
        Cart[x].quantity += 1;
        updateCart();
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var id = cart_item.pizza.id;
    var size = cart_item.size;
    for(var i=0;i<Cart.length;i++){
        if(id === Cart[i].pizza.id && size === Cart[i].size){
            var n = i;
        }
    }
    Cart.splice(n,1);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".count-clear").click(function(){
            removeFromCart(cart_item);
        });

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            if(cart_item.quantity == 1){
                removeFromCart(cart_item);
            }else{
                cart_item.quantity -= 1;
            }

            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;