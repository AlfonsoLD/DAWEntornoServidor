coche1 = {
    matricula: "2839129CV",
    marca: "Renault",
    modelo: "Megan",
    vesiones: [
        {
            sport: true,
            confort: false
        }
    ],
    kms: 12,
    fecha_matriculacion: 2021
}

cliente1 = {
    nombre: "Juan",
    f_nacimiento: new Date(2001, 11, 1),
    email: "tusabe@gmail.com",
    telefono: 782918293
}

producto = {
    referencia: "P0003",
    tipo: "pantalon",
    paraMujer: true,
    talla: "L",
    precio: 20.99
}

producto2 = {
    referencia: "P0002",
    tipo: "camisa",
    paraHombre: true,
    talla: "XL",
    precio: 30.25
}

producto3 = {
    referencia: "P0001",
    tipo: "camisa",
    paraHombre: true,
    talla: "XS",
    precio: 20.99
}

//incrementar precios un 10%
db.productos.updateMany({
    precio: { $lt: 25 }
},
    {
        $mul: { precio: 1.10 }
    })

//añadir propiedad de mujer=false
db.productos.updateMany({
    paraHombre: true
},
    { $set: { paraMujer: false } })

//añadir propiedad de hombre=false
db.productos.updateMany({
    paraMujer: true
},
    { $set: { paraHombre: false } })


//Cambiar un documento filtrando por "referencia"
db.productos.replaceOne({
    referencia: "P0003"
}
    , {
        referencia: "P0003",
        tipo: "pantalon",
        paraMujer: true,
        talla: "M",
        precio: 20.99
    })

db.productos.updateOne({
    referencia: "P0003"
},
    {
        $set: {
            tienda: ["Rota", "Sevilla"], proveedor: { nombre: "Pantaloneros SA", nif: "B87654321", contacto: "Jose" }
        }
    })

db.productos.find({ $and: [{ referencia: 1 }, { tienda: 1 }, { proveedor: { nombre: 1 } }] })

//actualización de los productos indicanto el stock en cada tienda.

db.productos.update({ "referencia": "P0001" }, { $set: { "stock": [{ "Jerez": 32 }, { "Sevilla": 12 }, { "Cordoba": "8" }] } })
db.productos.update({ "referencia": "P0002" }, { $set: { "stock": [{ "Jerez": 9 }, { "Chucena": 5 }, { "Cordoba": "12" }] } })
db.productos.update({ "referencia": "P0003" }, { $set: { "stock": [{ "Rota": 9 }, { "Sevilla": 15 }] } })

//creacion de indices para referencia, talla y stock
db.productos.createIndex({ 'referencia': 1 })
db.productos.createIndex({ 'talla': 1 })
db.productos.createIndex({ 'stock': 1 })
db.libros.insertOne({
    titulo: "Secuestrado",
    descripcion: "Las aventuras de David Balfour",
    autor: "Robert Louis Stevenson",
    anioPublicacion: 2002,
    genero: ["acción"],
    paginas: 255,
    editorial: "Addison‐Wesley",
    disponible: false,
    precio: 15.95
})

db.libros.insertMany([
    {
        titulo: "Secuestrada por el peligro",
        descripcion: "Traición, venganza y amor",
        autor: "Melissa Hall",
        anioPublicacion: 2017,
        genero: ["romántica", "acción"],
        paginas: 318,
        editorial: "Mozaika Publications",
        disponible: true,
        precio: 19.95
    },
    {
        titulo: "La trama",
        descripcion: "Enredo político",
        autor: "Carlos Alberto Montaner",
        anioPublicacion: 2000,
        genero: ["histórica"],
        paginas: 187,
        editorial: "Planeta",
        disponible: false,
        precio: 18.95
    },
    {
        titulo: "Historias de mujeres casadas",
        descripcion: "Amor, matrimonio, amantes y amistad",
        autor: "Cristina Campos",
        anioPublicacion: 2021,
        genero: ["romántica"],
        paginas: 464,
        editorial: "Planeta",
        disponible: true,
        precio: 25.95
    }])

