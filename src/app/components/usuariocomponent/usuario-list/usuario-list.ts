import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-usuario-list',
  imports: [MatIconModule, MatCardModule, MatButtonModule, RouterLink, CommonModule, MatDividerModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private uS: Usuarioservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.uS.list().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 404) this.usuarios = [];
        this.cdr.detectChanges();
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
