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
        console.group(phone);
    }
}

// phone details 

const phoneDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(phone=> displayDestails(phone.data))
    
}

const displayDestails= phone =>{
    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.innerHTML= `
    

    `
}