import { Component, OnInit } from '@angular/core';
import { Material } from '../../../models/Material';
import { MatTableDataSource } from '@angular/material/table';
import { Materialservice } from '../../../services/materialservice';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-material-list',
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './material-list.html',
  styleUrl: './material-list.css',
})
export class MaterialList implements OnInit {

  dataSource: MatTableDataSource<Material> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private mS: Materialservice) {}

ngOnInit(): void {
    this.cargarMateriales();
  }

   cargarMateriales() {
    this.mS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }
  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
