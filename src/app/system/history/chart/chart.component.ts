import { Component, Input } from '@angular/core';
import { PieChartModule } from "@swimlane/ngx-charts";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    PieChartModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() data: any;
}
