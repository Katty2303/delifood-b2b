const API_URL = "http://localhost:8080/api";
let miRol = "";

// RF1 - Login Simulado
async function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, password: pass })
        });

        if (res.ok) {
            const data = await res.json();
            miRol = data.rol;
            document.getElementById("seccion-login").style.display = "none";
            
            if (miRol === "CLIENTE") {
                document.getElementById("seccion-cliente").style.style.display = "block";
                actualizarTablas();
            } else if (miRol === "ADMIN") {
                document.getElementById("seccion-admin").style.display = "block";
                actualizarTablas();
            }
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        alert("Error: Asegúrate de que tu Backend de Spring Boot esté encendido en el puerto 8080");
    }
}

// RF2 - Crear Pedido
async function crearPedido() {
    const resName = document.getElementById("restaurante").value;
    const prod = document.getElementById("producto").value;
    const cant = document.getElementById("cantidad").value;

    await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreRestaurante: resName, producto: prod, cantidad: cant })
    });

    // Limpiar formulario y recargar
    document.getElementById("restaurante").value = "";
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    actualizarTablas();
}

// RF2 - Leer y renderizar tablas
async function actualizarTablas() {
    const res = await fetch(`${API_URL}/pedidos`);
    const pedidos = await res.json();

    if (miRol === "CLIENTE") {
        const tabla = document.getElementById("tabla-cliente");
        tabla.innerHTML = pedidos.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombreRestaurante}</td>
                <td>${p.producto}</td>
                <td>${p.cantidad}</td>
                <td><span class="badge ${p.estado === 'Pendiente' ? 'bg-warning' : 'bg-success'}">${p.estado}</span></td>
            </tr>
        `).join("");
    } else if (miRol === "ADMIN") {
        const tabla = document.getElementById("tabla-admin");
        tabla.innerHTML = pedidos.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombreRestaurante}</td>
                <td>${p.producto}</td>
                <td>${p.cantidad}</td>
                <td><span class="badge ${p.estado === 'Pendiente' ? 'bg-warning' : 'bg-success'}">${p.estado}</span></td>
                <td>
                    ${p.estado === 'Pendiente' 
                        ? `<button class="btn btn-sm btn-success" onclick="prepararPedido(${p.id})">Preparar</button>` 
                        : `<i class="fas fa-check-circle text-success"></i> Listo`}
                </td>
            </tr>
        `).join("");
    }
}

// RF2 - Actualizar Estado (Admin)
async function prepararPedido(id) {
    await fetch(`${API_URL}/pedidos/${id}/preparar`, { method: "PUT" });
    actualizarTablas();
}

function logout() {
    location.reload();
}