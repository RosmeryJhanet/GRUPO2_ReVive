import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { RecyclingDTO } from '../../../models/recyclingDTO';
import { Material } from '../../../models/material';
import { Usuario } from '../../../models/usuario';

import { RecyclingService } from '../../../services/recyclingservice';
import { Materialservice } from '../../../services/materialservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-recycling-list',
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatDividerModule, RouterLink, CommonModule],
  templateUrl: './recycling-list.html',
  styleUrl: './recycling-list.css',
})
export class RecyclingList implements OnInit {
  reciclajes: RecyclingDTO[] = [];
  materiales: Material[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private rS: RecyclingService,
    private mS: Materialservice,
    private uS: Usuarioservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.materiales = data;
    });
    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.cargarReciclajes();
  }

  cargarReciclajes(): void {
    this.rS.list().subscribe({
      next: (data) => {
        this.reciclajes = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.reciclajes = [];
      },
    });
  }

  getMaterial(id: number): Material | undefined {
    return this.materiales.find((m) => m.idMaterial === id);
  }

  getUsuario(id: number): string {
    const u = this.usuarios.find((u) => u.idUser === id);
    return u ? `${u.userName} ${u.userLastName}` : 'Sin usuario';
  }

  getImagen(tipo: string): string {
    const mapa: { [key: string]: string } = {
      carton: '/assets/materiales/carton.png',
      cartón: '/assets/materiales/carton.png',
      metal: '/assets/materiales/metal.png',
      papel: '/assets/materiales/papel.png',
      plastico: '/assets/materiales/plastico.png',
      plástico: '/assets/materiales/plastico.png',
      vidrio: '/assets/materiales/vidrio.png',
    };
    return mapa[tipo?.toLowerCase()] ?? '/assets/materiales/plastico.png';
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: { titulo: 'Eliminar reciclaje', mensaje: '¿Seguro que deseas eliminar este reciclaje?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.rS.delete(id).subscribe(() => {
        this.snackBar.open('Reciclaje eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.cargarReciclajes();
      });
    });
  }
}
