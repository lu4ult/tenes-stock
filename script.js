
/**********************     VARIABLES GENERALES Y OBJETOS      ***********************************************************************************/
let produccion = "https://friendly-bublanina-3c840e.netlify.app/" === window.location.href || "https://lu4ult.github.io/entregas-coderhouse-javascript/" === window.location.href;

let editSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>'
let deleteSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>'

class Producto {
    constructor(idMeli,titulo,precio,estado, fecha, imgUrl) {
        this.idMeli = String(idMeli);                                                                      //Como identificador del producto usaremos directamente el identificador de la publicación que nos da Mercadolibre.
        this.titulo = titulo.toLowerCase();
        this.precio = parseInt(precio);
        this.estado = Boolean(estado);
        this.fecha = fecha;
        this.imgUrl = imgUrl;
    }

    //método:                                                                                       //A implementar en un futuro
    // vender(cantidad) {
    //     this.stock = this.stock + cantidad;
    // }
    // activar() {
    //     this.estado = true;
    // }
    // pausar() {
    //     this.estado = false;
    // }
}

class Notificacion {
    constructor(fecha,descripcion) {
        this.fecha = fecha;
        this.descripcion = descripcion;
    }
}


//Agregamos de entrada algunos productos para que haya algo de contenido.
let productosBase =[
                new Producto("MLA-818528606","RAI",10429,false, new Date(),"ninguna"),
                new Producto("MLA-900797325","Bitcoin Ticker",6869,false, new Date(),"ninguna"),
                new Producto("MLA-1117926574","Timbre Programable",30000,true, new Date(),"ninguna"),
                new Producto("MLA-818539416","Adaptador programador esp-01",2659,true, new Date(),"ninguna"),
                new Producto("MLA-1167147839","Dimmer Módulo Desarrollo",11859,false, new Date(),"ninguna"),
                new Producto("MLA-918716646","Bitcoin Ticker Grande",18000,true, new Date(),"ninguna"),
                new Producto("MLA-818527058","Dimmer Control Con Arduino C/cruce Por Cero",4559,false, new Date(),"nada aqui")
                ];

let productos = [];
let notificaciones = [];
let papelera = [];


/**********************     LOCALSTORAGE      ***********************************************************************************/
let dataLocal = localStorage.getItem("tenes-stock_productos");
//Si es la primera vez que carga la página le cargamos algunos productos aleatorios.
if(dataLocal === null) {
    console.log("Creando data local random")
    productosBase = productosBase.sort((a,b) => 0.5 - Math.random());
    let cantidadRandom =  Math.floor(3 + Math.random() * (productosBase.length -2));
    let arrayRandomGenerado = [];
    do {
        arrayRandomGenerado.push(productosBase.pop());
        cantidadRandom--;
    }while(cantidadRandom);

    //notificaciones.push();
    localStorage.setItem("tenes-stock_productos",JSON.stringify(arrayRandomGenerado));
    localStorage.setItem("tenes-stock_notificaciones",JSON.stringify([new Notificacion(new Date(),"Hola! Bienvenido")]));
    }


let productosLeidosLocal = JSON.parse(localStorage.getItem("tenes-stock_productos"));
productosLeidosLocal.forEach(e => {
    productos.push(new Producto(e.idMeli,e.titulo,e.precio,e.estado,new Date(e.fecha),e.imgUrl));
});

let notificacionesLeidasLocal = JSON.parse(localStorage.getItem("tenes-stock_notificaciones"));
notificacionesLeidasLocal.forEach(e => {
    notificaciones.push(new Notificacion(new Date(e.fecha),e.descripcion));
});


/**********************     FUNCIONES GENERALES      ***********************************************************************************/

/*Dado un objeto fecha retornamos un string en formato dd/mm/aaaa para simplificar la lectura.*/
function obtenerFechaFormateada(fecha) {
    //return fecha.getDate()+"/"+(fecha.getMonth() +1)+"/"+fecha.getFullYear();
    return fecha.getDate()+"/"+(fecha.getMonth() +1)+"/"+fecha.getFullYear() + " - "+fecha.getHours()+":"+(fecha.getMinutes()<10?"0":"")+fecha.getMinutes()+":"+ (fecha.getSeconds()<10?"0":"") + fecha.getSeconds();
}

