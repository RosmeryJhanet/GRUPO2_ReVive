import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Productservice } from '../../../services/productservice';

@Component({
  selector: 'app-report3',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report3.html',
  styleUrl: './report3.css',
})
export class Report3 implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(
    private pS: Productservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.pS.cantidadProductosPorCategoria().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => item.nameCategory);
          this.barChartData = [
            {
              data: data.map((item) => item.totalProductos),
              label: 'Cantidad de productos',
              backgroundColor: [
                '#4cae4f',
                '#80c684',
                '#a4d5a6',
                '#ddeec9',
                '#2e5c2f',
              ],
            },
          ];
        } else {
          this.hasData = false;
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.hasData = false;
        this.cdr.detectChanges();
      },
    });
  }
}
