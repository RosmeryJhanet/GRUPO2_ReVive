import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-usuario-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule, CommonModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private uS: Usuarioservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarUsuarios() {
    this.uS.list().subscribe({
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
      data: { titulo: 'Eliminar usuario', mensaje: '¿Seguro que deseas eliminar este usuario?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.uS.delete(id).subscribe(() => {
        this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.cargarUsuarios();
      });
    });
  }
}
