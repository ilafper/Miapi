$(document).ready(function () {

  // Mostrar todos los usuarios
  $(".usersall").click(() => {
    $.ajax({
      url: "http://localhost:5000/users", 
      type: "GET",
      success: function (result) {
        $(".contenido").empty();
        for (let usuario of result) {
          $(".contenido").append(`
            <section class="carta">
              <section class="izq">
                  <img src="/contento.png" alt="Foto del Alumno" class="foto_alumno">
              </section>
              <section class="der">
                  <p class="name">${usuario.nombre} ${usuario.ap1}</p>
                  <p class="direc">${usuario.direccion}</p>
                  <p class="dni">${usuario.dni}</p>
              </section>
            </section>
          `);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", status, error);
        $(".contenido").empty();
        $(".contenido").append("<p>Hubo un error al obtener los datos.</p>");
      },
    });
  });

  // Mostrar el formulario para crear un nuevo usuario
  $(".mostrarPrimer").click(() => {
    $(".formulario-nuevo").toggle();
  });

  // Crear nuevo usuario
  $(".enviar").click(function (e) {
    e.preventDefault();
    
    let nombre = $("#nombre").val();
    let ap1 = $("#ap1").val();
    let direccion = $("#direccion").val();
    let dni = $("#dni").val();

    // Validación de campos (puedes agregar más validaciones si es necesario)
    if (!nombre || !ap1 || !direccion || !dni) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    // Crear el nuevo usuario a través de una petición POST
    $.ajax({
      url: "http://localhost:5000/nuevo", // Tu endpoint para crear usuario
      type: "POST",
      data: JSON.stringify({
        nombre: nombre,
        ap1: ap1,
        direccion: direccion,
        dni: dni,
      }),
      contentType: "application/json",
      success: function (response) {
        alert("Usuario creado con éxito");
        // Limpiar el formulario después de crear el usuario
        $(".formulario-nuevo").hide(); // Ocultar el formulario después de crear el usuario 

        // Actualizar la lista de usuarios
        $(".usersall").click();
      },
      error: function (xhr, status, error) {
        console.error("Error:", status, error);
        alert("Hubo un error al crear el usuario");
      }
    });
  });

  /*BUSCAR*/
  $(".buscar").click(() => {
    const searchTerm = $(".patata").val().trim(); // Obtener valor del input
    if (!searchTerm) {
      alert("Por favor, ingresa un término para buscar.");
      return;
    }

    // Llamar al endpoint de búsqueda
    $.ajax({
      url: `http://localhost:5000/buscar?q=${encodeURIComponent(searchTerm)}`,
      type: "GET",
      success: function (result) {
        $(".contenido").empty(); // Limpiar resultados anteriores
        if (result.length === 0) {
          $(".contenido").append("<p>No se encontraron usuarios.</p>");
        } else {
          for (let usuario of result) {
            $(".contenido").append(`
              <section class="carta">
                <section class="izq">
                  <img src="/contento.png" alt="Foto del Alumno" class="foto_alumno">
                </section>
                <section class="der">
                  <p class="name">${usuario.nombre} ${usuario.ap1}</p>
                  <p class="direc">${usuario.direccion}</p>
                  <p class="dni">${usuario.dni}</p>
                </section>
              </section>
            `);
          }
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", status, error);
        alert("Hubo un error al realizar la búsqueda.");
      },
    });
  });

});