const searchPhone = () =>{
    const searchText = document.getElementById('searchText').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res=> res.json())
    .then(phones=>displayPhones(phones.data));
}

const displayPhones = phones => {
    console.log(phones);
}
{/* <div class="card ms-5" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <a href="#" class="btn btn-brnadColor">Go somewhere</a>
</div> */}