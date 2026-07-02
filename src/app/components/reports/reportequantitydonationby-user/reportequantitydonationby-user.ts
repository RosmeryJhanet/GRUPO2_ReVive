import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Donationservice } from '../../../services/donationservice';

@Component({
  selector: 'app-reportequantitydonationby-user',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './reportequantitydonationby-user.html',
  styleUrl: './reportequantitydonationby-user.css',
})
export class ReportequantitydonationbyUser implements OnInit {

  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(
    private dS: Donationservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dS.getQuantityByUser().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map((donat) => donat.user);

          this.barChartData = [
            {
              data: data.map((donat) => donat.quantityDonation),
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
