package Delifood.B2B.Sistema.Express.de.Gestion.de.Pedidos;

public class Pedido {
    private Long id;
    private String nombreRestaurante;
    private String producto;
    private int cantidad;
    private String estado; // Puede ser "Pendiente" o "Preparado"

    // Constructor vacío obligatorio para Spring
    public Pedido() {}

    // Constructor con datos
    public Pedido(Long id, String nombreRestaurante, String producto, int cantidad, String estado) {
        this.id = id;
        this.nombreRestaurante = nombreRestaurante;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = estado;
    }

    // GETTERS Y SETTERS (Para que Spring pueda leer y escribir los datos)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombreRestaurante() { return nombreRestaurante; }
    public void setNombreRestaurante(String nombreRestaurante) { this.nombreRestaurante = nombreRestaurante; }

    public String getProducto() { return producto; }
    public void setProducto(String producto) { this.producto = producto; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
