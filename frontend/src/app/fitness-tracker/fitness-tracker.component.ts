import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { FitnessTrackingService } from './fitness-tracker.service';
import { ProgressTracking } from './progress-tracking.interface';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { curveCatmullRom } from 'd3-shape';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  // Default view dimensions – these will be updated on init and window resize.
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

  constructor(private fitnessTrackingService: FitnessTrackingService) {}

  ngOnInit() {
    this.setViewDimensions();
    this.loadProgressData();
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setViewDimensions();
  }

  // Adjust the chart view dimensions based on the window width
  private setViewDimensions() {
    const width = window.innerWidth;
    if (width < 576) {
      // For very small screens, use 95% of the window width
      this.view = [width * 0.95, 300];
    } else if (width < 992) {
      // For medium screens, use a slightly smaller width
      this.view = [Math.min(700, width * 0.9), 300];
    } else {
      // For larger screens, use the default width
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
        { label: 'Current Weight', value: `${latest.weight || 'not precised'} kg` },
        { label: 'Fat Rate', value: `${latest.fatRate || 0}%` },
        { label: 'Muscle Rate', value: `${latest.muscleRate || 0}%` },
        { label: 'Calories Burned', value: `${latest.caloriesBurned || 0} kcal` },
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
          minute: '2-digit'
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

  
}
