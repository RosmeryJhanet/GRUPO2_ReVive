import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Locationservice } from '../../../services/locationservice';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { Location } from '../../../models/location';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';


@Component({
  selector: 'app-location-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './location-list.html',
  styleUrl: './location-list.css',
})
export class LocationList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Location> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private lS: Locationservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarUbicaciones();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarUbicaciones() {
    this.lS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        if (err.status === 404) {
          this.dataSource.data = [];
          console.log(err.error);
        }
      },
    });
  }
  eliminar(id: number) {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: { titulo: 'Eliminar ubicación', mensaje: '¿Seguro que deseas eliminar esta ubicación?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.lS.delete(id).subscribe(() => {
        this.snackBar.open('Ubicación eliminada correctamente', 'Cerrar', { duration: 3000 });
        this.cargarUbicaciones();
      });
    });
  }
}
