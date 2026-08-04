let step = 1;

const screens = document.querySelectorAll(".calc-screen");
const progress = document.getElementById("progress");
const stepText = document.getElementById("stepText");

function showStep(){

screens.forEach(s=>s.classList.remove("active"));

document.getElementById("screen"+step).classList.add("active");

progress.style.width=(step*25)+"%";

stepText.innerHTML="Шаг "+step+" из 4";

}

function nextStep(){

if(step==1){

document.getElementById("facadesBlock").style.display=
document.getElementById("facades").checked?"block":"none";

document.getElementById("countertopBlock").style.display=
document.getElementById("countertop").checked?"block":"none";

}

if(step==2){

document.getElementById("facadesSizes").style.display=
document.getElementById("facades").checked?"block":"none";

document.getElementById("countertopSizes").style.display=
document.getElementById("countertop").checked?"block":"none";

document.getElementById("backsplashSizes").style.display=
document.getElementById("backsplash").checked?"block":"none";

}

if(step<4){

step++;

showStep();

}

}

function prevStep(){

if(step>1){

step--;

showStep();

}

}

showStep();

function calculate(){

let material=0;

let work=0;

if(document.getElementById("facades").checked){

let length=parseFloat(document.getElementById("kitchenLength").value)||0;

let top=parseFloat(document.getElementById("topHeight").value)||0;

let bottom=parseFloat(document.getElementById("bottomHeight").value)||0;

let area=(length*(top+bottom))/10000;

let price=22000;

if(document.querySelector("input[name='facadeMaterial']:checked")){

if(document.querySelector("input[name='facadeMaterial']:checked").value=="mdf")

price=36000;

}

material+=area*price;

work+=38000;

}

if(document.getElementById("countertop").checked){

let len=parseFloat(document.getElementById("countertopLength").value)||0;

let sheets=Math.ceil(len/300);

let topPrice=49000;

if(document.querySelector("input[name='countertopType']:checked")){

topPrice=parseInt(document.querySelector("input[name='countertopType']:checked").value);

}

material+=topPrice*sheets;

work+=45000;

}

if(document.getElementById("backsplash").checked){

let len=parseFloat(document.getElementById("backsplashLength").value)||0;

let sheets=Math.ceil(len/300);

material+=41000*sheets;

work+=25000;

}

document.getElementById("materialsPrice").innerHTML=

material.toLocaleString("ru-RU")+" ₸";

document.getElementById("workPrice").innerHTML=

work.toLocaleString("ru-RU")+" ₸";

document.getElementById("totalPrice").innerHTML=

(material+work).toLocaleString("ru-RU")+" ₸";

step=4;

showStep();

}