// function buscarProductosPorNombre() {
//     let tituloBuscado = prompt("Ingrese el nombre del producto a buscar:");
//     let encontrados = productos.filter(el => el.titulo.includes(tituloBuscado));
//     if(encontrados.length >= 1) {
//         console.log("Encontrados:");
//         mostrarProductos(encontrados,true);
//     }
//     else
//         console.log("Ups! No encontré nada...")
// }



let urlInput = document.getElementById("urlInput");
urlInput.onfocus = () => {
    urlInput.value="";
    urlInput.classList.remove("input-error");
};

let botonAgregarProductos = document.getElementById("botonAgregarProductos");
botonAgregarProductos.addEventListener("click", agregarProductos);

function agregarProductos() {
    let user = urlInput.value;
    //user = "MLA-1117926574";
    urlInput.value = "";
    const inicioId = user.indexOf("MLA") +3;                    //+3 por el "MLA"
    console.log("Inicio: " + inicioId);

    let meliIdEncontrado = "";


    //Ya que el codigo meli puede iniciar con "MLA" o con "MLA-", y su largo es variable pero son sólo números,
    //recorremos el string de la url desde la posición de URL y concatenamos los caracteres mientras que sean números,
    //Lo hacemos con un for desde 0 (desde el inicio del substring) hasta 15 (como una exageración de un código muy largo pero son de 14 o 15).

    for(let i=0;i<=15;i++) {
        let caracter = "";
        caracter += user[inicioId+i];
        if(!isNaN(parseInt(caracter))) {
            meliIdEncontrado += caracter;
        }
        console.log(caracter + "-" + parseInt(caracter));
    }

    console.log("Id hallado: " + meliIdEncontrado)

    if(inicioId < 0 || inicioId === 2) {
        urlInput.value = "Ups! Algo salió mal..."
        urlInput.classList.add("input-error");
    }

    //Algunas publicaciones tiene un ID de 8 dígitos que por alguna razón la API no devuelve nada.
    if(meliIdEncontrado.length <= 8) {
        urlInput.value = "Ups! Códigos de 8 dígitos no soportados.";
        urlInput.classList.add("input-error");
    }

    if(inicioId >= 0 && inicioId !== 2 && meliIdEncontrado.length>=9) {
        //Verificamos que el producto ingresado no esté actualmente cargado; para eso lo buscamos y esperamos hallar "undefined" ya que no encuentra nada, si encontramos un objeto, alertamos con swal descartamos la entrada.
        let yaSeEncuentra = productos.find( e => e.idMeli == ("MLA-" + meliIdEncontrado));
        console.log("ya se encuentra: " + yaSeEncuentra);
        if(yaSeEncuentra !== undefined) {
            setTimeout(() => {                                                          //Si no lo ejecutamos así (cargandolo al stack con tiempo 0), por alguna razón el Swal entra siempre en el .then y el modal desaparece instantáneamente.
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Este producto ya se encuentra cargado.',
                  })
              },0);
            return;
        }
        productos.push(new Producto("MLA-"+meliIdEncontrado,"titulo",Math.floor(Math.random()*1000),false,new Date()));
        //productos.reverse();
        notificaciones.push(new Notificacion(new Date(),"Nuevo producto agregado!"));
        reconstruirDom();
    }
}

