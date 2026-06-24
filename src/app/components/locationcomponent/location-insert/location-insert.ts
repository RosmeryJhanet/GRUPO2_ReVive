import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Locationservice } from '../../../services/locationservice';
import { provideNativeDateAdapter } from '@angular/material/core';
import {  Router } from '@angular/router';
import { Location as LocationModel } from '../../../models/location';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mapscomponent } from '../../mapscomponent/mapscomponent';

@Component({
  selector: 'app-location-insert',
  imports: [ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  RouterLink,
  CommonModule,
  Mapscomponent],
  templateUrl: './location-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './location-insert.css',
})
export class LocationInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  lo: LocationModel = new LocationModel();

  constructor(
    private lS:Locationservice,
    private router:Router,
    private formBuilder:FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      address:['',[Validators.required, Validators.maxLength(200)]],
      latitude:['',[Validators.required, Validators.pattern(/^-?\d{1,3}(\.\d{1,7})?$/), Validators.min(-90), Validators.max(90)]],
      longitude:['',[Validators.required, Validators.pattern(/^-?\d{1,3}(\.\d{1,7})?$/), Validators.min(-180), Validators.max(180)]],
      distric:['',[Validators.required, Validators.maxLength(100)]],

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

  onDistrictFound(district: string) {
    this.form.patchValue({ distric: district });
    this.form.get('distric')?.markAsTouched();
    this.cdr.detectChanges();
  }

  aceptar(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.lo.addressLocation= this.form.value.address;
    this.lo.latitudeLocation=this.form.value.latitude;
    this.lo.longitudeLocation=this.form.value.longitude;
    this.lo.districtLocation=this.form.value.distric;

    this.lS.insert(this.lo).subscribe({
      next:()=>{
        this.snackBar.open('Ubicación registrada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/ubicaciones/listar']);

      },
    });
  }

}
