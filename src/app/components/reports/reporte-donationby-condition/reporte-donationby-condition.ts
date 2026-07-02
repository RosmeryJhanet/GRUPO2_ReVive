import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Donationservice } from '../../../services/donationservice';

@Component({
  selector: 'app-reporte-donationby-condition',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './reporte-donationby-condition.html',
  styleUrl: './reporte-donationby-condition.css',
})
export class ReporteDonationbyCondition implements OnInit {

  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'pie';

  constructor(
    private dS: Donationservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dS.getDonationbycondition().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map((donat) => donat.condition);

          this.barChartData = [
            {
              data: data.map((donat) => donat.quantity),
              label: 'Donation por condicion',
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