function llamarApiMeli(idMeli) {
    let idMeliApi = idMeli.replace("-","");
    console.log("llamando: " + idMeliApi);
    fetch('https://api.mercadolibre.com/items/'+idMeliApi)
    .then(response => response.json())
    .then(data => {

        /* Recolección de data de la API */
        let _titulo = "";
        _titulo += String(data['title']);
        let _precio = data['price'];
        let _estado = data['status']==='active'?true:false;
        let _imgUrl = data ['pictures'][0]['secure_url'];

        /* Manipulación del DOM en función de la data de la API */


        //document.getElementById(idMeli+"-img").src = _imgUrl;
/*
        document.getElementById(idMeli+"-title").innerText = _titulo;
        document.getElementById(idMeli+"-price").innerText = _precio;
        document.getElementById(idMeli+"-status").innerText = _estado?"Activo":"Pausado";

        //Ejemplo: si el producto está activo hay que agregar class="estado-true" y quitar class="estado-false", por eso simplemente quitamos la clase negando el estado y la agregamos como esá el booleano.
        document.getElementById(idMeli+"-status").classList.remove("estado-" + String(!_estado));
        document.getElementById(idMeli+"-status").classList.add("estado-" + String(_estado));
*/
        /* Análisis y comparación de data de objetos y respuesta de la API */


        //aca estoy

        let objActualIndice = productos.findIndex(e => e.idMeli === idMeli);                                //Ya que recibimos el ID pero no el objeto, tenemos que encontrar el objeto en el array y capturarlo
        let objetoActual = productos[objActualIndice];
        //console.log(objetoActual);
        //console.log(objActualIndice + ": " + objetoActual.titulo + " - " + idMeli);

        objetoActual.titulo = _titulo;
        objetoActual.precio = _precio;                           //TODO: parsear
        objetoActual.imgUrl = _imgUrl;
        //Ahora si comparamos entre el estado actual del objeto y la respuesta de la API.

        if(_estado !== objetoActual.estado) {
            console.log("");
            //console.log(typeof(_estado) + "-" + typeof(objetoActual.estado));
            //console.log(_estado + "-" + objetoActual.estado)
            console.log("cambio de estado: " + objetoActual.titulo);
            //notificaciones.push(new Notificacion(new Date(),_titulo + " esta ahora " + _estado?"activo":"pausado"));

            //TODO: ver cómo refactorizar
            let str = _titulo;
            str += " está ahora ";
            str += _estado?"activo":"pausado";
            str += "!";
            notificaciones.push(new Notificacion(new Date(),str));


            setTimeout(() => {
                console.log("activando")
                reconstruirDom()
            },0);

            setTimeout(() => {
                showToastiFy(_estado, str);
            },100);
            //objetoActual.estado = _estado;
        }
        objetoActual.estado = _estado;

        // if(precio != objetoActual.precio) {
        //     console.log("el precio estaba distinto");
        //     reconstruirDom();
        // }


        //console.log(titulo + "-" + precio  + "-" + estado);

    })
}

/*
async function getImgUrlfromMeli(id_meli){
    //console.log("ID: " + id_meli);

    let id_meli_api = id_meli.replace("MLA-","MLA");

    const response = await fetch('https://api.mercadolibre.com/items/'+id_meli_api, {});
    //console.log(response);
    const data = await response.json();
    const img = data['secure_thumbnail'];
    //console.log(img);

    let imgSrc = document.getElementById(id_meli+"-img");
    imgSrc.src = img;

    //return url;
    //return "https://http2.mlstatic.com/D_709442-MLA32447175586_102019-I.jpg";
    return img;
}
*/



//Esto lo hice así manualmente porque el "findIndex" no hubo forma de hacerlo funcionar.
function findManual(id) {
    for(let i = 0; i<=productos.length;i++) {
        if(productos[i].idMeli === id)
            return i;
    }
    return -1;
}

function borrarProducto(_id) {
    //let indiceProductoBuscado = productos.findIndex(e => {e.idMeli == _id})

    let botonNotificaciones = document.getElementById("botonNotificaciones");
    botonNotificaciones.classList.add("recentlyUpdated");
    botonNotificaciones.classList.remove("recentlyUpdatedRemoved");

    setTimeout(() => {
        botonNotificaciones.classList.remove("recentlyUpdated");
        botonNotificaciones.classList.add("recentlyUpdatedRemoved");
    }, 500);

    let indiceProductoBuscado = findManual(_id);
    console.log("Indice encontrado: " + indiceProductoBuscado)

    notificaciones.push(new Notificacion(new Date(),productos[indiceProductoBuscado].titulo + " eliminado."));

    papelera.push(productos[indiceProductoBuscado]);
    document.getElementById("botonPapelera").classList.remove("oculto");
    productos.splice(indiceProductoBuscado,1);

    if(productos.length === 0) {
        console.log("sin elementos")
        document.getElementById("botonGeneradorRandom").classList.remove("oculto");
    }

    reconstruirDom();

    console.log("Papelera: ")
    console.log(papelera);
}

