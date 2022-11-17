coche1={
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

cliente1={
    nombre:"Juan",
    f_nacimiento: new Date(2001,11,1),
    email: "tusabe@gmail.com",
    telefono:782918293
}

producto={
    referencia: "P0003",
    tipo: "pantalon",
    paraMujer:true,
    talla: "L",
    precio: 20.99
}

producto2={referencia: "P0002",
tipo: "camisa",
paraHombre:true,
talla: "XL",
precio: 30.25
}

producto3={referencia: "P0001",
tipo: "camisa",
paraHombre:true,
talla: "XS",
precio: 20.99
}

//incrementar precios un 10%
db.productos.updateMany({
    precio: {$lt:25}},
    {
     $mul: { precio: 1.10 }})

//añadir propiedad de mujer=false
db.productos.updateMany({
    paraHombre:true},
    { $set:{paraMujer:false} })

//añadir propiedad de hombre=false
db.productos.updateMany({
    paraMujer:true},
    { $set:{paraHombre:false} })


//Cambiar un documento filtrando por "referencia"
db.productos.replaceOne({
    referencia:"P0003"}
    ,{referencia: "P0003",
    tipo: "pantalon",
    paraMujer:true,
    talla: "M",
    precio: 20.99
    })

db.productos.updateOne({
        referencia:"P0003"},
        { $set:{tienda: ["Rota", "Sevilla"], proveedor: {nombre: "Pantaloneros SA", nif:"B87654321", contacto:"Jose"}
    }})

db.productos.find({$and:[{referencia:1},{tienda:1},{proveedor:{nombre:1}}]})

//actualización de los productos indicanto el stock en cada tienda.

db.productos.update({"referencia":"P0001"},{$set:{"stock":[{"Jerez":32},{"Sevilla":12},{"Cordoba":"8"}]}})
db.productos.update({"referencia":"P0002"},{$set:{"stock":[{"Jerez":9},{"Chucena":5},{"Cordoba":"12"}]}})
db.productos.update({"referencia":"P0003"},{$set:{"stock":[{"Rota":9},{"Sevilla":15}]}})

//creacion de indices para referencia, talla y stock

db.productos.createIndex({'referencia':1})
db.productos.createIndex({'talla':1})
db.productos.createIndex({'stock':1})



//TEMA 4 BLOG NOTICIAS
db.usuario.insertOne({
    _id:'Frank_USA',
    'nombre_usuario': 'Frank_blog',
    'nombre': 'Frank',
    'cuenta_twitter': 'Frank_USA',
    'descripcion': 'blogger aficionado',
    'telefonos':[{'telefono1': 713128989},
    {'telefono2': 111111111}],
    'direccion':{'calle': 'Av. de los Castros',
    'numero': 2256,
    'cp': 39005,
    'ciudad': 'Santander'}
    })
    
    db.usuario.insertOne({
    _id:'Peter',
    'nombre_usuario': 'Peter_blog',
    'nombre': 'Peter',
    'cuenta_twitter': 'Pete',
    'descripcion': 'blogger aficionado',
    'telefonos':[{'telefono1': 808080808},
    {'telefono2': 432342432}],
    'direccion':{'calle': 'Av. de los Rios',
    'numero': 289,
    'cp': 38015,
    'ciudad': 'Santander'}
    })
    
    db.usuario.insertOne({
    _id:'Frank_USE',
    'nombre_usuario': 'Frank_blog',
    'nombre': 'Frank',
    'cuenta_twitter': 'Frank_USE',
    'descripcion': 'blogger aficionado',
    'telefonos':[{'telefono1': 713128989},{
    'telefono2': 840932834}],
    'direccion':{'calle': 'Av. de los Castros',
    'numero': 2256,
    'cp': 39005,
    'ciudad': 'Santander'}
    })
    
    //insert de noticias
    db.noticias.insertMany([
    {'titulo':'Te cagas', 'cuerpo':'me cago tela','fecha':new Date(), 'tags':['cago']}, 
    {'titulo':'No puede ser', 'cuerpo':'Wooooow','fecha':new Date(), 'tags':['wow']},
    {'titulo':'Cancion a mi abuela', 'cuerpo':'Mi abuela','fecha':new Date(), 'tags':['abuela']},
    {'titulo':'Increible', 'cuerpo':'illo esto es serio','fecha':new Date(), 'tags':['increible','serio']},
    {'titulo':'COSAS QUE POCA GENTE SABE', 'cuerpo':'no las digo','fecha':new Date(), 'tags':['cosas']},
    {'titulo':'duroduro', 'cuerpo':'puta.','fecha':new Date(), 'tags':[]},
    {'titulo':'La abuela mas bomba', 'cuerpo':'Es serio y es real','fecha':new Date(), 'tags':['abuela','serio']} ,
    {'titulo':'me cago', 'cuerpo':'aaaaaa','fecha':new Date(), 'tags':['cago']},
    {'titulo':'para de joder', 'cuerpo':'otra abuela mas pidiendo pastillas','fecha':new Date(), 'tags':['abuela']},
    {'titulo':'WOW la vd q no me lo esperaba', 'cuerpo':'paso de esto','fecha':new Date(), 'tags':['wow']},
    {'titulo':'illo q cansino', 'cuerpo':'paja','fecha':new Date(), 'tags':[]}]
    )

    //insert de COMENTARIOS
    db.comentarios.insertMany([{'fecha':new Date(), 'cuerpo':'JIJIJIJIJIJ'} , {'fecha':new Date(), 'cuerpo':'JAJAJAJAJAJ'}, {'fecha':new Date(), 'cuerpo':'Nooo'}, {'fecha':new Date(), 'cuerpo':'TE LO ESTAS PASANDO BIEN'},{'fecha':new Date(), 'cuerpo':'PESAO'} ,{'fecha':new Date(), 'cuerpo':'aaaaassjojaodpje'}  ])
    
    
    
        
//poner los ids de los autores en los comentarios
     db.comentarios.update({ _id:  ObjectId("637116a7ea0f09d5ff5a552c")},{$set:{'autor':'Peter'}})
     db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552d")},{$set:{'autor':'Frank_USA'}})
     db.comentarios.update({ _id:ObjectId("637116a7ea0f09d5ff5a552e")},{$set:{'autor':'Peter'}}) 
     db.comentarios.update({  _id: ObjectId("637116a7ea0f09d5ff5a552f")},{$set:{'autor':'Frank_USE'}})
     db.comentarios.update({  _id:ObjectId("637116a7ea0f09d5ff5a5530")},{$set:{'autor':'Peter'}})
    db.comentarios.update({  _id:ObjectId("637116a7ea0f09d5ff5a5531")},{$set:{'autor':'Frank_USA'}})
    
    
    //ids usuarios
    _id:'Frank_USA'
    _id:'Frank_USE'
    _id:'Peter'
    
//poner los ids de noticias en sus autores
    db.usuario.update({_id:'Frank_USA'},{$set:{'noticias':[ObjectId("636d0f7a6a9cdb90777698bb"), ObjectId("636d11286a9cdb90777698bf") , ObjectId("636d120f6a9cdb90777698c3") ]}})
    db.usuario.update({_id:'Frank_USE'},{$set:{'noticias':[ObjectId("636d0fef6a9cdb90777698bc"), ObjectId("636d10396a9cdb90777698bd"), ObjectId("636d10796a9cdb90777698be")]}})
    db.usuario.update({_id:'Peter'},{$set:{'noticias':[ObjectId("636d11be6a9cdb90777698c1") ]}})

//referencias de los comentarios que aparecen en cada noticia
     
     db.noticias.update({ _id: ObjectId("636d0f4e6a9cdb90777698ba") },{$set:{'comentarios':[ ObjectId("637116a7ea0f09d5ff5a552c"), ObjectId("637116a7ea0f09d5ff5a552f"), ObjectId("637116a7ea0f09d5ff5a5530")]}})
      db.noticias.update( { _id: ObjectId("636d0f7a6a9cdb90777698bb") },{$set:{'comentarios':[ObjectId("637116a7ea0f09d5ff5a552c"),ObjectId("637116a7ea0f09d5ff5a5530")]}})
        db.noticias.update({ _id: ObjectId("636d10396a9cdb90777698bd") },{$set:{'comentarios':[ObjectId("637116a7ea0f09d5ff5a552e")]}})
      db.noticias.update( { _id: ObjectId("636d10796a9cdb90777698be") },{$set:{'comentarios':[ ObjectId("637116a7ea0f09d5ff5a552d"),ObjectId("637116a7ea0f09d5ff5a552f")]}})
      db.noticias.update({ _id: ObjectId("636d11286a9cdb90777698bf") } ,{$set:{'comentarios':[ObjectId("637116a7ea0f09d5ff5a5530")]}})
      db.noticias.update({ _id: ObjectId("636d11be6a9cdb90777698c1") },{$set:{'comentarios':[  ObjectId("637116a7ea0f09d5ff5a5530"),  ObjectId("637116a7ea0f09d5ff5a552c")]}})
      db.noticias.update({ _id: ObjectId("636d12226a9cdb90777698c4") } ,{$set:{'comentarios':[ ObjectId("637116a7ea0f09d5ff5a552c") , ObjectId("637116a7ea0f09d5ff5a552d"),ObjectId("637116a7ea0f09d5ff5a552f") , ObjectId("637116a7ea0f09d5ff5a5531") ]}})
    
    //poner lo ids de las noticias en los comentarios
    db.comentarios.update({_id: ObjectId("637116a7ea0f09d5ff5a552c")},{$set:{'noticias':ObjectId("636d0f4e6a9cdb90777698ba")}})
    db.comentarios.update({ _id: ObjectId("637116a7ea0f09d5ff5a552d")},{$set:{'noticias':ObjectId("636d12226a9cdb90777698c4")}})
    db.comentarios.update({_id:ObjectId("637116a7ea0f09d5ff5a552e")},{$set:{'noticias':ObjectId("636d10396a9cdb90777698bd")}})
    db.comentarios.update({_id:ObjectId("637116a7ea0f09d5ff5a552f")},{$set:{'noticias':ObjectId("636d10796a9cdb90777698be") }})
    db.comentarios.update({_id:ObjectId("637116a7ea0f09d5ff5a5530")},{$set:{'noticias':ObjectId("636d0f4e6a9cdb90777698ba")}})
    db.comentarios.update({_id:ObjectId("637116a7ea0f09d5ff5a5531")},{$set:{'noticias':ObjectId("636d12226a9cdb90777698c4")}})
    
    //referencias los comentarios a cada usuario
    db.usuario.update({_id:'Frank_USA'},{$set:{'comentarios':[ ObjectId("637116a7ea0f09d5ff5a552d"), ObjectId("637116a7ea0f09d5ff5a5531")  ]}})
    db.usuario.update({_id:'Frank_USE'},{$set:{'comentarios':[  ObjectId("637116a7ea0f09d5ff5a552f")]}})
    db.usuario.update({_id:'Peter'},{$set:{'comentarios':[ObjectId("636d14c46a9cdb90777698c5"), ObjectId("637116a7ea0f09d5ff5a552e"), ObjectId("636d15106a9cdb90777698c9") ]}})
    
    //referencias de los autores en cada noticia
    db.noticias.update({ _id: ObjectId("636d0f7a6a9cdb90777698bb") },{$set:{'autor':'Frank_USA'}})
    db.noticias.update({_id: ObjectId("636d0fef6a9cdb90777698bc")},{$set:{'autor':'Frank_USE'}})
    db.noticias.update({ _id: ObjectId("636d10396a9cdb90777698bd")},{$set:{'autor':'Frank_USE'}})
    db.noticias.update({_id: ObjectId("636d10796a9cdb90777698be") },{$set:{'autor':'Frank_USE'}})
    db.noticias.update({_id: ObjectId("636d11286a9cdb90777698bf") },{$set:{'autor':'Frank_USA'}})
    db.noticias.update({_id: ObjectId("636d11be6a9cdb90777698c1") },{$set:{'autor':'Peter'}})
    db.noticias.update({_id: ObjectId("636d120f6a9cdb90777698c3")} ,{$set:{'autor':'Frank_USA'}})
    