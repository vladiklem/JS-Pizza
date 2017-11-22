
document.find(".next-step-button").click(function(){
    nameVlaidate();
})

function nameVlaidate() {
    var nameForm = document.getElementById("inputName").value;
    console.log(nameForm);
}