//TODO: chequear que todos los setTimeout sean realmente necesarios

function borrarNotificacion(indice) {
    notificaciones.splice(indice,1);

    //document.getElementById("notificacionesContenedor").innerHTML = "";         //No usamos reconstruirDom todo ya que sino "parpadean" los productos.
    //notificaciones.forEach(e => {cargarNotificacionADom(e);});

    reconstruirDom();

    if(notificaciones.length === 0) {
        document.getElementById("notificacionesContenedor").innerHTML ="<strong>Sin Notificaciones</strong>"
    }
}


function cargarNotificacionADom(objRecibido) {
    let notificacionesContenedor = document.getElementById("notificacionesContenedor");
    //<button onclick="borrarProducto(${objRecibido.idMeli});"></button>
    notificacionesContenedor.innerHTML += `
        <div><button onclick="borrarNotificacion('${notificaciones.indexOf(objRecibido)}');">${deleteSvg}</button><span>${obtenerFechaFormateada(objRecibido.fecha)} - ${objRecibido.descripcion}</span></div>
    `;

}

function cargarProductoADom(objRecibido) {
    let productosContenedor = document.getElementById("productosContenedor");

    let productoAgregar = `
    <div class="productos__individual">
        <div class="superior">
            <div class="identificador">
            <span>${objRecibido.idMeli}</span>
            </div>
            <div class="botones">
                <button onclick="borrarProducto('${objRecibido.idMeli}');">${deleteSvg}</button>
            </div>
        </div>
        <div class="principal">
            <span class="fecha">${obtenerFechaFormateada(objRecibido.fecha)}</span>
            <a class="titulo" id="${objRecibido.idMeli}-title" target="_blank" href="https://articulo.mercadolibre.com.ar/${objRecibido.idMeli}">${objRecibido.titulo}</a>
            <div class="img-container">
            <img src="${objRecibido.imgUrl}" id="${objRecibido.idMeli}-img">
            </div>
            <span class="precio" id="${objRecibido.idMeli}-price">${objRecibido.precio}</span>
        </div>
        <div class="abajo">
            <span class="estado estado-${objRecibido.estado}" id="${objRecibido.idMeli}-status" + ">${objRecibido.estado?"activo":"pausado"}</span>
        </div>
    </div>
    `;
    //getImgUrlfromMeli(objRecibido.idMeli);
    productosContenedor.innerHTML += productoAgregar;
}



function reconstruirDom() {
    console.log("reconstruyendo dom")
    document.getElementById("productosContenedor").innerHTML = "";
    document.getElementById("notificacionesContenedor").innerHTML = "";

    //notificaciones.reverse();
   // productos.sort((a,b) => b.fecha - a.fecha);                 //Ordenamos los productos por fecha en que se agregaron.
    notificaciones.sort((a,b) => b.fecha - a.fecha);

    productos.forEach(e => {
        //console.log(e)
        cargarProductoADom(e);
    });

    notificaciones.forEach(e => {
        cargarNotificacionADom(e);
    });

    localStorage.setItem("tenes-stock_productos",JSON.stringify(productos));
    localStorage.setItem("tenes-stock_notificaciones",JSON.stringify(notificaciones));

    //TODO: analizar si realmente tiene que hacerlo para evitar agregar al stack innecesariamente: utilizar querySelector(clase) y chequear si es undefined
    setTimeout(() => {
        botonNotificaciones.classList.remove("recentlyUpdated");
        botonNotificaciones.classList.add("recentlyUpdatedRemoved");
    }, 500);
}

let botonPresupuesto = document.getElementById("botonPresupuesto");
let inputPresupuesto = document.getElementById("presupuestoInput")

