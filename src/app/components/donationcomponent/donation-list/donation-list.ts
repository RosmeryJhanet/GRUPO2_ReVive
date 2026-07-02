import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Donation } from '../../../models/donation';
import { ItemDTO } from '../../../models/itemDTO';
import { Usuario } from '../../../models/usuario';
import { Donationservice } from '../../../services/donationservice';
import { ItemService } from '../../../services/itemservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-list',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, RouterLink],
  templateUrl: './donation-list.html',
  styleUrl: './donation-list.css',
})
export class DonationList implements OnInit {

  dataSource: MatTableDataSource<Donation> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  items: ItemDTO[] = [];
  usuario: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dS: Donationservice,
    private iS: ItemService,
    private uS: Usuarioservice,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.items = data;
    });
    this.uS.list().subscribe(data => {
      this.usuario = data;
    });
    this.cargarDonaciones();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarDonaciones() {
    this.dS.list().subscribe({
      next: (data: Donation[]) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.dataSource.data = [];
      },
    });
  }
  getitems(id: number): string {
    return (
      this.items.find(item => item.itemId === id)?.itemName || 'Sin nombre'
    );
  }

  getUsuario(id: number): string {
    const usuario = this.usuario.find(u => u.idUser === id);
    if (!usuario) {
      return 'Sin usuario';
    }
    return `${usuario.userName} ${usuario.userLastName}`;
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: { titulo: 'Eliminar donación', mensaje: '¿Seguro que deseas eliminar esta donación?' },
    });
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.dS.delete(id).subscribe(() => {
        this.snackBar.open('Donación eliminada correctamente', 'Cerrar', { duration: 3000 });
        this.cargarDonaciones();
      });
    });
  }

  isAdmin(): boolean {
    return this.loginService.tieneRol('ADMIN');
  }

}
