import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { RecyclingDetailDTO } from '../../../models/recyclingDetailDTO';
import { RecyclingDTO } from '../../../models/recyclingDTO';
import { CollectionPoint } from '../../../models/collectionpoint';

import { RecyclingDetailService } from '../../../services/recyclingdetailservice';
import { RecyclingService } from '../../../services/recyclingservice';
import { Collectionpointservice } from '../../../services/collectionpointservice';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-recyclingdetail-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './recyclingdetail-list.html',
  styleUrl: './recyclingdetail-list.css',
})
export class RecyclingdetailList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<RecyclingDetailDTO> =
    new MatTableDataSource<RecyclingDetailDTO>();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  listaReciclajes: RecyclingDTO[] = [];
  listaPuntos: CollectionPoint[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rdS: RecyclingDetailService,
    private rS: RecyclingService,
    private cpS: Collectionpointservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}
  
ngOnInit(): void {
  this.rS.list().subscribe((reciclajes) => {
    this.listaReciclajes = reciclajes;

    this.cpS.list().subscribe((puntos) => {
      this.listaPuntos = puntos;

      this.cargarDetalles();
    });
  });
}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarDetalles(): void {
    this.rdS.list().subscribe({
      next: (data: RecyclingDetailDTO[]) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.dataSource.data = [];
      },
    });
  }

  getReciclaje(id: number): string {
    return (
      this.listaReciclajes.find(r => r.recyclingId === id)
        ?.recyclingName || 'Sin reciclaje'
    );
  }

  getPuntoAcopio(id: number): string {
    return (
      this.listaPuntos.find(p => p.idCollectionPoint === id)
        ?.collectionPointName || 'Sin punto de acopio'
    );
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: {
        titulo: 'Eliminar detalle de reciclaje',
        mensaje: '¿Seguro que deseas eliminar este detalle de reciclaje?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.rdS.delete(id).subscribe(() => {
        this.snackBar.open('Detalle de reciclaje eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.cargarDetalles();
      });
    });
  }
}