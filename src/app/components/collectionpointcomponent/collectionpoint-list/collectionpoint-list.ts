import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  afterNextRender,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Collectionpointservice } from '../../../services/collectionpointservice';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CollectionPoint } from '../../../models/collectionpoint';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Confirmdialogcomponent } from '../../confirmdialogcomponent/confirmdialogcomponent';

@Component({
  selector: 'app-collectionpoint-list',
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './collectionpoint-list.html',
  styleUrl: './collectionpoint-list.css',
})
export class CollectionpointList implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<CollectionPoint> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  private map: any;
  private L: any;

  constructor(
    private cpS: Collectionpointservice,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
    afterNextRender(() => this.iniciarMapa());
  }

  ngOnInit(): void {
    this.cargarPuntos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarPuntos() {
    this.cpS.list().subscribe({
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

    this.cpS.list().subscribe({
      next: (puntos) => {
        if (!puntos?.length) return;
        const bounds: [number, number][] = [];
        puntos.forEach((p) => {
          L.marker([p.collectionPointLatitude, p.collectionPointLongitude])
            .addTo(this.map)
            .bindPopup(`<b>${p.collectionPointName}</b><br>${p.collectionPointAddress}`);
          bounds.push([p.collectionPointLatitude, p.collectionPointLongitude]);
        });
        if (bounds.length) this.map.fitBounds(bounds, { padding: [40, 40] });
      },
    });
  }

  eliminar(id: number) {
    const dialogRef = this.dialog.open(Confirmdialogcomponent, {
      width: '360px',
      panelClass: 'confirm-dialog-panel',
      data: {
        titulo: 'Eliminar punto de acopio',
        mensaje: '¿Seguro que deseas eliminar este punto de acopio?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;
      this.cpS.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Punto de acopio eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.cargarPuntos();
        },
        error: (err) => {
          const mensaje =
            typeof err.error === 'string' ? err.error : 'Ocurrió un error al eliminar el punto de acopio.';
          this.snackBar.open(mensaje, 'Cerrar', { duration: 4000 });
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
