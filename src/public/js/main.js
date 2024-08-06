

const socket = io(); 




const boton_agregar = document.getElementById("boton_agregar");

//guardo los elementos del formulario en un array

document.getElementById('boton_agregar').addEventListener('click', ()=>{ 


    // Obtener los datos del formulario
    const id = document.getElementById('form_id').value;
    const title = document.getElementById('form_title').value;
    const description = document.getElementById('form_description').value;
    const code = document.getElementById('form_code').value;
    const price = parseFloat(document.getElementById('form_price').value);
    const status = document.getElementById('form_status').checked;
    const stock = parseInt(document.getElementById('form_stock').value);
    const category = document.getElementById('form_category').value;

    // Crear un objeto con los datos del producto
    const product = {
     
      title: title,
      description: description,
      code: code,
      price: price,
      status: status,
      stock: stock,
      category: category, 
      thumbnails:[] 
    };

    console.log(product)
    socket.emit("createProduct", product);
    document.getElementById("product_form").reset();
    
});




socket.on("updateProducts", (arrayUsuarios) => {
 
    const cont_cards = document.getElementById('container');
    cont_cards.innerHTML = "";
    arrayUsuarios.forEach(item => {
     cont_cards.innerHTML+= `
        <div id="card-${item.id}" class="card" style="width: 18rem;">
        <div class="card-body" >
                <h5 id= "title" class="card-title">${item.title}</h5>
                <h6 id="category" class="card-subtitle mb-2 text-muted">${item.category}</h6>
                <p id= "code" class="card-text">code:  ${item.code}</p>
                <p id="price" class="card-text">$: ${item.price}</p>
                <a class="eliminar" data-id_product= ${item.id}>Eliminar</a>
            </div>
        </div>`

    });

   
  //---BORRAR PRODUCTO 
   
    // Asignar el event listener a los enlaces "Eliminar"
      document.querySelectorAll('.eliminar').forEach(el => {
            el.addEventListener('click', function(event) {
                    //recupero el id de cada producto

            let id_product = parseInt(this.getAttribute('data-id_product'));
            let card = document.getElementById(`card-${id_product}`);
            //borro el producto por id producto
            console.log(`Eliminar producto con ID: ${id_product}`);

          // Agrego clase de animacion
            card.classList.add('animate-scale');

            // Animo Escala  elimino
            setTimeout(() => {
                
              socket.emit("deleteProduct", id_product);
            }, 1000);
            

             });

     });


 });
