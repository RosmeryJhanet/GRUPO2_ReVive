import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { RecyclingService } from '../../services/recyclingservice';

@Component({
  selector: 'app-report-recycling-user',
  imports: [BaseChartDirective, MatIconModule],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './report-recycling-user.html',
  styleUrl: './report-recycling-user.css',
})
export class ReportRecyclingUser implements OnInit {
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(
    private rS: RecyclingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rS.getQuantityByUser().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map((item) => item.nameUser);

          this.barChartData = [
            {
              data: data.map((item) => item.quantityRecycling),
              label: 'Cantidad de reciclajes',
              backgroundColor: [
                '#4cae4f',
                '#80c684',
                '#2e7d32',
                '#a5d6a7',
                '#1b5e20',
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