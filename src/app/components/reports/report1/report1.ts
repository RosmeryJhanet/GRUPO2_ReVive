import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Reportservice } from '../../../services/reportservice';
import { QueryNativeUserDTO } from '../../../models/QueryNativeUserDTO';

@Component({
  selector: 'app-report1',
  imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule],
  templateUrl: './report1.html',
  styleUrl: './report1.css',
})
export class Report1 implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<QueryNativeUserDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: Reportservice) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarReporte() {
    this.rS.usuariosSinTrueque().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        if (err.status === 404) {
          this.dataSource.data = [];
        }
      },
    });
  }
}
