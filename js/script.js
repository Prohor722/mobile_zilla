const searchPhone = () =>{
    const searchText = document.getElementById('searchText').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res=> res.json())
    .then(phones=>displayPhones(phones.data));
}

// show/block all results button 
const showAllBtn = (status) => {
    document.getElementById('showAll-btn').style.display=status;
}

// show/block spinner
const showSpinner = (status) => {
    document.getElementById('spinner').style.display=status;
}

// show/block cover text
const showCoverText = (status) => {
    document.getElementById('cover-text').style.display=status;
}

// searched phones display 
const displayPhones = phones => {

    showCoverText('none');
    showSpinner('block');

    let counter = 1;
    const displayArea = document.getElementById('cards');
    displayArea.innerHTML = "";
    for(const phone of phones){
        const div = document.createElement('div');
        div.className= 'card-parent';

        //result limit condition
        if(counter>20){
            div.style.display='none';
        }
        counter++;
        div.innerHTML = `
        <div class="card border-0 mt-5 ms-5" style="width: 12rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body text-center">
        <small class="card-title">${phone.phone_name}</small>
        <h5>${phone.brand}</h5>
        </div>
        <a href="#" class="btn btn-brnadColor" onclick="phoneDetails('${phone.slug}')">Full Specficition</a>
        </div>
        `;
        showSpinner('none');
        displayArea.appendChild(div);
        showAllBtn('block');
    }
}

// phone details 

const phoneDetails = (id) =>{

    // showSpinner('block');
    // showCoverText('none');

    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(phone=> displayDestails(phone.data))
}

const displayDestails= phone =>{

    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.innerHTML = ""; 
    
    const div = document.createElement('div');
    div.className= 'row row-cols-lg-3 row-cols-lg-1 d-flex align-items-center justify-content-center w-100'
    div.innerHTML= `
    <div class="details-info">
        <strong>Brand: ${phone.brand}</strong>
        <strong>Model: ${phone.name}</strong>
        <strong>Display: ${phone.mainFeatures.displaySize}</strong>
        <strong>Chipset: ${phone.mainFeatures.chipSet}</strong>
        <strong>Memory: ${phone.mainFeatures.memory}</strong>
        <strong>Release Date: ${phone.releaseDate}</strong>
        </div>
        
        <div class="p-0 m-0 d-flex">
        <img src="${phone.image}" class="mx-auto" alt="" srcset="">
        </div>
        <div class="details-info">
        <strong>WLAN: ${phone.others.WLAN}</strong>
        <strong>Bluetooth: ${phone.others.Bluetooth}</strong>
        <strong>GPS: ${phone.others.GPS}</strong>
        <strong>NFC: ${phone.others.NFC}</strong>
        <strong>Radio: ${phone.others.Radio}</strong>
        <strong>USB: ${phone.others.USB}</strong>
        <strong>Sensors: ${phone.mainFeatures.sensors.join(', ')}</strong>
    </div>
    `
    // showSpinner('none');
    // showCoverText('none'); 
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