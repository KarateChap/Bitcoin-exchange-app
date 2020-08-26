const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    console.log(currency_one, currency_two);

    

    fetch(`https://blockchain.info/ticker`).then(res => res.json())
    .then(data => {
        const btcusdrate = data[`USD`].last;
        //console.log(btcusdrate);

        if(currency_two === "PHP"){
            fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
            .then(res => res.json())
            .then(data => {
            const rate = data.rates.PHP;
            rateEl.innerText = `1 ${currency_one} = ${(rate * btcusdrate).toFixed(2)} PHP`;
            amountEl_two.value = (amountEl_one.value * rate * btcusdrate).toFixed(2);
            });
        }
        else{
            const rate = data[`${currency_two}`].last
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        }
    });
}

function recalculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    console.log(currency_one, currency_two);

    fetch(`https://blockchain.info/ticker`).then(res => res.json())
    .then(data => {
        const btcusdrate = data[`USD`].last;
        //console.log(btcusdrate);

        if(currency_two === "PHP"){
            fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
            .then(res => res.json())
            .then(data => {
            const rate = data.rates.PHP;
            rateEl.innerText = `1 ${currency_one} = ${(rate * btcusdrate).toFixed(2)} PHP`;
            amountEl_one.value = (amountEl_two.value / rate / btcusdrate).toFixed(6);
            });
        }
        else{
            const rate = data[`${currency_two}`].last
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_one.value = (amountEl_two.value / rate).toFixed(6);
        }
    });
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', recalculate);


calculate();