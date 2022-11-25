const fs = require('fs')
const path = require('path')

const puppeteer = require('puppeteer')
const delay = require('delay')

// Configuración del navegador
const configBrowser = {
    defaultViewport: {
        width: 1920,
        height: 1080
    },
    headless: false,
    args: ['--no-sandbox', '--ignore-certificate-errors'] //, '--window-size=1920,1080']
}

const runCrawler = async () => {
    try {
        const browser = await puppeteer.launch(configBrowser)

        console.log('Inicio de navegador')
        const page = await browser.newPage()
        await page.goto('https://www.planetadelibros.com.pe/')

        await page.waitForSelector('div.menu-tematiques-container')

        const subcategoriasArr = await page.evaluate(() => {
            const tematicas = document.querySelectorAll('div.menu-tematiques-container > div > ul > li > ul > li')
            const subcategorias = []
            tematicas.forEach((tematica) => {
                const nombre = tematica.querySelector('a').innerText
                const url = tematica.querySelector('a').href
                subcategorias.push({ nombre, url })
            })

            return subcategorias
        })

        const libros = []
        for (const subcategoria of subcategoriasArr) {
            // console.log(subcategoria.nombre)
            await page.goto(subcategoria.url)
            await page.waitForSelector('div.contenidor-tematicas > div.resultat-cercador > ul > li', { timeout: 20000})

            const librosSubCategoriaArr = await page.evaluate(() => {
                const tematicas = document.querySelectorAll('div.contenidor-tematicas > div.resultat-cercador > ul > li')
                const librosSubCategoria = []
                tematicas.forEach((tematica) => {
                    const urlImagen = tematica.querySelector('a > div.portada > img').getAttribute('src')
                    const titulo = tematica.querySelector('a > div.titol').innerText
                    const autor = tematica.querySelector('div.autors').innerText
                    librosSubCategoria.push({
                        // subcategoria: subcategoria.nombre,
                        urlImagen,
                        titulo,
                        autor
                    })
                })
    
                return librosSubCategoria
            })

            // await page.click('div.paginacio-seguent > a > i')

            libros.push(...librosSubCategoriaArr)

        }

        console.log(libros)

        // console.log(subcategoriasArr)

        // Leer el archivo notas.txt
        fs.writeFileSync(path.join(__dirname, 'libros.json'), JSON.stringify(libros, null, 2), { encoding: 'utf-8'}, (error) => {
            if (error) console.log(error)
        })

        await delay(4000)

        await browser.close()
        console.log('Navegador cerrado')
    } catch (e) {
        console.log(e)
    }
}

(async () => {
    await runCrawler()
})()
