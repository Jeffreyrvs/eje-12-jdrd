import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoModel } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

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
    if (this.enEdicion) {
      this.productoService.update({
        ...this.producto
      });
      this.limpiar();
      this.enEdicion = false;
    } else {
      this.productoService.save({
        ...this.producto
      });
      this.limpiar;
    }
  }

  actualizar(productoActualizar: ProductoModel) {
    this.enEdicion = true;
    this.producto = {
      ...productoActualizar
    }
  }

  eliminar(id: number) {
    this.productoService.delete(id);
    this.listar();
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