inputPresupuesto.onfocus = () => {
    inputPresupuesto.value = "";
    inputPresupuesto.classList.remove("input-success");
    inputPresupuesto.classList.remove("input-error");
    };

botonPresupuesto.addEventListener("click",presupuesto);
function presupuesto() {
    let productosSegunPresupuesto = [];

    let presupuestoUsuario = inputPresupuesto.value;
    if(isNaN(presupuestoUsuario)) {
        inputPresupuesto.value = "Ingrese sólo números";
        console.log("mal")
        return;
    }

    console.log(presupuestoUsuario + "$")
    productos.sort((a,b) => a.precio - b.precio);               //Ordenamos el array por precio
    console.log(productos[0].precio);

    /*
    Ahora analizamos cuántos productos podría comprar el usuario según su presupuesto.
    Existen tres escenarios:
    1: el presupuesto no alcanza para ningún producto
    2: el presupuesto alcanza para todos los productos.
    3: el presupuesto alcanza para algunos de los productos
    */

    //Escenario 1:
    if(presupuestoUsuario < productos[0].precio) {                                                  //Comparamos contra el primer elemento del array ya que ya se ordenó.
        document.getElementById("productosContenedor").innerHTML = "";
        inputPresupuesto.classList.add("input-error");
        inputPresupuesto.value = "Necesita "+ (productos[0].precio - presupuestoUsuario) + "$ para comprar al menos " + productos[0].titulo;
        console.log("Necesita "+ (productos[0].precio - presupuestoUsuario) + "$ para comprar al menos " + productos[0].titulo);
    }
    else {
        //Escenario 2:
        let sumatoriaTotal = 0;                                                                     //Calculamos el costo del carrito entero.
        for(let el of productos) {
            sumatoriaTotal += el.precio;
        }
        if(sumatoriaTotal <= presupuestoUsuario) {
            //console.log("Felicidades! Le alcanza para comprar todo!");
            reconstruirDom();
            inputPresupuesto.value = "Felicidades! Le alcanza para comprar todo!";
            inputPresupuesto.classList.add("input-success")
            //document.getElementById("productosContenedor").innerHTML = "Alcanza para todo";
        }

        //Escenario 3;
        else {
            //console.log("escenario 3");
            document.getElementById("productosContenedor").innerHTML = "";          //Eliminamos los productos para mostrar sólo los que alcanza el presupuesto.
            let indice = 0;
            let costoParcialCarrito = 0;
            //let mensajeParaUsuario = "";

            do {                                                                                    //Hacemos un do-while en lugar de while ya que alcana para almenos el primer producto (escenario 1).
                costoParcialCarrito += productos[indice].precio;
                //console.log("costo carrito: "+costoParcialCarrito);
                mensajeParaUsuario += ", "+productos[indice].titulo;
                //productosSegunPresupuesto.push(productos[indice]);
                cargarProductoADom(productos[indice]);
                console.log(productosSegunPresupuesto);
                indice++;
            }while((costoParcialCarrito + productos[indice].precio) <= presupuestoUsuario);         //Mientras que el costo del carrito sumado al siguiente producto sea menor al presupuesto.
            inputPresupuesto.classList.add("input-success")
            //inputPresupuesto.value = "Su presupuesto alcanza para: " + mensajeParaUsuario + " Y sobran " + (presupuestoUsuario - costoParcialCarrito) + " $";
            inputPresupuesto.value = "Su presupuesto alcanza sólo para los siguientes productos y sobran " + (presupuestoUsuario - costoParcialCarrito) + "$";
        }
    }
}



/**********************     NAVEGACIÓN      ***********************************************************************************/
let botonGeneradorRandom = document.getElementById("botonGeneradorRandom");
botonGeneradorRandom.onclick = () => {
    localStorage.clear("tenes-stock_productos");
    document.location.reload(true);
};

let botonNotificaciones = document.getElementById("botonNotificaciones");
botonNotificaciones.onclick = () => {
    document.getElementById("notificacionesContenedor").classList.toggle("oculto");
};


