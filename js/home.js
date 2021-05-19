const getCovidStats = async() => {
    mencari()
    try {
        const response = await fetch('https://covid19.mathdro.id/api/countries/IDN');
        const data = await response.json();

        confirmed = data['confirmed']
        recovered = data['recovered']
        deaths = data['deaths']
    } catch (err) {
        console.log(`Error: ${err}`)
    } finally {
        markupConfirmed = `
            ${confirmed['value']}`
        markupRecovered = `
            ${recovered['value']}`
        markupDeaths = `
            ${deaths['value']}`
        markupTotal = `
            ${confirmed['value'] + recovered['value'] + deaths['value']}`

        const Confirmed = document.getElementById('Confirmed')
        Confirmed.textContent = markupConfirmed

        const Recovered = document.getElementById('Recovered')
        Recovered.textContent = markupRecovered

        const Deaths = document.getElementById('Deaths')
        Deaths.textContent = markupDeaths

        const Total = document.getElementById('Total')
        Total.textContent = markupTotal
    }
    mencari()
};
getCovidStats()

function mencari() {
    const mencari = document.getElementById('mencari')
    const content = document.getElementById('content')

    setTimeout(() => {
        mencari.setAttribute('style', 'display: none')
        content.setAttribute('style', 'display: block')
    }, 1500)
}