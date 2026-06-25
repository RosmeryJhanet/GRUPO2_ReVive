import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Collectionpointservice } from '../../../services/collectionpointservice';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CollectionPoint } from '../../../models/collectionpoint';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collectionpoint-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './collectionpoint-list.html',
  styleUrl: './collectionpoint-list.css',
})
export class CollectionpointList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<CollectionPoint> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cpS: Collectionpointservice,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cargarPuntos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarPuntos() {
    this.cpS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        if (err.status === 404) {
          this.dataSource.data = [];
        }
      },
    });
  }

  eliminar(id: number) {
    this.cpS.delete(id).subscribe(() => {
      this.snackBar.open('Punto de acopio eliminado correctamente', 'Cerrar', { duration: 3000 });
      this.cargarPuntos();
    });
  }
}
