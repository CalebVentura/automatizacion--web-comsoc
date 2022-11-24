// Leer, escribir archivos
const fs = require('fs')

// Rutas -> Escoger la ubicación de un archivo para leer o guardar
const path = require('path')

const root = path.dirname(require.main.filename)


// Leer el archivo notas.txt
fs.readFile(path.join(root, 'notas.txt'), 'utf-8', (error, data) => {
    if (error) console.log(error)
    console.log(data)
})