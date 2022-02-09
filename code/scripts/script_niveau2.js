var wizard = document.getElementById("wizard");
var cauldron = document.getElementById("cauldron");
var button_submit = document.getElementById("submit");
button_submit.addEventListener("click", submit_clicked);

var button_reset = document.getElementById("reset");
button_reset.addEventListener("click", reset);

var button_recommencer = document.createElement("button");
button_recommencer.textContent = "Recommencer";
button_recommencer.addEventListener("click", recommencer);

var victory_div = document.getElementById("victory_div");
victory_div.append(button_recommencer);
button_recommencer.style.visibility = "hidden";

// allow tab in textarea
document.getElementById('coding_area').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
      // put caret at right position again
      this.selectionStart = this.selectionEnd = start + 1;
    }
});

function put_cauldron(){
    var coordX = Math.floor(Math.random() * 14);
    var coordY = Math.floor(Math.random() * 14);
    cauldron.style.left = coordX * 50 + 9 + "px";
    cauldron.style.top = coordY * 50 + 9 + "px"; 
    cauldron.style.visibility = "visible";
}

function set_error_message(message){
    let div_error = document.getElementById("error_div");
    let p_error = document.createElement("p");
    p_error.textContent = message;
    p_error.style.color = "red";
    div_error.append(p_error);

    let p_help = document.createElement("p");
    p_help.textContent = "La syntaxe attendue est nom_fonction(nombre)";
    div_error.append(p_help);
    return -1;
}

function clear_error_message(){
    let div_error = document.getElementById("error_div");
    div_error.innerHTML = "";
}

function verify_code(code){
    if (code.value === ""){
        set_error_message("Aucun code n'a été entré !");
        return -1;
    }
    else{
        clear_error_message();
    }
}

function check_syntaxe(command){
    var direction = command.split("(");
    if ((direction[0] === "gauche") || (direction[0] === "droite") || (direction[0] === "haut") || 
    (direction[0] === "bas")){
        clear_error_message();
    }
    else{
        set_error_message("La commande " + direction[0] + " est inconnue");
        return -1;
    }
    // verify is there is digit between ()
    if (!isNaN(command.charAt(command.length -2)) || 
    (!isNaN(command.charAt(command.length -3)) && !isNaN(command.charAt(command.length -2)))){
        clear_error_message();
    }
    else{
        set_error_message(command + ": le sorcier doit se déplacer de combien de cases ?")
        return -1;
    }

    //verify there is a (
    if (command.charAt(command.length -3) === ("(") || command.charAt(command.length -4) === ("(")){
        clear_error_message();
    }
    else{
        set_error_message(command + ": problème de syntaxe");
        return -1;
    }

    //verify line ends by )
    if (command.charAt(command.length -1) === (")")){
        clear_error_message();
    } 
    else{
        set_error_message(command + ": problème de syntaxe");
        return -1;
    }
}

function sleep(time){
    return new Promise((resolve, reject) => {
        let y = 0
        setTimeout(() => {
            for (i=0; i<10; i++) {
                y++
            }
            resolve(y)
        }, time)
    })
}

async function gauche(steps){
    let new_x_val = 0;
    for (let i=0 ; i<steps ; i++){
        new_x_val = wizard.offsetLeft - 50;
        if (new_x_val < 9){
            new_x_val = 9;
        }
        wizard.style.left = new_x_val + "px";
        await sleep(1000);
    }
    return;
}

async function droite(steps){
    let new_x_val = 0;
    for (let i=0 ; i<steps ; i++){
        new_x_val = wizard.offsetLeft + 50;
        if (new_x_val > 709){
            new_x_val = 709;
        }
        wizard.style.left = new_x_val + "px";
        await sleep(1000);
    }
}

async function haut(steps){
    let new_y_val = 0;
    for (let i=0 ; i<steps ; i++){
        new_y_val = wizard.offsetTop - 50;
        if (new_y_val < 9){
            new_y_val = 9;
        }
        wizard.style.top = new_y_val + "px";
        await sleep(1000);
    }
}

async function bas(steps){
    let new_y_val = 0;
    for (let i=0 ; i<steps ; i++){
        new_y_val = wizard.offsetTop + 50;
        if (new_y_val > 709){
            new_y_val = 709;
        }
        wizard.style.top = new_y_val + "px";
        await sleep(1000);
    }
}

async function define_direction(direction){
    direction = direction.split("(");
    direction[1] = direction[1].slice(0, -1);
    // direction[0] = the direction to go
    // direction[1] = the number of steps to do
    if (direction[0] === "gauche"){
        await gauche(direction[1]);
    }
    else if (direction[0] === "droite"){
        await droite(direction[1]);
    }
    else if (direction[0] === "haut"){
        await haut(direction[1]);
    }
    else if (direction[0] === "bas"){
        await bas(direction[1]);
    }
    return;
}

function is_win(){
    return ((wizard.offsetLeft === cauldron.offsetLeft) && (wizard.offsetTop === cauldron.offsetTop));
}

function setup_final_div(){
    let p_final = document.getElementById("final_text");
    if (is_win()){
        let cup = document.getElementById("cup");
        cup.style.visibility = "visible";
        p_final.textContent = "Victoire !";
    }
    else{
        p_final.textContent = "Perdu";
    }
    button_recommencer.style.visibility = "visible";
}

async function anayze_text_area(textarea){
    if (verify_code(textarea) == -1){
        return -1;
    }
    //var textarea_content = [code.value];
    var textarea_content = textarea.value.split("\n");

    for (let element of textarea_content){
        // ignoring whitespace
        element = element.replace(/\s+/g, '');
        //check if the syntax is correct
        if (check_syntaxe(element) === -1){
            wizard.style.left = 359 + "px";
            wizard.style.top = 359 + "px";
            return -1;
        }
        await define_direction(element);
    }
    setup_final_div();
}

function submit_clicked(){
    var code = document.getElementById("coding_area");
    if (anayze_text_area(code) === -1){
        return -1;
    }
}

function reset(){
    var textarea = document.getElementById("coding_area");
    textarea.value = "";
}

function recommencer(){
    if (is_win()){
        let cup = document.getElementById("cup");
        cup.style.visibility = "hidden";
        put_cauldron();
        reset();
    }
    wizard.style.left = 359 + "px";
    wizard.style.top = 359 + "px";
    let final_text = document.getElementById("final_text");
    final_text.textContent = "";
    button_recommencer.style.visibility = "hidden";
}