import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoModel } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  // Requerimos el listado de los productos - Tabla
  productos: ProductoModel[] = [];

  // Un producto para trabajar con el registro - Formulario
  producto: ProductoModel = {
    id: 0,
    nombre: "",
    precio: 0,
    categoria: "",
  };

  // Saber si estamos en edición o guardar producto
  enEdicion = false;

  // Para el mensaje de las validaciones
  mensajeModal: string = '';
  modal!: bootstrap.Modal; 

  // Producto a eliminar
  productoSeleccionado: ProductoModel | null = null;

  // Para cancelar edicion
  mostrarBoton = false;

  constructor(private productoService: ProductoService) {
    
  }

  ngOnInit(): void {
      this.listar();
  }

  listar() {
    // Listado de productos
    this.productos = this.productoService.findAll();
  }

  guardar() {
    if (this.producto.nombre.length >= 3 && this.producto.precio > 0){
      // Validar que tenga longitud minima de 3 letras y precio mayor que cero
      if (this.enEdicion) {
        this.productoService.update({
          ...this.producto
        });
        this.limpiar();
        this.enEdicion = false;
        this.mostrarBoton = false;
      } else {
        this.productoService.save({
          ...this.producto
        });
        this.limpiar();
      }
    } else if (this.producto.nombre.length < 3 && this.producto.precio > 0) {
      this.mensajeModal = 'El nombre debe tener una longitud minima de 3 caracteres.';
      const elementoModal = document.getElementById('modal');

      this.modal = new bootstrap.Modal(elementoModal!);

      this.modal.show();
    } else {
      this.mensajeModal = 'El precio debe ser mayor que cero.';
      const elementoModal = document.getElementById('modal');

      this.modal = new bootstrap.Modal(elementoModal!);

      this.modal.show();
    }

  }

  actualizar(productoActualizar: ProductoModel) {
    this.mostrarBoton = true;
    this.enEdicion = true;
    this.producto = {
      ...productoActualizar
    }
  }

  cancelarEdicion() {
    this.limpiar();
    this.enEdicion = false;
    this.mostrarBoton = false;
  }

  eliminar(id: number) {
    this.productoService.delete(id);
    this.listar();
    this.modal.hide();
    this.mostrarBoton = false;
    if (this.enEdicion == true) {
      this.enEdicion = false;
      this.limpiar();
    }
  }

  mostrarConfirmacionEliminar(productoEliminar: ProductoModel){
    this.productoSeleccionado = productoEliminar;
    const elementoModal = document.getElementById('modalEliminar');

    this.modal = new bootstrap.Modal(elementoModal!);

    this.modal.show();
  }

  limpiar() {
    this.producto = {
      id: 0,
      nombre: '',
      precio: 0,
      categoria: ''
    }
  }

}
