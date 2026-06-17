import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Locationservice } from '../../../services/locationservice';
import { MatIconModule } from '@angular/material/icon';
import { Location as LocationModel } from '../../../models/location';


@Component({
  selector: 'app-location-list',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './location-list.html',
  styleUrl: './location-list.css',
})
export class LocationList implements OnInit {
  dataSource:MatTableDataSource<LocationModel> = new MatTableDataSource<LocationModel>();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4','c5', 'c6'];

  constructor (private lS: Locationservice){}

  ngOnInit(): void {
    this.cargarUbicaciones();
  }

  cargarUbicaciones(){
    this.lS.list().subscribe({
      next:(data)=>{
        this.dataSource.data=data;
      },
    
    });
  }
  eliminar(id: number) {
    this.lS.delete(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
  

}