let botonDescargarCsv = document.getElementById("botonDescargarCsv");
botonDescargarCsv.onclick = () => {

    //Para poder descargar un archivo como CSV básicamente creamos una matriz bidimensional y luego se codifica y descarga con un <a>
    let textosDeNotas = [];
    for(let el of productos) {
        let nuevoArray = [el.idMeli,el.titulo,el.precio,el.estado?"ACTIVO":"INACTIVO",obtenerFechaFormateada(el.fecha)];
        textosDeNotas.push(nuevoArray);
    }

    let csvContent = "data:text/csv;charset=utf-8,";                            //https://stackoverflow.com/questions/14964035
    textosDeNotas.forEach(function(rowArray) {
        let row = rowArray.join(",");                                           //Transformamos esa matriz bidimensional en algo tipo CSV
        csvContent += row + "\r\n";
    });

    let encodedUri = encodeURI(csvContent);
    let anchorDescarga = document.getElementById("anchorDescargar");
    anchorDescarga.setAttribute("href", encodedUri);                            //Para poder descargar el archivo creado hay que "adjuntarlo" a un anchor, el cuál no está visible en el DOM.
    anchorDescarga.setAttribute("download", "productos.csv");
    anchorDescarga.click(); // This will download the data file named "my_data.csv".

};

let botonPapelera = document.getElementById("botonPapelera");
botonPapelera.onclick = () => {
    productos.push(papelera.pop());                                             //Eliminamos el último objeto de la papelera y lo restauramos al array principal.
    reconstruirDom();
    if(papelera.length === 0) {
        botonPapelera.classList.add("oculto");
    }
};



/**********************     TECLADO      ***********************************************************************************/

//Simulamos el hacer click al presionar enter según dónde esté haciendo foco
window.addEventListener('keydown', function (e) {
    if(e.key === "Enter" && document.getElementById("urlInput") === document.activeElement) {
        document.getElementById("botonAgregarProductos").click();
    }

    if(e.key === "Enter" && document.getElementById("presupuestoInput") === document.activeElement) {
        document.getElementById("botonPresupuesto").click();
    }
});


/**********************     SIMULACION      ***********************************************************************************/
function simulacion() {
    Swal.fire({
        title: 'Simular?',
        text: "Para simular y poder ver el funcionamiento de esta página, alteraremos el estado de los productos de manera aleatoria, y podrá ver cómo funciona el sistema.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar'
      }).then((result) => {
        if (result.isConfirmed) {
            //console.log(productos[0]);
            //productos[0].estado = false;
            productos.forEach(e => {
                let randomStatus = Boolean(Math.floor(Math.random()*10) %2);    //Generamos un número aleatorio entre 0 y 10, obtenemos el módulo y lo casteamos para obtener un false o true random.
                e.estado = randomStatus;
            });
            //console.log(productos[0]);
            reconstruirDom();
        }
      });

}


/******************************************************************************************************************************/

console.clear();
console.log("%cHola!","color:blue;font-size:2.5rem;border-bottom:1px solid blue;")
console.log("Produccion: " + produccion);


if(produccion) {
    productos.forEach(e => {
        llamarApiMeli(e.idMeli);
    });
}

reconstruirDom();

setInterval(() => {
    //console.log(".")
    //console.clear();
    productos.forEach(e => {
        setTimeout(() => {llamarApiMeli(e.idMeli)},Math.floor(10+Math.random()*300))
    });
    //reconstruirDom();
},1*10*1000);

//En el primer inicio llamamos a la API ni bien carga la página para que se muestre actualizado todo, y colocamos para que una vez por minuto llame a actualizar.


// Toastify({
//     text: "This is a toast",
//     duration: 3000
//     }).showToast();

function showToastiFy(status, titulo) {
    console.log("Toastify: " + status + "-" + titulo);
    Toastify({
        text: titulo,
        duration: 15000,
        //destination: "https://github.com/apvarun/toastify-js",
        //newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: status?"linear-gradient(to right, #00b09b, #96c93d)":"linear-gradient(to right, red, violet)",
        },
        offset: {
            x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "100px" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        //onClick: function(){} // Callback after click
      }).showToast();
}

//showToastiFy(true);

//llamarApiMeli("MLA-1117926574");