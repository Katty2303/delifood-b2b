package Delifood.B2B.Sistema.Express.de.Gestion.de.Pedidos;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*") // Crucial: Permite que tu frontend se conecte sin bloqueos de seguridad
public class PedidoController {

    // Creamos la lista en la memoria RAM para simular la Base de Datos
    private static List<Pedido> listaPedidos = new ArrayList<>();
    private static Long idAuto = 1L; // Auto-incrementable para los IDs

    // REQUERIMIENTO: Crear un pedido (Rol Cliente)
    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido nuevoPedido) {
        nuevoPedido.setId(idAuto++);
        nuevoPedido.setEstado("Pendiente"); // Todos los pedidos nacen en "Pendiente"
        listaPedidos.add(nuevoPedido);
        return ResponseEntity.ok(nuevoPedido);
    }

    // REQUERIMIENTO: Leer Pedidos (Admin ve todos, Cliente ve el historial)
    @GetMapping
    public ResponseEntity<List<Pedido>> listarPedidos() {
        return ResponseEntity.ok(listaPedidos);
    }

    // REQUERIMIENTO: Actualizar Estado (Rol Administrador presiona un botón)
    @PutMapping("/{id}/preparar")
    public ResponseEntity<Pedido> prepararPedido(@PathVariable Long id) {
        for (Pedido p : listaPedidos) {
            if (p.getId().equals(id)) {
                p.setEstado("Preparado"); // Cambiamos el estado a preparado
                return ResponseEntity.ok(p);
            }
        }
        return ResponseEntity.notFound().build(); // Si no encuentra el ID, avisa error
    }
}