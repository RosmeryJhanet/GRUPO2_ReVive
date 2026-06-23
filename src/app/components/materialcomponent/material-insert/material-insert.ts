import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Material } from '../../../models/material';
import { Materialservice } from '../../../services/materialservice';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-material-insert',
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './material-insert.html',
  styleUrl: './material-insert.css',
})
export class MaterialInsert implements OnInit {

 form: FormGroup = new FormGroup({});
  pro: Material = new Material();
  tiposMaterial: string[] = ['Plástico', 'Vidrio', 'Papel', 'Metal', 'Cartón'];

  constructor(
    private mS: Materialservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      type: ['', [Validators.required, Validators.maxLength(100)]],

    });
  }
  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.pro.materialName = this.form.value.name;
    this.pro.materialDescription = this.form.value.description;
    this.pro.materialType = this.form.value.type;

    this.mS.insert(this.pro).subscribe({
      next: () => {
        this.snackBar.open('Material registrado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/materiales/listar']);
      },
    });
  }
}
