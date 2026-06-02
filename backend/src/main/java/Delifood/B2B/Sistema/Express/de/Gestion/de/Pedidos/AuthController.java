package Delifood.B2B.Sistema.Express.de.Gestion.de.Pedidos;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credenciales) {
        String usuario = credenciales.get("username");
        String clave = credenciales.get("password");
        
        Map<String, String> respuesta = new HashMap<>();

        // Cuenta de prueba 1: Cliente
        if ("cliente".equals(usuario) && "123".equals(clave)) {
            respuesta.put("rol", "CLIENTE");
            return ResponseEntity.ok(respuesta);
        } 
        // Cuenta de prueba 2: Administrador
        else if ("admin".equals(usuario) && "123".equals(clave)) {
            respuesta.put("rol", "ADMIN");
            return ResponseEntity.ok(respuesta);
        }

        // Si pone cualquier otra cosa, rechaza el ingreso
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
