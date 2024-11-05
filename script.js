boton = document.getElementById("bt_cargar")




function actualizar_datos(){
    fetch('https://jsonplaceholder.typicode.com/todos/1')

    
    .then(res => res.json())
    .then(
        datos => {

            if(datos.completed == false){
                document.getElementById("dato3").textContent = '❌'
            }else{
                document.getElementById("dato3").textContent = '✔️'
            }
            document.getElementById("dato1").textContent = datos.id
            document.getElementById("dato2").textContent = datos.title
            

        }
    )
}



boton.addEventListener("click", actualizar_datos);