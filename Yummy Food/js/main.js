let dataSec = document.getElementById('dataSec');
let dataSearch = document.getElementById('dataSearch');
let submitId;

$(document).ready(()=>{
    searchByName("").then(()=>{
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow","visible");
    });
})
// /////////////////////////////
$(".nav-header i.open-close-icon").click(()=>{
    if($(".side-nav").css("left") == "0px" ){
      closeNav();
    }else{
        openNav();
    }
})

function openNav(){
    $(".side-nav").animate({left:0},500);
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    for(var i=0 ; i<5 ; i++){
        $(".links li").eq(i).animate({top:0},(i+5)*100)
    }
}

function closeNav(){
    let navWidth = $(".nav-tab").outerWidth();
    $(".side-nav").animate({left:-navWidth},500);
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".links li").animate({top:300},500)
}
 ////////////// started sec //////////////////
async function searchByName(term){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    res = await res.json();
    console.log(res.meals);
    if(res.meals){
        displayMeals(res.meals);
    }else{
        displayMeals([]); 
    }
}

function displayMeals(arr){
    let box = ``;
    for(let i=0 ; i<arr.length ;i++){
        box+=`
        <div class="col-md-3">
        <div onclick="getDishDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${arr[i].strMealThumb}" alt="meal image">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center">
              <h3>${arr[i].strMeal}</h3>
          </div>
        </div>
      </div>
        `;
    }
    dataSec.innerHTML = box;
}

//////////////// category section //////////////////
async function getallCategories(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    res = await res.json();
    console.log(res.categories);
    dataSearch.innerHTML = '';
    displaycategories(res.categories);
}

function displaycategories(arr){
    let box = ``;
    for(let i=0 ; i<arr.length ;i++){
        box+=`
        <div class="col-md-3">
        <div onclick="getCategoryMeal('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${arr[i].strCategoryThumb}" alt="meal image">
          <div  class="meal-layer position-absolute text-center">
              <h3>${arr[i].strCategory}</h3>
              <p>${arr[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}<p/>
          </div>
        </div>
      </div>
        `;
    }
    dataSec.innerHTML = box;
}

//////////////// area section //////////////////
async function getallAreas(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    res = await res.json();
    dataSearch.innerHTML = '';
    console.log(res.meals);
    displayAreas(res.meals);
}

function displayAreas(arr){
    let box = ``;
    for(let i=0 ; i<arr.length ;i++){
        box+=`
        <div class="col-md-3">
        <div class="p-2 rounded-2 cursor-pointer">
          <div onclick="getAreaMeal('${arr[i].strArea}')" class="meal-layer text-center">
             <i class="fa-solid fa-city fa-2x text-danger "></i>
             <h3>${arr[i].strArea}</h3>
          </div>
        </div>
      </div>
        `;
    }
    dataSec.innerHTML = box;
}

/////////////// ingrediant section //////////////////
async function getIngrediant(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    res = await res.json();
    dataSearch.innerHTML = '';
    console.log(res.meals);
    displayIngrediant(res.meals.slice(0,20));
}

function displayIngrediant(arr){
    let box = ``;
    for(let i=0 ; i<arr.length ;i++){
        box+=`
        <div class="col-md-3">
        <div onclick="getIngredientMeal('${arr[i].strIngredient}')" class="meal rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
            <h4 class="text-white">${arr[i].strIngredient}</h4>
            <p class="text-white">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
        </div>
      </div>
        `;
    }
    dataSec.innerHTML = box;
}

/////////////// category Meals //////////////////
async function getCategoryMeal(term){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
    res = await res.json();
    console.log(res.meals);

    displayMeals(res.meals.slice(0,20));
    
}

/////////////// Area Meals //////////////////
async function getAreaMeal(myArea){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${myArea}`);
    res = await res.json();
    console.log(res.meals);

    displayMeals(res.meals.slice(0,20));
}

/////////////// ingredient Meals //////////////////
async function getIngredientMeal(myIngradient){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${myIngradient}`);
    res = await res.json();
    console.log(res.meals);

    displayMeals(res.meals.slice(0,20));
}



//////////////  search page //////////////
function getSearchPage(){
    dataSearch.innerHTML = `
      <div class="col-md-6 pt-5">
          <input type="text" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-center text-white" placeholder="search By Name">
      </div>
      <div class="col-md-6 pt-5">
        <input type="text" onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-center text-white" placeholder="search By First Letter">
      </div>
    `;
    dataSec.innerHTML = "";

}

async function searchByLetter(term){
    term == ""? term ="a": "";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    res = await res.json();
    console.log(res.meals);
    if(res.meals){
        displayMeals(res.meals);
    }else{
        displayMeals([]); 
    }
}

