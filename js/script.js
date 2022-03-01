const errorHandle = (message) =>{
    showSpinner('none');
    showCoverText('none');
    emptyPhoneDetails();
    document.getElementById('error-text').innerText= message;
}

//load searched phones data
const searchPhone = () =>{

    emptyError();
    emptyPhoneDetails();
    showCoverText('none');
    showSpinner('block');

    const searchText = document.getElementById('searchText').value;
    document.getElementById('searchText').value= "";

    if(searchText==""){
        errorHandle('Please enter something to show !!');
    }
    else{

        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res=> res.json())
        .then(phones=>{
            if(phones.data==""){
                errorHandle('No result found !');
            }
            else{
                displayPhones(phones.data);
            }
        });
    
    }
}

// empty error section
const emptyError = () => {
    document.getElementById('error-text').innerHTML= "";
}

// empty phone details section
const emptyPhoneDetails = () => {
    document.getElementById('phoneDetails').innerHTML= "";
}

// show/disable all results button 
const showAllBtn = (status) => {
    document.getElementById('showAll-btn').style.display=status;
}

// show/disable spinner
const showSpinner = (status) => {
    document.getElementById('spinner').style.display=status;
}

// show/disable cover text
const showCoverText = (status) => {
    document.getElementById('cover-text').style.display=status;
}

// searched phones display 
const displayPhones = phones => {

    // console.log("phones:",phones);
    let counter = 1;
    const displayArea = document.getElementById('cards');
    displayArea.innerHTML = "";
    for(const phone of phones){
        const div = document.createElement('div');
        div.className= 'card-parent mx-auto mt-5';

        // console.log("phone:",phone);
        //result limit condition
        if(counter>20){
            div.style.display='none';
        }
        counter++;
        div.innerHTML = `
        <div class="card border-0 mt-5 md:ms-5 mx-auto" style="width: 16rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body text-center">
        <small class="card-title">${phone.phone_name}</small>
        <h5>${phone.brand}</h5>
        </div>
        <a href="#" class="btn btn-brnadColor" onclick="phoneDetails('${phone.slug}')">Full Specficition</a>
        </div>
        `;
        
        showSpinner('none');
        showCoverText('block');
        displayArea.appendChild(div);
        showAllBtn('block');
    }
}

// load phone details 

const phoneDetails = (id) =>{

    showCoverText('none');
    showSpinner('block');

    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(phone=> displayDestails(phone.data))
}

// display phone details
const displayDestails= phone =>{

    console.log(phone);
    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.innerHTML = ""; 
    const msg = ' no info available';
    const image = './image/phone.jpg'

    const div = document.createElement('div');
    div.className= 'row row-cols-lg-3 row-cols-lg-1 d-flex align-items-center justify-content-center w-100'
    div.innerHTML= `
    <div class="details-info">
        
        <strong>Brand: ${(phone?.brand=="")? msg:phone.brand}</strong>

        <strong>Model: ${(phone?.name=="")? msg:phone.name}</strong>

        <strong>Release Date: ${(phone?.releaseDate=="")? "No release date found.":phone.releaseDate}</strong>
        
        <strong>Display: ${(phone?.mainFeatures?.displaySize==undefined)? msg:phone.mainFeatures.displaySize}</strong>
        
        <strong>Chipset: ${(phone?.mainFeatures?.chipSet==undefined)? msg: phone.mainFeatures.chipSet}</strong>
        
        <strong>Memory: ${(phone?.mainFeatures?.memory==undefined)? msg:phone.mainFeatures.memory}</strong>
        

        </div>
        
        <div class="p-0 m-0 d-flex">
        <img src="${(phone?.image=="")? image:phone.image}" class="mx-auto" alt="" srcset="">
        </div>

        <div class="details-info">
        <strong>WLAN: ${(phone?.others?.WLAN==undefined)? msg:phone.others.WLAN}</strong>
        <strong>Bluetooth: ${(phone?.others?.Bluetooth==undefined)? msg:phone.others.Bluetooth}</strong>
        <strong>GPS: ${(phone?.others?.GPS==undefined)? msg:phone.others.GPS}</strong>
        <strong>NFC: ${(phone?.others?.NFC==undefined)? msg:phone.others.NFC}</strong>
        <strong>Radio: ${(phone?.others?.Radio==undefined)? msg:phone.others.Radio}</strong>
        <strong>USB: ${(phone?.others?.USB==undefined)? msg:phone.others.USB}</strong>
        <strong>Sensors: ${(phone?.mainFeatures?.sensors==undefined)? msg:phone?.mainFeatures?.sensors.join(', ')}</strong>
    </div>
    `
    emptyError();
    showSpinner('none');
    phoneDetails.appendChild(div);
}

// showing all results 

const showAllResults = () =>{
    const elements = document.getElementsByClassName('card-parent');
    console.log(elements);

    showAllBtn('none');

    for(const element of elements){
        element.style.display = "block";
    }
}