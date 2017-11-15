/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $menu = $(".all-pizza-types");

$menu.find("#all").click(function(){
    showPizzaList(Pizza_List)
    $(".pizza-filter-count").text(8);
    $menu.find("#all").addClass("active");
    $menu.find("#meat").removeClass("active");
    $menu.find("#pineapple").removeClass("active");
    $menu.find("#mushroom").removeClass("active");
    $menu.find("#ocean").removeClass("active");
    $menu.find("#tomato").removeClass("active");
});

$menu.find("#meat").click(function(){
    $menu.find("#all").removeClass("active");
    $menu.find("#meat").addClass("active");
    $menu.find("#pineapple").removeClass("active");
    $menu.find("#mushroom").removeClass("active");
    $menu.find("#ocean").removeClass("active");
    $menu.find("#tomato").removeClass("active");
    filterPizza("meat");
});

$menu.find("#pineapple").click(function(){
    $menu.find("#all").removeClass("active");
    $menu.find("#meat").removeClass("active");
    $menu.find("#pineapple").addClass("active");
    $menu.find("#mushroom").removeClass("active");
    $menu.find("#ocean").removeClass("active");
    $menu.find("#tomato").removeClass("active");
    filterPizza("pineapple");
});

$menu.find("#mushroom").click(function(){
    $menu.find("#all").removeClass("active");
    $menu.find("#meat").removeClass("active");
    $menu.find("#pineapple").removeClass("active");
    $menu.find("#mushroom").addClass("active");
    $menu.find("#ocean").removeClass("active");
    $menu.find("#tomato").removeClass("active");
    filterPizza("mushroom");
});

$menu.find("#ocean").click(function(){
    $menu.find("#all").removeClass("active");
    $menu.find("#meat").removeClass("active");
    $menu.find("#pineapple").removeClass("active");
    $menu.find("#mushroom").removeClass("active");
    $menu.find("#ocean").addClass("active");
    $menu.find("#tomato").removeClass("active");
    filterPizza("ocean");
});

$menu.find("#tomato").click(function(){
    $menu.find("#all").removeClass("active");
    $menu.find("#meat").removeClass("active");
    $menu.find("#pineapple").removeClass("active");
    $menu.find("#mushroom").removeClass("active");
    $menu.find("#ocean").removeClass("active");
    $menu.find("#tomato").addClass("active");
    filterPizza("tomato");
});

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
        var content = pizza.content;

        Object.keys(content).forEach(function(key){
            if (key == filter){
                pizza_shown.push(pizza);
            }
        });

    });

    //Показати відфільтровані піци
    $(".pizza-filter-count").text(pizza_shown.length);
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;