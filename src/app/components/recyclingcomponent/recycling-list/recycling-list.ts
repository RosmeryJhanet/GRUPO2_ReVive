import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecyclingDTO } from '../../../models/recyclingDTO';
import { Material } from '../../../models/material';
import { Usuario } from '../../../models/usuario';

import { RecyclingService } from '../../../services/recyclingservice';
import { Materialservice } from '../../../services/materialservice';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-recycling-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './recycling-list.html',
  styleUrl: './recycling-list.css',
})
export class RecyclingList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<RecyclingDTO> = new MatTableDataSource<RecyclingDTO>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  materiales: Material[] = [];
  usuarios: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rS: RecyclingService,
    private mS: Materialservice,
    private uS: Usuarioservice,
    private snackBar: MatSnackBar,
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarReciclajes(): void {
    this.rS.list().subscribe({
      next: (data: RecyclingDTO[]) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.dataSource.data = [];
      },
    });
  }

  getMaterial(id: number): string {
    return (
      this.materiales.find(m => m.idMaterial === id)
        ?.materialName || 'Sin material'
    );
  }

  getUsuario(id: number): string {
    const usuario = this.usuarios.find(u => u.idUser === id);

    if (!usuario) {
      return 'Sin usuario';
    }

    return `${usuario.userName} ${usuario.userLastName}`;
  }

  eliminar(id: number): void {
    this.rS.delete(id).subscribe(() => {
      this.snackBar.open('Reciclaje eliminado correctamente', 'Cerrar', { duration: 3000 });
      this.cargarReciclajes();
    });
  }
}