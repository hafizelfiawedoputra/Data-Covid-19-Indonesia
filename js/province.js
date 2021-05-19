let sortedData;
const getAndRenderData = async() => {
    mencari();
    const response = await fetch('https://indonesia-covid-19.mathdro.id/api/provinsi');
    const { data } = await response.json();
    sortedData = data.sort((a, z) => (a.kasusPosi < z.kasusPosi) ? 1 : -1);
    const main = document.querySelector('main');
    main.removeChild(main.lastChild);
    sortedData.forEach((d, counter) => renderProvinces(d, counter + 1));
    document.querySelector('#search').disabled = false;

}

document.querySelector('#search').addEventListener('input', (information) => {
    const filter = information.target.value.toLowerCase();
    const filteredData = sortedData.filter((d) => d.provinsi.toLowerCase().includes(filter));
    const provinceList = document.querySelector('#provinceList');
    while (provinceList.firstChild) {
        provinceList.removeChild(provinceList.firstChild);
    }
    filteredData.forEach((d, counter) => renderProvinces(d, counter + 1));
    mencari()
})


const renderProvinces = (data, counter) => {
    const { provinsi, kasusMeni, kasusPosi, kasusSemb } = data;
    const province = document.createElement('div');
    province.setAttribute('class', 'provinceItems');

    const provinceHeader = document.createElement('p');
    provinceHeader.setAttribute('class', 'provinceHeader');
    const index = document.createElement('span');
    const title = document.createElement('span');
    title.setAttribute('class', 'provinceTitle');
    index.innerHTML = `#${counter}`;
    title.innerHTML = provinsi;
    provinceHeader.appendChild(index);
    provinceHeader.appendChild(title);
    province.appendChild(provinceHeader);

    renderProvinceStat(province, kasusPosi, 'Positive');
    renderProvinceStat(province, kasusSemb, 'Recovered');
    renderProvinceStat(province, kasusMeni, 'Death');

    document.querySelector('#provinceList').appendChild(province);

}

const renderProvinceStat = (province, num, desc) => {
    const provinceStat = document.createElement('p');
    provinceStat.setAttribute('class', 'provinceStats');
    const statNum = document.createElement('span');
    statNum.setAttribute('class', 'statNum');
    const statDesc = document.createElement('span');
    statDesc.setAttribute('class', 'statDesc');
    statNum.innerHTML = num;
    statDesc.innerHTML = desc;
    provinceStat.appendChild(statNum);
    provinceStat.appendChild(statDesc);
    province.appendChild(provinceStat);

}

getAndRenderData();

function mencari() {
    const mencari = document.getElementById('mencari')
    const content = document.getElementById('content')

    setTimeout(() => {
        mencari.setAttribute('style', 'display: none')
        content.setAttribute('style', 'display: block')
    }, 1500)
}