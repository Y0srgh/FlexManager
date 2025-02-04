import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { FitnessTrackingService } from './fitness-tracker.service';
import { ProgressTracking } from './progress-tracking.interface';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { curveCatmullRom } from 'd3-shape';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ProgressFormDialogComponent } from '../progress-form-dialog/progress-form-dialog.component';

@Component({
  selector: 'app-fitness-tracker',
  templateUrl: './fitness-tracker.component.html',
  styleUrls: ['./fitness-tracker.component.css'],
  animations: [
    trigger('animationState', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      transition('inactive <=> active', animate('300ms ease-in-out')),
    ]),
  ],
})
export class FitnessTrackerComponent implements OnInit {
  metrics: any[] = [];
  view: [number, number] = [700, 300];
  colorScheme = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3', '#fff', '#fff', '#fff'],
  };
  latestStats: any[] = [];
  Math = Math;
  curve = curveCatmullRom;

  constructor(private fitnessTrackingService: FitnessTrackingService, private dialog: MatDialog) {}

  ngOnInit() {
    this.setViewDimensions();
    this.loadProgressData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setViewDimensions();
  }

  private setViewDimensions() {
    const width = window.innerWidth;
    if (width < 576) {
      this.view = [width * 0.95, 300];
    } else if (width < 992) {
      this.view = [Math.min(700, width * 0.9), 300];
    } else {
      this.view = [700, 300];
    }
  }

  private loadProgressData() {
    this.fitnessTrackingService.getProgressHistory().subscribe({
      next: (data) => {
        this.processData(data);
        this.calculateLatestStats(data);
      },
      error: (error) => {
        console.error('Error loading progress data:', error);
      },
    });
  }

  private calculateLatestStats(data: any[]) {
    if (data.length > 0) {
      const latest = data[data.length - 1];
      this.latestStats = [
        {
          label: 'Current Weight',
          value: `${latest.weight || 'not precised'} kg`,
        },
        { label: 'Fat Rate', value: `${latest.fatRate || 0}%` },
        { label: 'Muscle Rate', value: `${latest.muscleRate || 0}%` },
        {
          label: 'Calories Burned',
          value: `${latest.caloriesBurned || 0} kcal`,
        },
      ];
    }
  }

  private processData(data: any[]) {
    const metrics = ['weight', 'caloriesBurned', 'fatRate', 'muscleRate'];
    const names = ['Weight', 'Calories Burned', 'Fat Rate', 'Muscle Rate'];

    this.metrics = metrics.map((metric, index) => {
      const series = this.transformData(data, metric);
      const trend = this.calculateTrend(series);

      return {
        name: names[index],
        index,
        metric,
        data: [
          {
            name: `${names[index]} Progress`,
            series: series,
          },
        ],
        trend: trend,
      };
    });
  }

  private transformData(data: any[], metric: string) {
    const datas = data
      .map((item) => ({
        name: new Date(item.updatedAt).toLocaleDateString('fr-FR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        value: item[metric],
      }))
      .filter((item) => item.value !== null);
    return datas;
  }

  private calculateTrend(series: any[]): number {
    if (series.length < 2) return 0;
    const first = series[0].value;
    const last = series[series.length - 1].value;
    return Number((((last - first) / first) * 100).toFixed(1));
  }

  isFormOpen = false;
  selectedMetric: string = '';
  progressEntry: { metric: string; value: number } = {
    metric: '',
    value: 0,
  };

  openProgressForm(metricName: string): void {
    const dialogRef = this.dialog.open(ProgressFormDialogComponent, {
      data: { metricName },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('-----------', result);
        const record = { [result.name.metricName]: result.value.value };
        console.log(record);
        this.fitnessTrackingService.addProgressEntry(record).subscribe({
          next: (data) => {
           console.log("data");
           this.loadProgressData();
          },
          error: (error) => {
            console.error('Error loading progress data:', error);
          },
        });
        
        this.addNewRecord(metricName, result.value, result.date);
      }
    });
  }


  private addNewRecord(metricName: string, value: number, date: Date): void {
    const metricIndex = this.metrics.findIndex(m => m.name === metricName);
    if (metricIndex !== -1) {
      this.metrics[metricIndex].data.push({
        name: date.toISOString(),
        value: value
      });
      this.metrics[metricIndex].trend = this.calculateTrend(this.metrics[metricIndex].data[0].series);
    }
  }

}
