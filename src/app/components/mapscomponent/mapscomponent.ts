import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapscomponent',
  imports: [CommonModule],
  templateUrl: './mapscomponent.html',
  styleUrl: './mapscomponent.css',
})
export class Mapscomponent implements OnChanges, OnDestroy {
  @Input() lat: number | null = null;
  @Input() lng: number | null = null;
  @Input() interactive: boolean = true;
  @Output() coordsSelected = new EventEmitter<{ lat: number; lng: number }>();
  @Output() districtFound = new EventEmitter<string>();

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private readonly defaultCenter: [number, number] = [-12.0464, -77.0428];
  private map: any;
  private marker: any;
  private L: any;
  private resizeObserver?: ResizeObserver;

  constructor() {
    afterNextRender(async () => {
      this.L = await import('leaflet');
      this.initMap();
      this.observeResize();
    });
  }

  private observeResize(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.map?.invalidateSize();
    });
    this.resizeObserver.observe(this.mapContainer.nativeElement);
  }

  private initMap(): void {
    const L = this.L;
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
      iconUrl: 'leaflet/images/marker-icon.png',
      shadowUrl: 'leaflet/images/marker-shadow.png',
    });

    const center: [number, number] =
      this.lat != null && this.lng != null ? [this.lat, this.lng] : this.defaultCenter;

    this.map = L.map(this.mapContainer.nativeElement).setView(center, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(this.map);

    if (this.lat != null && this.lng != null) {
      this.placeMarker(this.lat, this.lng);
    }

    if (!this.interactive) {
      this.map.dragging.disable();
      this.map.scrollWheelZoom.disable();
      this.map.doubleClickZoom.disable();
      return;
    }

    this.map.on('click', (e: any) => {
      this.placeMarker(e.latlng.lat, e.latlng.lng);
      this.coordsSelected.emit({ lat: e.latlng.lat, lng: e.latlng.lng });
      this.reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
  }

  private placeMarker(lat: number, lng: number): void {
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      this.marker = this.L.marker([lat, lng]).addTo(this.map);
    }
  }

  private async reverseGeocode(lat: number, lng: number): Promise<void> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      );
      if (!res.ok) return;
      const data = await res.json();
      const address = data.address ?? {};
      const district = address.city_district || address.suburb || address.town || address.county;
      if (district) {
        this.districtFound.emit(district);
      }
    } catch {
      // la geocodificación inversa es una mejora opcional; si falla, el usuario igual puede escribir el distrito a mano
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map || !this.L) return;
    if ((changes['lat'] || changes['lng']) && this.lat != null && this.lng != null) {
      this.placeMarker(this.lat, this.lng);
      this.map.setView([this.lat, this.lng], this.map.getZoom());
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }
}
