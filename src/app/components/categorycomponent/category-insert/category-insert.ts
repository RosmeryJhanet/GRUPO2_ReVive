import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/categoryservice';

@Component({
  selector: 'app-category-insert',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './category-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './category-insert.css',
})
export class CategoryInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  ca: Category = new Category();

  constructor(
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      state: [true, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ca.nameCategory = this.form.value.name;
      this.ca.descriptionCategory = this.form.value.description;
      this.ca.stateCategory = this.form.value.state;

      this.cS.insert(this.ca).subscribe({
        next: () => {
          this.router.navigate(['/categorias/listar']);
        },
      });
    }
  }
}