//////////////  contact page //////////////
function getContact(){
dataSec.innerHTML = `
<section class=" bg-dark text-center d-flex align-items-center min-vh-100" >
  <div class="container w-75">
    <div class="row g-4">
      <div class="col-md-6">
        <input type="text" id="nameId" onkeyup="validation(this.value)" class=" form-control bg-transparent text-center text-white" placeholder="Enter your Name">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">special character not allowed </div>
      </div>
      <div class="col-md-6">
        <input type="email" id="emailId" onkeyup="validation(this.value)" class="is-valid form-control bg-transparent text-center text-white" placeholder="Enter your Email">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">email must contain @ </div>
      </div>
      <div class="col-md-6">
        <input type="text" id="phoneId" onkeyup="validation(this.value)" class=" form-control bg-transparent text-center text-white" placeholder="Enter your Phone">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">special character not allowed </div>
      </div>
      <div class="col-md-6">
        <input type="number" id="ageId" onkeyup="validation(this.value)" class=" form-control bg-transparent text-center text-white" placeholder="Enter your age">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">special character not allowed </div>
      </div>
      <div class="col-md-6">
        <input type="password" id="passwordId" onkeyup="validation(this.value)" class=" form-control bg-transparent text-center text-white" placeholder="Enter your password">
        <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">special character not allowed </div>
      </div>
      <div class="col-md-6">
        <input type="password" id="rePassId" onkeyup="validation(this.value)" class="form-control bg-transparent text-center text-white" placeholder="confirmed password">
        <div id="rePassAlert" class="alert alert-danger w-100 mt-2 d-none">special character not allowed </div>
      </div>
    </div>
    <button id="submitId" class="btn btn-outline-danger py-2  px-4 mt-3 disabled">submit</button>
  </div>
</section> 
`;
submitId = document.getElementById('submitId');
dataSearch.innerHTML = '';

document.getElementById('nameId').addEventListener('focus',()=>{
    nameTouch = true ; 
})

document.getElementById('emailId').addEventListener('focus',()=>{
    emailTouch = true ; 
})

document.getElementById('phoneId').addEventListener('focus',()=>{
    phoneTouch = true ; 
})

document.getElementById('ageId').addEventListener('focus',()=>{
    ageTouch = true ; 
})

document.getElementById('passwordId').addEventListener('focus',()=>{
    passTouch = true ; 
})

document.getElementById('rePassId').addEventListener('focus',()=>{
    rePassTouch = true ; 
})

}


///////////////// contact validation /////////////////
let nameTouch = false;let emailTouch = false;
let phoneTouch = false;let ageTouch = false;
let passTouch = false;let rePassTouch = false;


function validation(){
   if(nameTouch){
    if(nameValidate()){
        document.getElementById('nameAlert').classList.replace('d-block','d-none');
        document.getElementById('nameAlert').classList.add('is-valid');
        document.getElementById('nameAlert').classList.remove('is-invalid');


    }else{
        document.getElementById('nameAlert').classList.replace('d-none','d-block');
        document.getElementById('nameAlert').classList.remove('is-valid');
        document.getElementById('nameAlert').classList.add('is-invalid');
    }
   }

    if(emailTouch){
        if(emailValidate()){
            document.getElementById('emailAlert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('emailAlert').classList.replace('d-none','d-block');
        }
    }

   if(phoneTouch){
    if(phoneValidate()){
        document.getElementById('phoneAlert').classList.replace('d-block','d-none');
    }else{
        document.getElementById('phoneAlert').classList.replace('d-none','d-block');
    }
   }

    if(ageTouch){
        if(ageValidate()){
            document.getElementById('ageAlert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('ageAlert').classList.replace('d-none','d-block');
        }
    }

   if(passTouch){
    if(passValidate()){
        document.getElementById('passAlert').classList.replace('d-block','d-none');
    }else{
        document.getElementById('passAlert').classList.replace('d-none','d-block');
    }
   }

  if(rePassTouch){
    if(repassValidate()){
        document.getElementById('rePassAlert').replace('d-block','d-none');
    }else{
        document.getElementById('rePassAlert').replace('d-none','d-block');
    }
  }

if(nameValidate() &&
emailValidate() &&
phoneValidate() &&
ageValidate() &&
passValidate() &&
repassValidate() 
){
    submitId.removeAttribute('disabled');
}else{
    submitId.setAttribute('disabled',true);
}
}

function nameValidate(){
    return  (/^[a-zA-Z]+$/.test(document.getElementById('nameId').value))
}
function emailValidate(){
    return  (/^[a-zA-Z]+$/.test(document.getElementById('emailId').value))
}

function phoneValidate(){
    return  (/^[a-zA-Z]+$/.test(document.getElementById('phoneId').value))
}
function ageValidate(){
    return  (/^[a-zA-Z]+$/.test(document.getElementById('ageId').value))
}
function passValidate(){
    return  (/^[a-zA-Z]+$/.test(document.getElementById('passwordId').value))
}
function repassValidate(){
    return  ((document.getElementById('rePassId').value) == (document.getElementById('passwordId').value))
}

///////////////// display 
async function getDishDetails(mealId){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    response = await response.json();
    displayDishDetails(response.meals[0]);
}

function displayDishDetails(){
    box = `
    <div class="col-md-4">
    <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="">
  </div>
  <div class="col-md-8">
    <h2>Instructions</h2>
    <p>as ${meal.strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
    </ul>

    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
      <li  class="alert alert-info m-2 p-1">whole.....</li>
    </ul>

    <a href="${meal.strSource}" class="btn btn-success"> Source</a>
    <a href="${meal.strYoutube}" class="btn btn-danger"> Youtube</a>

  </div>
    `
    dataSec.innerHTML=box;
}