const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; 

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

// first part
for( let select of dropdowns)
{
    for(let countryCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = countryCode;
        newOption.value = countryCode;
        if( select.name === 'from' && countryCode == 'USD')
        {
            newOption.selected = "selected"
        }
        if( select.name === 'to' && countryCode == 'NPR')
        {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    if(amount.value === "" || amount.value < 1)
    {
        amount.value = '1';
        amount.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response =  await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmount = amount.value * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} =${finalAmount} ${toCurr.value}`;
}

// first part
const updateFlag = (element) => {
    let countryCode = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// second part
btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //default behaviors will be prevented
    updateExchangeRate();
    
})

//only work when when window is loaded
window.addEventListener("load",() =>{
    updateExchangeRate();
})










// dropdowns.innerHTML = cluster;
// for(let code in countryList)
// {
//     select.innerHTML += `<option value="${countryList.code}">${code}</option>`;
// }