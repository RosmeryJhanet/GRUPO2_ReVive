import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Barterservice } from '../../../services/barterservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Barter } from '../../../models/barter';
import { Usuario } from '../../../models/usuario';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-barter-list',
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatDividerModule, RouterLink, CommonModule],
  templateUrl: './barter-list.html',
  styleUrl: './barter-list.css',
})
export class BarterList implements OnInit {
  trueques: Barter[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private bS: Barterservice,
    private uS: Usuarioservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.usuarios = data;
      this.cargarTrueques();
    });
  }

  getUsuario(id: number): string {
    const u = this.usuarios.find((u) => u.idUser === id);
    return u ? `${u.userName} ${u.userLastName}` : 'Sin usuario';
  }

  cargarTrueques() {
    this.bS.list().subscribe({
      next: (data) => {
        this.trueques = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 404) this.trueques = [];
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
