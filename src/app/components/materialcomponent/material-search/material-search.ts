import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QueryNativeMaterialTypeDTO } from '../../../models/query-native-material-type';
import { Materialservice } from '../../../services/materialservice';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material-search',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './material-search.html',
  styleUrl: './material-search.css',
})
export class MaterialSearch {
  form: FormGroup;
  dataSource: MatTableDataSource<QueryNativeMaterialTypeDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  noEncontrado: boolean = false;

  constructor(
    private mS: Materialservice,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
    });
  }

  buscar() {
    if (this.form.valid) {
      this.mS.searchByType(this.form.value.type).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.noEncontrado = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.dataSource.data = [];
          this.noEncontrado = true;
          this.cdr.detectChanges();
        },
      });
    }
  }
}
