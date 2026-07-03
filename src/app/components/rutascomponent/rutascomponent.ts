import { Component, ChangeDetectorRef, ElementRef, OnDestroy, ViewChild, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Locationservice } from '../../services/locationservice';
import { Location as LocationModel } from '../../models/location';

@Component({
  selector: 'app-rutascomponent',
  imports: [CommonModule, MatIconModule],
  templateUrl: './rutascomponent.html',
  styleUrl: './rutascomponent.css',
})
export class Rutascomponent implements OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  cargando = true;
  error: string | null = null;
  destino: LocationModel | null = null;
  distanciaKm: number | null = null;
  duracionMin: number | null = null;

  private map: any;
  private L: any;

  constructor(
    private lS: Locationservice,
    private cdr: ChangeDetectorRef,
  ) {
    afterNextRender(() => {
      this.iniciar();
    });
  }

  private async iniciar(): Promise<void> {
    const leafletModule: any = await import('leaflet');
    this.L = leafletModule.default ?? leafletModule;

    if (!navigator.geolocation) {
      this.mostrarError('Tu navegador no soporta geolocalización.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => this.buscarRutaMasCercana(pos.coords.latitude, pos.coords.longitude),
      () => this.mostrarError('No se pudo obtener tu ubicación. Activa el permiso de ubicación en el navegador e intenta de nuevo.'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  private buscarRutaMasCercana(userLat: number, userLng: number): void {
    this.lS.list().subscribe({
      next: (ubicaciones) => {
        if (!ubicaciones || ubicaciones.length === 0) {
          this.mostrarError('No hay puntos de recolección registrados todavía.');
          return;
        }
        const cercano = this.encontrarMasCercano(userLat, userLng, ubicaciones);
        this.calcularRuta(userLat, userLng, cercano);
      },
      error: () => this.mostrarError('No se pudo cargar la lista de ubicaciones.'),
    });
  }

  private encontrarMasCercano(userLat: number, userLng: number, ubicaciones: LocationModel[]): LocationModel {
    let masCercano = ubicaciones[0];
    let menorDistancia = this.distanciaHaversine(
      userLat,
      userLng,
      masCercano.latitudeLocation,
      masCercano.longitudeLocation,
    );
    for (const u of ubicaciones) {
      const d = this.distanciaHaversine(userLat, userLng, u.latitudeLocation, u.longitudeLocation);
      if (d < menorDistancia) {
        menorDistancia = d;
        masCercano = u;
      }
    }
    return masCercano;
  }

  private distanciaHaversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.aRadianes(lat2 - lat1);
    const dLon = this.aRadianes(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.aRadianes(lat1)) * Math.cos(this.aRadianes(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private aRadianes(grados: number): number {
    return (grados * Math.PI) / 180;
  }

  private async calcularRuta(userLat: number, userLng: number, destino: LocationModel): Promise<void> {
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destino.longitudeLocation},${destino.latitudeLocation}?overview=full&geometries=geojson`,
      );
      const data = await res.json();
      if (data.code !== 'Ok' || !data.routes?.length) {
        this.mostrarError('No se pudo calcular la ruta hacia el punto más cercano.');
        return;
      }
      const ruta = data.routes[0];
      const coords: [number, number][] = ruta.geometry.coordinates.map(
        (c: [number, number]) => [c[1], c[0]] as [number, number],
      );

      this.destino = destino;
      this.distanciaKm = ruta.distance / 1000;
      this.duracionMin = ruta.duration / 60;
      this.cargando = false;
      this.cdr.detectChanges();

      this.dibujarMapa(userLat, userLng, destino, coords);
    } catch {
      this.mostrarError('Ocurrió un error al calcular la ruta. Intenta más tarde.');
    }
  }

  private dibujarMapa(userLat: number, userLng: number, destino: LocationModel, coords: [number, number][]): void {
    const L = this.L;
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
      iconUrl: 'leaflet/images/marker-icon.png',
      shadowUrl: 'leaflet/images/marker-shadow.png',
    });

    this.map = L.map(this.mapContainer.nativeElement).setView([userLat, userLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(this.map);

    L.marker([userLat, userLng]).addTo(this.map).bindPopup('Tu ubicación');
    L.marker([destino.latitudeLocation, destino.longitudeLocation])
      .addTo(this.map)
      .bindPopup(destino.addressLocation);

    const polyline = L.polyline(coords, { color: '#4cae4f', weight: 5 }).addTo(this.map);
    this.map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
  }

  private mostrarError(mensaje: string): void {
    this.error = mensaje;
    this.cargando = false;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
