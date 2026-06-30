import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Barterservice } from '../../../services/barterservice';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Barter } from '../../../models/barter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-barter-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule, CommonModule],
  templateUrl: './barter-list.html',
  styleUrl: './barter-list.css',
})
export class BarterList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Barter> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bS: Barterservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarTrueques();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarTrueques() {
    this.bS.list().subscribe({
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
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: { titulo: 'Eliminar trueque', mensaje: '¿Seguro que deseas eliminar este trueque?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.bS.delete(id).subscribe(() => {
        this.snackBar.open('Trueque eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.cargarTrueques();
      });
    });
  }
}
