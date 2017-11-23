/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $menu = $(".all-pizza-types");

var numbers = ['1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' , '0']

$("#inputName").focus(function(){
    $("#inputName").keyup(function(){
        var name = $("#inputName").val();
        if (!validName(name)){
            $(".name-help-block").css('display' , 'block');
            $(".name-lab").css('color' , 'darkred');
        }else{
            $(".name-help-block").css('display' , 'none');
            $(".name-lab").css('color' , 'green');
        }
    });
});

$("#inputPhone").focus(function(){
    $("#inputPhone").keyup(function(){
        var phone = $("#inputPhone").val();
        if (!validPhone(phone)){
            $(".phone-help-block").css('display' , 'block');
            $(".phone-lab").css('color' , 'darkred');
        }else{
            $(".phone-help-block").css('display' , 'none');
            $(".phone-lab").css('color' , 'green');
        }
    });
});

$("#inputAdress").focus(function(){
    $("#inputAdress").keyup(function(){
        var adress = $("#inputAdress").val();
        if (!validAdress(adress)){
            $(".adress-lab").css('color' , 'darkred');
        }else{
            $(".adress-lab").css('color' , 'green');
        }
    });
});

function validPhone(phone){
    if(phone.length < 10){
        return false
    }
    if (phone.charAt(0) != "0" && phone.charAt(0) != "+"){
        return false
    }
    for(var i = 1;i<phone.length-1;i++){
        if (!(phone.charAt(i) in numbers)){
            return false
        }
    }
    return true
}

function validName(name){
    if (name.charAt(name.length-1) in numbers){
        return false
    }
    if (name.charAt(name.length-1) == " "){
        return false
    }
    return true
}

function validAdress(adress){
    if(adress.length == 0){
        return false
    }
    return true
}


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