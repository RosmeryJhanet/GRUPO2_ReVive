import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/categoryservice';

@Component({
  selector: 'app-category-list',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private cS: CategoryService) {}

  ngOnInit(): void {
    this.cargarCategorias();
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
      this.cargarCategorias();
    });
  }
}