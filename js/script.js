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
            <h4 class="card-title">${phone.brand}</h4>
            <h5>${phone.name}</h5>
        </div>
        <a href="#" class="btn btn-brnadColor">Full Specficition</a>
        </div>
        `;
        displayArea.appendChild(div);
    }
}

// phone details 

const phoneDetails = (id) =>{
    console.log(id);
    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.innerHTML= `
    

    `
}