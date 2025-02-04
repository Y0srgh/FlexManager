import { Component, OnInit, ViewChild } from '@angular/core';
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
  view: [number, number] = [700, 300];
  colorScheme = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3', '#FF9800', '#4CAF50', '#E91E63'],
  };
  latestStats: any[] = [];
  Math = Math; 
  curve = curveCatmullRom; 

  constructor(private fitnessTrackingService: FitnessTrackingService) {}

  ngOnInit() {
    this.loadProgressData();
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
        { label: 'Current Weight', value: `${latest.weight} kg` },
        { label: 'Fat Rate', value: `${latest.fatRate}%` },
        { label: 'Muscle Rate', value: `${latest.muscleRate}%` },
        { label: 'Calories Burned', value: `${latest.caloriesBurned} kcal` },
      ];
    }
  }

  private processData(data: any[]) {
    const metrics = ['weight', 'fatRate', 'muscleRate', 'caloriesBurned'];
    const names = ['Weight', 'Fat Rate', 'Muscle Rate', 'Calories Burned'];

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
    console.log('data', data);
    
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
  
    console.log('datas ------------', datas);
    return datas;
  }
  

  private calculateTrend(series: any[]): number {
    if (series.length < 2) return 0;
    const first = series[0].value;
    const last = series[series.length - 1].value;
    return Number((((last - first) / first) * 100).toFixed(1));
  }
}
