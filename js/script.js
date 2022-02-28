const searchPhone = () =>{
    const searchText = document.getElementById('searchText').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res=> res.json())
    .then(phones=>displayPhones(phones.data));
}

// searched phones display 
const displayPhones = phones => {
    const displayArea = document.getElementById('cards');

    for(const phone of phones){
        const div = document.createElement('div');
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
        displayArea.appendChild(div);
    }
}

// phone details 

const phoneDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(phone=> displayDestails(phone.data))
}

const displayDestails= phone =>{
    console.log(phone);
    const phoneDetails = document.getElementById('phoneDetails');
    const div = document.createElement('div');
    div.className= 'row row-cols-lg-3 d-flex align-items-center justify-content-center"'
    div.innerHTML= `
    <div class="details-info">
        <strong>Brand: ${phone.brand}</strong>
        <strong>Model: ${phone.name}</strong>
        <strong>Display: ${phone.mainFeatures.displaySize}</strong>
        <strong>Chipset: ${phone.mainFeatures.chipSet}</strong>
        <strong>Memory: ${phone.mainFeatures.memory}</strong>
        <strong>Release Date: ${phone.releaseDate}</strong>
        </div>
        
        <div>
        <img src="${phone.image}" class="img" alt="" srcset="">
        </div>
        <div class="details-info w-30">
        <strong>WLAN: ${phone.others.WLAN}</strong>
        <strong>Bluetooth: ${phone.others.Bluetooth}</strong>
        <strong>GPS: ${phone.others.GPS}</strong>
        <strong>NFC: ${phone.others.NFC}</strong>
        <strong>Radio: ${phone.others.Radio}</strong>
        <strong>USB: ${phone.others.USB}</strong>
        <strong>Sensors: ${phone.mainFeatures.sensors.join(', ')}</strong>
    </div>
    `
    phoneDetails.appendChild(div);
}