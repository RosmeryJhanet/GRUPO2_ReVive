import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-location-insert',
  imports: [ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  RouterLink],
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
  ){}

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      address:['',Validators.required],
      latitude:['',Validators.required],
      longitude:['',Validators.required],
      distric:['',Validators.required],

    });
  }
  aceptar(){
    if (this.form.valid){
      this.lo.addressLocation= this.form.value.address;
      this.lo.latitudeLocation=this.form.value.latitude;
      this.lo.longitudeLocation=this.form.value.longitude;
      this.lo.districtLocation=this.form.value.distric;

      this.lS.insert(this.lo).subscribe({
        next:()=>{
          this.router.navigate(['/ubicaciones/listar']);

        },
      });
    }
  }

}
