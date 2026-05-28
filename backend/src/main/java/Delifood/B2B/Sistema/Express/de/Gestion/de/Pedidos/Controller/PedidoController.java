package Delifood.B2B.Sistema.Express.de.Gestion.de.Pedidos.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Delifood.B2B.Sistema.Express.de.Gestion.de.Pedidos.Model.Pedido;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*") // Esto permite que tu Frontend se conecte sin bloqueos

public class PedidoController {
// Lista en memoria RAM para guardar los pedidos
    private static List<Pedido> listaPedidos = new ArrayList<>();
    private static Long idAuto = 1L;

    // RF2: Crear Pedido (Cliente)
    @PostMapping
    public ResponseEntity<Pedido> crear(@RequestBody Pedido nuevoPedido) {
        nuevoPedido.setId(idAuto++);
        nuevoPedido.setEstado("Pendiente");
        listaPedidos.add(nuevoPedido);
        return ResponseEntity.ok(nuevoPedido);
    }

    // RF2: Leer Pedidos (Admin ve todos, Cliente simula verlos)
    @GetMapping
    public ResponseEntity<List<Pedido>> listar() {
        return ResponseEntity.ok(listaPedidos);
    }

    // RF2: Actualizar Estado (Admin cambia a Preparado)
    @PutMapping("/{id}/preparar")
    public ResponseEntity<Pedido> preparar(@PathVariable Long id) {
        for (Pedido p : listaPedidos) {
            if (p.getId().equals(id)) {
                p.setEstado("Preparado");
                return ResponseEntity.ok(p);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
