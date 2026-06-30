import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Collectionpointservice } from '../../../services/collectionpointservice';
import { Router, RouterLink } from '@angular/router';
import { CollectionPoint } from '../../../models/collectionpoint';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mapscomponent } from '../../mapscomponent/mapscomponent';

@Component({
  selector: 'app-collectionpoint-insert',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    CommonModule,
    Mapscomponent,
  ],
  templateUrl: './collectionpoint-insert.html',
  styleUrl: './collectionpoint-insert.css',
})
export class CollectionpointInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cp: CollectionPoint = new CollectionPoint();

  constructor(
    private cpS: Collectionpointservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      latitude: [
        '',
        [Validators.required, Validators.pattern(/^-?\d{1,3}(\.\d{1,7})?$/), Validators.min(-90), Validators.max(90)],
      ],
      longitude: [
        '',
        [Validators.required, Validators.pattern(/^-?\d{1,3}(\.\d{1,7})?$/), Validators.min(-180), Validators.max(180)],
      ],
    });
  }

  onCoordsSelected(coords: { lat: number; lng: number }) {
    this.form.patchValue({
      latitude: coords.lat.toFixed(7),
      longitude: coords.lng.toFixed(7),
    });
    this.form.get('latitude')?.markAsTouched();
    this.form.get('longitude')?.markAsTouched();
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cp.collectionPointName = this.form.value.name;
    this.cp.collectionPointAddress = this.form.value.address;
    this.cp.collectionPointLatitude = this.form.value.latitude;
    this.cp.collectionPointLongitude = this.form.value.longitude;

    this.cpS.insert(this.cp).subscribe({
      next: () => {
        this.snackBar.open('Punto de acopio registrado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/puntos-acopio/listar']);
      },
    });
  }
}
