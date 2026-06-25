import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ItemDTO } from '../../../models/itemDTO';
import { Category } from '../../../models/category';
import { ItemService } from '../../../services/itemservice';
import { CategoryService } from '../../../services/categoryservice';

@Component({
  selector: 'app-item-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<ItemDTO> = new MatTableDataSource<ItemDTO>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  categorias: Category[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private iS: ItemService,
    private cS: CategoryService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.categorias = data;
    });

    this.cargarItems();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarItems(): void {
    this.iS.list().subscribe({
      next: (data: ItemDTO[]) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.dataSource.data = [];
      },
    });
  }

  getCategoria(id: number): string {
    return (
      this.categorias.find(c => c.idCategory === id)
        ?.nameCategory || 'Sin categoría'
    );
  }

  eliminar(id: number): void {
    this.iS.delete(id).subscribe(() => {
      this.snackBar.open('Artículo eliminado correctamente', 'Cerrar', { duration: 3000 });
      this.cargarItems();
    });
  }
}