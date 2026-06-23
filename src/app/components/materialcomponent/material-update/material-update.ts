import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Materialservice } from '../../../services/materialservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Material } from '../../../models/material';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material-update',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './material-update.html',
  styleUrl: './material-update.css',
})
export class MaterialUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  mat: Material = new Material();
  id: number = 0;

  constructor(
    private mS: Materialservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      type: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.mS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.materialName,
          description: data.materialDescription,
          type: data.materialType,
        });
      },
    });
  }

  actualizar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.mat.idMaterial = this.id;
    this.mat.materialName = this.form.value.name;
    this.mat.materialDescription = this.form.value.description;
    this.mat.materialType = this.form.value.type;

    this.mS.update(this.mat).subscribe({
      next: () => {
        this.snackBar.open('Material actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/materiales/listar']);
      },
    });
  }
}
