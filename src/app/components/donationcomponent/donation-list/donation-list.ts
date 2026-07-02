import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { DonationDTO } from '../../../models/donationDTO';
import { ItemDTO } from '../../../models/itemDTO';
import { Usuario } from '../../../models/usuario';

import { Donationservice } from '../../../services/donationservice';
import { ItemService } from '../../../services/itemservice';
import { Usuarioservice } from '../../../services/usuarioservice';

import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-donation-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './donation-list.html',
  styleUrl: './donation-list.css',
})
export class DonationList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<DonationDTO> = new MatTableDataSource<DonationDTO>();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  listaItems: ItemDTO[] = [];
  listaUsuarios: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dS: Donationservice,
    private iS: ItemService,
    private uS: Usuarioservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.iS.list().subscribe({
      next: (data) => {
        this.listaItems = data;
      },
      error: () => {
        this.listaItems = [];
      },
    });

    this.uS.list().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      },
      error: () => {
        this.listaUsuarios = [];
      },
    });

    this.cargarDonaciones();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarDonaciones(): void {
    this.dS.list().subscribe({
      next: (data: DonationDTO[]) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.dataSource.data = [];
      },
    });
  }

  getItem(id: number): string {
    return this.listaItems.find((i) => i.itemId === id)?.itemName || 'Sin artículo';
  }

  getUsuario(id: number): string {
    const usuario = this.listaUsuarios.find((u) => u.idUser === id);

    return usuario
      ? `${usuario.userName} ${usuario.userLastName}`
      : 'Sin usuario';
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: {
        titulo: 'Eliminar donación',
        mensaje: '¿Seguro que deseas eliminar esta donación?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;

      this.dS.delete(id).subscribe(() => {
        this.snackBar.open('Donación eliminada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.cargarDonaciones();
      });
    });
  }
}