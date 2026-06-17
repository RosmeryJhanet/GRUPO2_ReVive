import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Locationservice } from '../../../services/locationservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location as LocationModel } from '../../../models/location';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-location-update',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './location-update.html',
  styleUrl: './location-update.css',
})
export class LocationUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  lo: LocationModel = new LocationModel();
  id: number = 0;

  constructor(
    private lS: Locationservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      distric: ['', Validators.required],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.lS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          address: data.addressLocation,
          latitude: data.latitudeLocation,
          longitude: data.longitudeLocation,
          distric: data.districtLocation,
        });
      },
    });
  }
  actualizar() {
    if (this.form.valid) {
      this.lo.idLocation = this.id;
      this.lo.addressLocation = this.form.value.address;
      this.lo.latitudeLocation = this.form.value.latitude;
      this.lo.longitudeLocation = this.form.value.longitude;
      this.lo.districtLocation = this.form.value.distric;

      this.lS.update(this.lo).subscribe({
        next: () => {
          this.router.navigate(['/ubicaciones/listar']);
        },
      });
    }
  }
}
