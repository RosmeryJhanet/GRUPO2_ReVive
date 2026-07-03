import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Productservice } from '../../../services/productservice';
import { Barterservice } from '../../../services/barterservice';
import { CategoryService } from '../../../services/categoryservice';
import { ProductDTO } from '../../../models/productDTO';
import { Barter } from '../../../models/barter';
import { Category } from '../../../models/category';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatDividerModule, RouterLink, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  productos: ProductDTO[] = [];
  trueques: Barter[] = [];
  categorias: Category[] = [];

  constructor(
    private pS: Productservice,
    private bS: Barterservice,
    private cS: CategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    forkJoin({
      trueques: this.bS.list(),
      categorias: this.cS.list()
    }).subscribe({
      next: (res) => {
        this.trueques = res.trueques;
        this.categorias = res.categorias;
        this.cargarProductos();
      },
      error: (err) => {
        console.error('Error al cargar dependencias en la lista:', err);
        this.cargarProductos();
      }
    });
  }

  getBarterDescription(id: number): string {
    const b = this.trueques.find((x) => x.idBarter === id);
    return b ? b.descriptionBarter : 'Sin trueque';
  }

  getCategoryName(id: number): string {
    const c = this.categorias.find((x) => x.idCategory === id);
    return c ? c.nameCategory : 'Sin categoría';
  }

  cargarProductos() {
    this.pS.list().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 404) this.productos = [];
      },
    });
  }

  eliminar(id: number) {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: { titulo: 'Eliminar producto', mensaje: '¿Seguro que deseas eliminar este producto?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.pS.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Producto eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.cargarProductos();
        },
        error: (err) => {
          this.snackBar.open(err.error ?? 'No se pudo eliminar el producto', 'Cerrar', { duration: 3000 });
        },
      });
    });
  }
}
