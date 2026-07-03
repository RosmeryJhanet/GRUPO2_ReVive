import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Report1 } from '../report1/report1';
import { Report2 } from '../report2/report2';
import { ReportItemCategory } from '../../report-item-category/report-item-category';
import { ReportRecyclingUser } from '../../report-recycling-user/report-recycling-user';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, Report1, Report2, ReportItemCategory, ReportRecyclingUser],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
