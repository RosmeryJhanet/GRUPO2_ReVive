import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecyclingDetailDTO } from '../../../models/recyclingDetailDTO';
import { RecyclingDetailService } from '../../../services/recyclingdetailservice';

@Component({
  selector: 'app-recyclingdetail-update',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './recyclingdetail-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './recyclingdetail-update.css',
})
export class RecyclingdetailUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  detalle: RecyclingDetailDTO = new RecyclingDetailDTO();
  id: number = 0;

  constructor(
    private rdS: RecyclingDetailService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(200)]],
      registrationDate: ['', Validators.required],
      traceability: ['', Validators.required],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.rdS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          description: data.descriptionDetail,
          registrationDate: data.registrationDate,
          traceability: data.traceabilityStatus,
        });
      },
    });
  }

  actualizar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.detalle.recyclingDetailsId = this.id;
    this.detalle.descriptionDetail = this.form.value.description;
    this.detalle.registrationDate = this.form.value.registrationDate;
    this.detalle.traceabilityStatus = this.form.value.traceability;

    this.rdS.update(this.detalle).subscribe({
      next: () => {
        this.snackBar.open('Detalle de reciclaje actualizado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/detalle-reciclajes/listar']);
      },
    });
  }
}