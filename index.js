document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convert');
    const convertedAmount = document.getElementById('convertedAmount');

    const apiKey = '06f5e39596e2b8b02a82e38f';
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/INR`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || from === '' || to === '') {
            alert('Please fill in all fields');
            return;
        }

        fetch(`${apiUrl}?base=${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const result = amount * rate;
                convertedAmount.textContent = result.toFixed(2);
            });
    });
});
