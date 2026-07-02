import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Material } from '../../../models/material';
import { Materialservice } from '../../../services/materialservice';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-material-list',
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatDividerModule, RouterLink, CommonModule],
  templateUrl: './material-list.html',
  styleUrl: './material-list.css',
})
export class MaterialList implements OnInit {
  materiales: Material[] = [];

  constructor(
    private mS: Materialservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarMateriales();
  }

  cargarMateriales() {
    this.mS.list().subscribe({
      next: (data) => {
        this.materiales = data;
        this.cdr.detectChanges();
      },
    });
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

  eliminar(id: number) {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: { titulo: 'Eliminar material', mensaje: '¿Seguro que deseas eliminar este material?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.mS.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Material eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.cargarMateriales();
        },
        error: (err) => {
          this.snackBar.open(err.error, 'Cerrar', { duration: 4000 });
        },
      });
    });
  }
}
