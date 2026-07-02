import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Reportservice } from '../../../services/reportservice';

@Component({
  selector: 'app-report2',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report2.html',
  styleUrl: './report2.css',
})
export class Report2 implements OnInit {
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
  //npm install chart.js ng2-charts
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(
    private rS: Reportservice,
    private cdr: ChangeDetectorRef,
  ) {}
  //npm install chart.js ng2-charts
  ngOnInit(): void {
    this.rS.cantidadTruequesPorUsuario().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => `${item.full_Name} (${item.month})`);
          this.barChartData = [
            {
              data: data.map((item) => item.quantity),
              label: 'Cantidad de trueques',
              backgroundColor: [
                '#4cae4f', // Fruit Salad
                '#80c684', // De York
                '#a4d5a6', // Moss Green
                '#ddeec9', // Chrome
                '#2e5c2f', // Verde oscuro
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
