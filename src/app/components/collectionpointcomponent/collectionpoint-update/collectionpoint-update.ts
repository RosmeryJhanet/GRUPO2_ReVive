import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Collectionpointservice } from '../../../services/collectionpointservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CollectionPoint } from '../../../models/collectionpoint';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mapscomponent } from '../../mapscomponent/mapscomponent';

@Component({
  selector: 'app-collectionpoint-update',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    Mapscomponent,
  ],
  templateUrl: './collectionpoint-update.html',
  styleUrl: './collectionpoint-update.css',
})
export class CollectionpointUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  cp: CollectionPoint = new CollectionPoint();
  id: number = 0;

  constructor(
    private cpS: Collectionpointservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.cpS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.collectionPointName,
          address: data.collectionPointAddress,
          latitude: data.collectionPointLatitude,
          longitude: data.collectionPointLongitude,
        });
      },
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

  actualizar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cp.idCollectionPoint = this.id;
    this.cp.collectionPointName = this.form.value.name;
    this.cp.collectionPointAddress = this.form.value.address;
    this.cp.collectionPointLatitude = this.form.value.latitude;
    this.cp.collectionPointLongitude = this.form.value.longitude;

    this.cpS.update(this.cp).subscribe({
      next: () => {
        this.snackBar.open('Punto de acopio actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/puntos-acopio/listar']);
      },
    });
  }
}