//que contenga la palabra amor
db.libros.find({ descripcion: { $in: [/Amor/] } }, { titulo: 1, descripcion: 1, autor: 1 }).pretty()
//mas de 200 paginas menos de 20 euros
db.libros.find({ paginas: { $gt: 200 }, precio: { $lt: 20 } }, { titulo: 1, editorial: 1, anioPublicacion: 1, precio: 1, _id: 0 }).pretty()
//ENTRE 200 y 400 pag y disponible true
db.libros.find({ paginas: { $gte: 200 }, disponible: true, paginas: { $lte: 400 } }, { titulo: 1, editorial: 1, anioPublicacion: 1, precio: 1, _id: 0 }).pretty()
//romantica y accion
db.libros.find({ genero: { $in: ["romántica", "acción"] } }, { titulo: 1, autor: 1, disponible: 1, precio: 1, _id: 0 }).sort({ precio: 1 }).pretty()
//romantica o accion, 
db.libros.find({ $and: [{ genero: { $in: ["romántica"] }, genero: { $in: ["acción"] } }] }, { titulo: 1, autor: 1, anioPublicacion: 1, precio: 1, _id: 0 }).sort({ precio: 1 }).pretty()
//anio 1998 o 2005
db.libros.find({ $or: [{ anioPublicacion: 1998 }, { anioPublicacion: 2005 }] }, { titulo: 1, autor: 1, anioPublicacion: 1, precio: 1, _id: 0 }).pretty()
//anio >2001 precio mas q 25
db.libros.find({ anioPublicacion: { $gte: 2001 }, precio: { $gte: 25 } }, { titulo: 1, anioPublicacion: 1, precio: 1, disponible: 1, _id: 0 }).sort({ anioPublicacion: 1 }).pretty()
//editorial planeta anio>2000
db.libros.find({ anioPublicacion: { $gte: 2000 }, editorial: "Planeta", disponible: false }, { titulo: 1, anioPublicacion: 1, precio: 1, disponible: 1, _id: 0 }).pretty()
db.libros.find({ anioPublicacion: { $gte: 2000 }, editorial: "Planeta", disponible: true }, { titulo: 1, anioPublicacion: 1, precio: 1, disponible: 1, _id: 0 }).pretty()
//anio>2000 y precio +20%
db.libros.find({ anioPublicacion: { $gte: 2000 } }, { titulo: 1, anioPublicacion: 1, precio: 1, disponible: 1, _id: 0 }).sort({ precio: -1 }).pretty()
db.libros.updateMany({ anioPublicacion: { $gte: 2000 } }, { $mul: { precio: 1.20 } })
//cambiar genero accion por aventuras
db.libros.updateMany({ genero: { $in: ["acción"] } }, { $push: { genero: "aventuras" } })
db.libros.updateMany({ genero: { $in: ["acción"] } }, { $pull: { genero: "acción" } })


db.alumnos.insertMany(
    [
        {
            id_alumno: "20200001",
            nombre: "José",
            apellido1: "Ruiz",
            apellido2: "Mateo",
            edad: 18,
            telefono: ["954444444", "600123456"],
            id_curso: [11]
        },
        {
            id_alumno: "20200002",
            nombre: "Cristina",
            apellido1: "Bolancé",
            apellido2: "Jiménez",
            edad: 19,
            telefono: ["600234567"],
            id_curso: [11, 22]
        },
        {
            id_alumno: "20200003",
            nombre: "Felipe",
            apellido1: "Díaz",
            apellido2: "Perez",
            edad: 18,
            telefono: ["954354444", "601123456"],
            id_curso: [11]
        },
        {
            id_alumno: "20200004",
            nombre: "Lucía",
            apellido1: "García",
            apellido2: "Jiménez",
            edad: 19,
            telefono: ["601234567"],
            id_curso: [22]
        },
        {
            id_alumno: "20200005",
            nombre: "Juan",
            apellido1: "Rivera",
            apellido2: "Lopez",
            edad: 28,
            telefono: ["954554444", "602123456"],
            id_curso: [12]
        },
        {
            id_alumno: "20200006",
            nombre: "Carlota",
            apellido1: "García",
            apellido2: "Mendez",
            edad: 21,
            telefono: ["602234567"],
            id_curso: [11, 22]
        },
        {
            id_alumno: "20200007",
            nombre: "Francisco",
            apellido1: "López",
            apellido2: "Perez",
            edad: 18,
            telefono: ["954354554", "602123456"],
            id_curso: [11]
        },
        {
            id_alumno: "20200008",
            nombre: "Lidia",
            apellido1: "Carrillo",
            apellido2: "González",
            edad: 19,
            telefono: ["602234267"],
            id_curso: [11]
        }])

db.profesores.insertMany(
    [
        {
            id_profesor: "11111111A",
            nombre: "Angelica",
            apellido1: "Mora",
            apellido2: "Nuñez",
            rol: "tutor",
            id_curso: [21, 22]
        },
        {
            id_profesor: "22222222B",
            nombre: "Antonio",
            apellido1: "González",
            apellido2: "Casado",
            rol: "tutor",
            id_curso: [21, 22]
        },
        {
            id_profesor: "33333333C",
            nombre: "José Maria",
            apellido1: "García",
            apellido2: "Durán",
            rol: "profesor",
            id_curso: [21, 22]
        },
        {
            id_profesor: "44444444D",
            nombre: "Carmen",
            apellido1: "García",
            apellido2: "Rufino",
            rol: "profesor",
            id_curso: [11, 12, 21, 22]
        }
    ]
)
db.cursos.insertMany([
    {
        id_curso: [11],
    nombreCurso: "DAW1",
    horario: "Mañana"
    },
    {
        id_curso: [12],
    nombreCurso: "DAW1",
    horario: "Tarde"
    },
    {
        id_curso: [21],
    nombreCurso: "DAW2",
    horario: "Mañana"
    },
    {
        id_curso: [22],
    nombreCurso: "DAW2",
    horario: "Tarde"
    },
])

