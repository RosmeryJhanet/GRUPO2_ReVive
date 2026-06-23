import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/categoryservice';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cS: CategoryService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarCategorias(): void {
    this.cS.list().subscribe({
      next: (data: Category[]) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.dataSource.data = [];
      },
    });
  }

  eliminar(id: number): void {
    this.cS.delete(id).subscribe(() => {
      this.snackBar.open('Categoría eliminada correctamente', 'Cerrar', { duration: 3000 });
      this.cargarCategorias();
    });
  }
}