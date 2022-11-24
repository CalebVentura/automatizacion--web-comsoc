const configuracion = {
    headless: true,
}

let textoEncontrado = ''
// var edad = 23
textoEncontrado = textoEncontrado + 'Caleb Ventura'
textoEncontrado = textoEncontrado + ' IEEE'

// console.log(textoEncontrado)


const parsearTexto = () => {

    const texto = '$20 /mo'
    const precio = texto.match(/\d{2}/g)
    return precio
}
// console.log(parsearTexto())


// Manejo de errores
try {
    const name = 'Carlos'
    name = 'Caleb'
} catch (error) {
    // console.log(error.message)
    console.log('Hay un error, corrige!!!')
}