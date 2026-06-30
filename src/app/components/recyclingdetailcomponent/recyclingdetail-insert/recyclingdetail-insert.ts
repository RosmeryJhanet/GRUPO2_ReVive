import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecyclingDetailDTO } from '../../../models/recyclingDetailDTO';
import { RecyclingDTO } from '../../../models/recyclingDTO';
import { CollectionPoint } from '../../../models/collectionpoint';

import { RecyclingDetailService } from '../../../services/recyclingdetailservice';
import { RecyclingService } from '../../../services/recyclingservice';
import { Collectionpointservice } from '../../../services/collectionpointservice';

@Component({
  selector: 'app-recyclingdetail-insert',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './recyclingdetail-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './recyclingdetail-insert.css',
})
export class RecyclingdetailInsert implements OnInit, AfterViewInit {

  form: FormGroup = new FormGroup({});
  detalle: RecyclingDetailDTO = new RecyclingDetailDTO();

  listaReciclajes: RecyclingDTO[] = [];
  listaPuntos: CollectionPoint[] = [];

  constructor(
    private rdS: RecyclingDetailService,
    private rS: RecyclingService,
    private cpS: Collectionpointservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(200)]],
      registrationDate: ['', Validators.required],
      traceability: ['', Validators.required],
      recycling: ['', Validators.required],
      collectionPoint: ['', Validators.required],
    });

  }

  ngAfterViewInit(): void {

    this.rS.list().subscribe(data => {
      this.listaReciclajes = data;
      this.cdr.detectChanges();
    });

    this.cpS.list().subscribe(data => {
      this.listaPuntos = data;
      this.cdr.detectChanges();
    });

  }

  aceptar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.detalle.descriptionDetail = this.form.value.description;
    this.detalle.registrationDate = this.form.value.registrationDate;
    this.detalle.traceabilityStatus = this.form.value.traceability;
    this.detalle.recyclingId = this.form.value.recycling;
    this.detalle.collectionPointId = this.form.value.collectionPoint;

    this.rdS.insert(this.detalle).subscribe({
      next: () => {
        this.snackBar.open(
          'Detalle de reciclaje registrado correctamente',
          'Cerrar',
          { duration: 3000 }
        );
        this.router.navigate(['/detalles-reciclaje/listar']);
      }
    });

  }

}