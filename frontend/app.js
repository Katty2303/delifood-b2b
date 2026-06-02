// Dirección de nuestra API REST en Spring Boot
const API_URL = "http://localhost:8080/api";
let rolUsuarioActual = "";

// RF1 - Autenticación Simulada
async function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    try {
        const respuesta = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, password: pass })
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            rolUsuarioActual = data.rol; // Guardamos el rol obtenido ("CLIENTE" o "ADMIN")
            
            // Ocultamos la caja de login
            document.getElementById("seccion-login").style.display = "none";
            
            // Mostramos el panel que corresponda
            if (rolUsuarioActual === "CLIENTE") {
                document.getElementById("seccion-cliente").style.display = "block";
                cargarTablaPedidos();
            } else if (rolUsuarioActual === "ADMIN") {
                document.getElementById("seccion-admin").style.display = "block";
                cargarTablaPedidos();
            }
        } else {
            alert("Credenciales incorrectas. Intenta con cliente/123 o admin/123");
        }
    } catch (error) {
        alert("Error de conexión. Asegúrate de que tu Backend de Spring Boot esté encendido e iniciado en el puerto 8080.");
    }
}

// RF2 - Crear Pedido (Acción del Cliente)
async function crearPedido() {
    const rest = document.getElementById("restaurante").value;
    const prod = document.getElementById("producto").value;
    const cant = document.getElementById("cantidad").value;

    // Validación simple para que no envíe campos vacíos
    if (!rest || !prod || !cant) {
        alert("Por favor, completa todos los campos del pedido.");
        return;
    }

    try {
        await fetch(`${API_URL}/pedidos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombreRestaurante: rest, producto: prod, cantidad: parseInt(cant) })
        });

        // Limpiamos los campos del formulario tras el éxito
        document.getElementById("restaurante").value = "";
        document.getElementById("producto").value = "";
        document.getElementById("cantidad").value = "";
        
        // Refrescamos la tabla para ver el nuevo pedido inmediatamente
        cargarTablaPedidos();
    } catch (error) {
        alert("No se pudo registrar el pedido.");
    }
}

// RF2 - Leer Pedidos (Carga datos dinámicamente desde el Backend)
async function cargarTablaPedidos() {
    try {
        const respuesta = await fetch(`${API_URL}/pedidos`);
        const listaDePedidos = await respuesta.json();

        if (rolUsuarioActual === "CLIENTE") {
            const tabla = document.getElementById("tabla-cliente");
            tabla.innerHTML = listaDePedidos.map(p => `
                <tr>
                    <td><strong>#${p.id}</strong></td>
                    <td>${p.nombreRestaurante}</td>
                    <td>${p.producto}</td>
                    <td>${p.cantidad}</td>
                    <td><span class="badge ${p.estado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-success'}">${p.estado}</span></td>
                </tr>
            `).join("");
        } else if (rolUsuarioActual === "ADMIN") {
            const tabla = document.getElementById("tabla-admin");
            tabla.innerHTML = listaDePedidos.map(p => `
                <tr>
                    <td><strong>#${p.id}</strong></td>
                    <td>${p.nombreRestaurante}</td>
                    <td>${p.producto}</td>
                    <td>${p.cantidad}</td>
                    <td><span class="badge ${p.estado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-success'}">${p.estado}</span></td>
                    <td>
                        ${p.estado === 'Pendiente' 
                            ? `<button class="btn btn-xs btn-success py-0 px-2 fw-bold" style="font-size: 11px;" onclick="cambiarEstadoPedido(${p.id})">Preparar</button>` 
                            : `<span class="text-success small fw-bold"><i class="fa fa-check"></i> Listo</span>`}
                    </td>
                </tr>
            `).join("");
        }
    } catch (error) {
        console.error("Error al cargar la tabla: ", error);
    }
}

// RF2 - Actualizar Estado (Acción del Administrador)
async function cambiarEstadoPedido(id) {
    try {
        await fetch(`${API_URL}/pedidos/${id}/preparar`, { method: "PUT" });
        // Volvemos a cargar las tablas para mostrar el cambio de estado en vivo
        cargarTablaPedidos();
    } catch (error) {
        alert("Error al actualizar el estado del pedido.");
    }
}

// Función auxiliar para reiniciar la pantalla
function logout() {
    location.reload();
}