import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ItemService } from '../../services/itemservice';

@Component({
  selector: 'app-report-item-category',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report-item-category.html',
  styleUrl: './report-item-category.css',
})
export class ReportItemCategory implements OnInit {
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(
    private iS: ItemService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.iS.getQuantityByCategory().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map((item) => item.nameCategory);

          this.barChartData = [
            {
              data: data.map((item) => item.quantityItems),
              label: 'Cantidad de artículos',
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