//Index
db.alumnos.createIndex({ 'apellido1': -1 , name:"Apellidos_alumnos"})
db.profesores.createIndex({ 'apellido1': 1 })

//Agregaciones
db.profesores.aggregate([{$count:{$match:{rol:"profesor"}}}])

//TEMA 4 BLOG NOTICIAS
db.usuario.insertOne({
    _id: 'Frank_USA',
    'nombre_usuario': 'Frank_blog',
    'nombre': 'Frank',
    'cuenta_twitter': 'Frank_USA',
    'descripcion': 'blogger aficionado',
    'telefonos': [{ 'telefono1': 713128989 },
    { 'telefono2': 111111111 }],
    'direccion': {
        'calle': 'Av. de los Castros',
        'numero': 2256,
        'cp': 39005,
        'ciudad': 'Santander'
    }
})

db.usuario.insertOne({
    _id: 'Peter',
    'nombre_usuario': 'Peter_blog',
    'nombre': 'Peter',
    'cuenta_twitter': 'Pete',
    'descripcion': 'blogger aficionado',
    'telefonos': [{ 'telefono1': 808080808 },
    { 'telefono2': 432342432 }],
    'direccion': {
        'calle': 'Av. de los Rios',
        'numero': 289,
        'cp': 38015,
        'ciudad': 'Santander'
    }
})

db.usuario.insertOne({
    _id: 'Frank_USE',
    'nombre_usuario': 'Frank_blog',
    'nombre': 'Frank',
    'cuenta_twitter': 'Frank_USE',
    'descripcion': 'blogger aficionado',
    'telefonos': [{ 'telefono1': 713128989 }, {
        'telefono2': 840932834
    }],
    'direccion': {
        'calle': 'Av. de los Castros',
        'numero': 2256,
        'cp': 39005,
        'ciudad': 'Santander'
    }
})

//insert de noticias
db.noticias.insertMany([
    { 'titulo': 'Te cagas', 'cuerpo': 'me cago tela', 'fecha': new Date(), 'tags': ['cago'] },
    { 'titulo': 'No puede ser', 'cuerpo': 'Wooooow', 'fecha': new Date(), 'tags': ['wow'] },
    { 'titulo': 'Cancion a mi abuela', 'cuerpo': 'Mi abuela', 'fecha': new Date(), 'tags': ['abuela'] },
    { 'titulo': 'Increible', 'cuerpo': 'illo esto es serio', 'fecha': new Date(), 'tags': ['increible', 'serio'] },
    { 'titulo': 'COSAS QUE POCA GENTE SABE', 'cuerpo': 'no las digo', 'fecha': new Date(), 'tags': ['cosas'] },
    { 'titulo': 'duroduro', 'cuerpo': 'puta.', 'fecha': new Date(), 'tags': [] },
    { 'titulo': 'La abuela mas bomba', 'cuerpo': 'Es serio y es real', 'fecha': new Date(), 'tags': ['abuela', 'serio'] },
    { 'titulo': 'me cago', 'cuerpo': 'aaaaaa', 'fecha': new Date(), 'tags': ['cago'] },
    { 'titulo': 'para de joder', 'cuerpo': 'otra abuela mas pidiendo pastillas', 'fecha': new Date(), 'tags': ['abuela'] },
    { 'titulo': 'WOW la vd q no me lo esperaba', 'cuerpo': 'paso de esto', 'fecha': new Date(), 'tags': ['wow'] },
    { 'titulo': 'illo q cansino', 'cuerpo': 'paja', 'fecha': new Date(), 'tags': [] }]
)

//insert de COMENTARIOS
db.comentarios.insertMany([{ 'fecha': new Date(), 'cuerpo': 'JIJIJIJIJIJ' }, { 'fecha': new Date(), 'cuerpo': 'JAJAJAJAJAJ' }, { 'fecha': new Date(), 'cuerpo': 'Nooo' }, { 'fecha': new Date(), 'cuerpo': 'TE LO ESTAS PASANDO BIEN' }, { 'fecha': new Date(), 'cuerpo': 'PESAO' }, { 'fecha': new Date(), 'cuerpo': 'aaaaassjojaodpje' }])




