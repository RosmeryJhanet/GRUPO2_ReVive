import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Material } from '../../../models/material';
import { MatTableDataSource } from '@angular/material/table';
import { Materialservice } from '../../../services/materialservice';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material-list',
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule],
  templateUrl: './material-list.html',
  styleUrl: './material-list.css',
})
export class MaterialList implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Material> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mS: Materialservice,
    private snackBar: MatSnackBar,
  ) {}

ngOnInit(): void {
    this.cargarMateriales();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

   cargarMateriales() {
    this.mS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }
  eliminar(id: number) {
    this.mS.delete(id).subscribe(() => {
      this.snackBar.open('Material eliminado correctamente', 'Cerrar', { duration: 3000 });
      this.cargarMateriales();
    });
  }
}
