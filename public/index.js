"use strict";

function searching(){
    let foundProducts = [];
    products.forEach((item, index) => {
        let nameArray = item.name.split(' ')
        nameArray.filter(names =>{
            if(names == document.getElementById('mySearch').value){
                foundProducts.push(item.name)
            }
        })
    })
return document.getElementById('searchedItems').innerHTML = foundProducts.map(product => `<li>${product}</li>`).join('')
}