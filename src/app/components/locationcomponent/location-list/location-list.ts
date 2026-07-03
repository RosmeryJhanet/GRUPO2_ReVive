import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Locationservice } from '../../../services/locationservice';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Location } from '../../../models/location';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-location-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './location-list.html',
  styleUrl: './location-list.css',
})
export class LocationList implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  dataSource: MatTableDataSource<Location> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  private map: any;
  private L: any;

  constructor(
    private lS: Locationservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
    afterNextRender(() => this.iniciarMapa());
  }

  ngOnInit(): void {
    this.cargarUbicaciones();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarUbicaciones() {
    this.lS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 404) this.dataSource.data = [];
      },
    });
  }

  private async iniciarMapa(): Promise<void> {
    this.L = await import('leaflet');
    const L = this.L;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
      iconUrl: 'leaflet/images/marker-icon.png',
      shadowUrl: 'leaflet/images/marker-shadow.png',
    });

    this.map = L.map(this.mapContainer.nativeElement).setView([-12.046374, -77.042793], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.map);

    this.lS.list().subscribe({
      next: (ubicaciones) => {
        if (!ubicaciones?.length) return;
        const bounds: [number, number][] = [];
        ubicaciones.forEach((u) => {
          L.marker([u.latitudeLocation, u.longitudeLocation])
            .addTo(this.map)
            .bindPopup(`<b>${u.addressLocation}</b><br>${u.districtLocation}`);
          bounds.push([u.latitudeLocation, u.longitudeLocation]);
        });
        if (bounds.length) this.map.fitBounds(bounds, { padding: [40, 40] });
      },
    });
  }

  eliminar(id: number) {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: { titulo: 'Eliminar ubicación', mensaje: '¿Seguro que deseas eliminar esta ubicación?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.lS.delete(id).subscribe(() => {
        this.snackBar.open('Ubicación eliminada correctamente', 'Cerrar', { duration: 3000 });
        this.cargarUbicaciones();
      });
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
