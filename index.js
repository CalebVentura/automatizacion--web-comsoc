const puppeteer = require('puppeteer')
const delay = require('delay')

const configBrowser = {
    defaultViewport: {
        width: 1920,
        height: 1080
    },
    headless: false,
    args: ['--no-sandbox', '--ignore-certificate-errors', '--window-size=1920,1080']
}

const runCrawler = async () => {
    try {
        const browser = await puppeteer.launch(configBrowser)

        console.log('Inicio de navegador')
        const page = await browser.newPage()
        await page.goto('https://www.planetadelibros.com.pe/')
        await delay(2000)

        await browser.close()
        console.log('Navegador cerrado')
    } catch (e) {
        console.log(e)
    }
}

(async() => {
    await runCrawler()
})()
