import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  productos: ProductoModel[] = [];
  idContador = 0;

  constructor() {
    // Iniciamos algunos productos
    this.productos = [
      {id:1, nombre:"Tornillo 3/8", precio:5, categoria:"Material"},
      {id:2, nombre:"Pinzas Electricista", precio:300, categoria:"Herramienta"},
      {id:3, nombre:"Martillo Trupper", precio:250, categoria:"Herramienta"},
      {id:4, nombre:"Clavos", precio:2, categoria: "Material"},
      {id:5, nombre:"Sierra Electrica", precio:1500, categoria: "Herramienta"}
    ]
    this.idContador = 5;
  }

  save(nuevoProducto: ProductoModel) {
    nuevoProducto.id = ++this.idContador;
    this.productos.push(nuevoProducto);
  }

  findAll() {
    return this.productos;
  }

  findById() {

  }

  update(productoUpdate: ProductoModel) {
    const indiceActualizar = this.productos.findIndex((producto) => producto.id == productoUpdate.id);

    this.productos[indiceActualizar] = productoUpdate;
  }

  delete(id: number) {
    this.productos = this.productos.filter((producto) => producto.id != id);
  }

}
