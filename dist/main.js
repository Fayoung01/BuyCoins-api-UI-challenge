const coinsPerPage = 10;
let currentPage = 1;
let dataStartValue = 0;

const api = 'https://api.coinlore.com/api/tickers';

const tbody = document.querySelector('tbody');
const prevBtn = document.querySelector('#previous');
const navButtons = document.querySelectorAll('nav button');


const toggleBtnVisibility = () => {
    const btnClassList = prevBtn.classList;
    currentPage > 1 ? btnClassList.remove('hide') : btnClassList.add('hide');
}

const determineCurrentPage = (id) => {
    switch (id) {
        case 'next':
            dataStartValue += coinsPerPage;
            currentPage++;
            break;
        case 'previous':
            dataStartValue = dataStartValue > 0 ? dataStartValue - coinsPerPage : 0;
            currentPage--;
            break;
        default:
            return 0
    }
}

const fetchData = async () => {
    try {
        const res = await fetch(`${api}/?start=${dataStartValue}&limit=${coinsPerPage}`);
        const {
            data
        } = await res.json();
        return data;
    } catch (err) {
        return [];
    }
}

const renderData = async (a) => {

    determineCurrentPage(a.target.id);
    const data = await fetchData();
    const fragment = document.createDocumentFragment();

    data.forEach(({
        name,
        symbol,
        price_usd,
        tsupply
    }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${name}</td>
      <td>${symbol}</td>
      <td>$${price_usd}</td>
      <td>${tsupply} ${symbol}</td>
     `
        fragment.appendChild(tr);
    })

    tbody.innerHTML = '';
    tbody.appendChild(fragment);
    toggleBtnVisibility();
}

navButtons.forEach((button) => {
    button.addEventListener('click', renderData);
})

document.addEventListener('DOMContentLoaded', renderData);