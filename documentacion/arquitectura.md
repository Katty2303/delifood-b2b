# Documentación de Arquitectura - Delifood B2B

El sistema utiliza una arquitectura desacoplada (Cliente-Servidor) donde el Frontend y el Backend están completamente separados.

## Tecnologías Seleccionadas
* **Backend:** Java con Spring Boot (API REST).
* **Frontend:** HTML5, JavaScript Vanilla y Bootstrap mediante CDN.
* **Persistencia:** En memoria RAM (ArrayList) para optimizar tiempos de entrega.

## Diagrama de Componentes
```mermaid
graph LR
    subgraph Frontend [Interfaz Web]
        A[index.html + Bootstrap] --> B[app.js]
    end
    subgraph Backend [Servidor Spring Boot]
        C[AuthController]
        D[PedidoController]
        E[PedidoService]
    end
    subgraph RAM [Persistencia]
        F[(ArrayList Java)]
    end
    B -->|Peticiones HTTP / JSON| C
    B -->|Peticiones HTTP / JSON| D
    D --> E
    E --> F