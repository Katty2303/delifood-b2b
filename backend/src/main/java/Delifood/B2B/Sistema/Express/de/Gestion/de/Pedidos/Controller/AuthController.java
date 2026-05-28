package Delifood.B2B.Sistema.Express.de.Gestion.de.Pedidos.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credenciales) {
        String usuario = credenciales.get("username");
        String clave = credenciales.get("password");
        Map<String, String> respuesta = new HashMap<>();

        if ("cliente".equals(usuario) && "123".equals(clave)) {
            respuesta.put("rol", "CLIENTE");
            return ResponseEntity.ok(respuesta);
        } else if ("admin".equals(usuario) && "123".equals(clave)) {
            respuesta.put("rol", "ADMIN");
            return ResponseEntity.ok(respuesta);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
