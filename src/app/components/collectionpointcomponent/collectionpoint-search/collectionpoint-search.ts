import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CollectionPoint } from '../../../models/collectionpoint';
import { Collectionpointservice } from '../../../services/collectionpointservice';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Mapscomponent } from '../../mapscomponent/mapscomponent';

@Component({
  selector: 'app-collectionpoint-search',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, CommonModule, Mapscomponent],
  templateUrl: './collectionpoint-search.html',
  styleUrl: './collectionpoint-search.css',
})
export class CollectionpointSearch {
  form: FormGroup;
  resultado: CollectionPoint | null = null;
  noEncontrado: boolean = false;

  constructor(
    private cpS: Collectionpointservice,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  buscar() {
    if (this.form.valid) {
      const id = Number(this.form.value.id);
      this.cpS.listId(id).subscribe({
        next: (data) => {
          this.resultado = data;
          this.noEncontrado = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.resultado = null;
          this.noEncontrado = true;
          this.cdr.detectChanges();
        },
      });
    }
  }
}