//poner los ids de los autores en los comentarios
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552c") }, { $set: { 'autor': 'Peter' } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552d") }, { $set: { 'autor': 'Frank_USA' } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552e") }, { $set: { 'autor': 'Peter' } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552f") }, { $set: { 'autor': 'Frank_USE' } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a5530") }, { $set: { 'autor': 'Peter' } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a5531") }, { $set: { 'autor': 'Frank_USA' } })


//ids usuarios
_id: 'Frank_USA'
_id: 'Frank_USE'
_id: 'Peter'

//poner los ids de noticias en sus autores
db.usuario.update({ _id: 'Frank_USA' }, { $set: { 'noticias': [ObjectId("636d0f7a6a9cdb90777698bb"), ObjectId("636d11286a9cdb90777698bf"), ObjectId("636d120f6a9cdb90777698c3")] } })
db.usuario.update({ _id: 'Frank_USE' }, { $set: { 'noticias': [ObjectId("636d0fef6a9cdb90777698bc"), ObjectId("636d10396a9cdb90777698bd"), ObjectId("636d10796a9cdb90777698be")] } })
db.usuario.update({ _id: 'Peter' }, { $set: { 'noticias': [ObjectId("636d11be6a9cdb90777698c1")] } })

//referencias de los comentarios que aparecen en cada noticia

db.noticias.update({ _id: ObjectId("636d0f4e6a9cdb90777698ba") }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a552c"), ObjectId("637116a7ea0f09d5ff5a552f"), ObjectId("637116a7ea0f09d5ff5a5530")] } })
db.noticias.update({ _id: ObjectId("636d0f7a6a9cdb90777698bb") }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a552c"), ObjectId("637116a7ea0f09d5ff5a5530")] } })
db.noticias.update({ _id: ObjectId("636d10396a9cdb90777698bd") }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a552e")] } })
db.noticias.update({ _id: ObjectId("636d10796a9cdb90777698be") }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a552d"), ObjectId("637116a7ea0f09d5ff5a552f")] } })
db.noticias.update({ _id: ObjectId("636d11286a9cdb90777698bf") }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a5530")] } })
db.noticias.update({ _id: ObjectId("636d11be6a9cdb90777698c1") }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a5530"), ObjectId("637116a7ea0f09d5ff5a552c")] } })
db.noticias.update({ _id: ObjectId("636d12226a9cdb90777698c4") }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a552c"), ObjectId("637116a7ea0f09d5ff5a552d"), ObjectId("637116a7ea0f09d5ff5a552f"), ObjectId("637116a7ea0f09d5ff5a5531")] } })

//poner lo ids de las noticias en los comentarios
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552c") }, { $set: { 'noticias': ObjectId("636d0f4e6a9cdb90777698ba") } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552d") }, { $set: { 'noticias': ObjectId("636d12226a9cdb90777698c4") } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552e") }, { $set: { 'noticias': ObjectId("636d10396a9cdb90777698bd") } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552f") }, { $set: { 'noticias': ObjectId("636d10796a9cdb90777698be") } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a5530") }, { $set: { 'noticias': ObjectId("636d0f4e6a9cdb90777698ba") } })
db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a5531") }, { $set: { 'noticias': ObjectId("636d12226a9cdb90777698c4") } })

//referencias los comentarios a cada usuario
db.usuario.update({ _id: 'Frank_USA' }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a552d"), ObjectId("637116a7ea0f09d5ff5a5531")] } })
db.usuario.update({ _id: 'Frank_USE' }, { $set: { 'comentarios': [ObjectId("637116a7ea0f09d5ff5a552f")] } })
db.usuario.update({ _id: 'Peter' }, { $set: { 'comentarios': [ObjectId("636d14c46a9cdb90777698c5"), ObjectId("637116a7ea0f09d5ff5a552e"), ObjectId("636d15106a9cdb90777698c9")] } })

//referencias de los autores en cada noticia
db.noticias.update({ _id: ObjectId("636d0f7a6a9cdb90777698bb") }, { $set: { 'autor': 'Frank_USA' } })
db.noticias.update({ _id: ObjectId("636d0fef6a9cdb90777698bc") }, { $set: { 'autor': 'Frank_USE' } })
db.noticias.update({ _id: ObjectId("636d10396a9cdb90777698bd") }, { $set: { 'autor': 'Frank_USE' } })
db.noticias.update({ _id: ObjectId("636d10796a9cdb90777698be") }, { $set: { 'autor': 'Frank_USE' } })
db.noticias.update({ _id: ObjectId("636d11286a9cdb90777698bf") }, { $set: { 'autor': 'Frank_USA' } })
db.noticias.update({ _id: ObjectId("636d11be6a9cdb90777698c1") }, { $set: { 'autor': 'Peter' } })
db.noticias.update({ _id: ObjectId("636d120f6a9cdb90777698c3") }, { $set: { 'autor': 'Frank_USA' } })




