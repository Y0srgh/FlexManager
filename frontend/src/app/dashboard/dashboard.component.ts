import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  revenue = {
    amount: '$4.53K',
    growth: 2.1,
    month: 'July'
  };

  statistics = {
    members: { count: 89, change: -1.8 },
    visited: { count: 56, change: -1.3 },
    trainers: { count: 12, change: 3.6 }
  };

  gymCapacity = 56;

  revenueAnalytics = [
    { month: 'Jan', revenue: 400, expense: 200 },
    { month: 'Feb', revenue: 600, expense: 300 },
    { month: 'Mar', revenue: 700, expense: 450 },
    { month: 'Apr', revenue: 800, expense: 500 },
    { month: 'May', revenue: 900, expense: 600 },
    { month: 'Jun', revenue: 1100, expense: 700 },
    { month: 'Jul', revenue: 1200, expense: 800 }
  ];

  gymCapacityAnalytics = [60, 65, 70, 75, 80, 85, 90]; // Capacity over months

  trainerDistribution = {
    "Trainer A": 5,
    "Trainer B": 4,
    "Trainer C": 3
  };

  ngAfterViewInit() {
    const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: this.revenueAnalytics.map(d => d.month),
        datasets: [
          {
            label: 'Revenue',
            data: this.revenueAnalytics.map(d => d.revenue),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          },
          {
            label: 'Expense',
            data: this.revenueAnalytics.map(d => d.expense),
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      }
    });

    // Gym capacity line chart
    const capacityCtx = document.getElementById('capacityChart') as HTMLCanvasElement;
    new Chart(capacityCtx, {
      type: 'line',
      data: {
        labels: this.revenueAnalytics.map(d => d.month),
        datasets: [
          {
            label: 'Gym Capacity',
            data: this.gymCapacityAnalytics,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true
          }
        ]
      }
    });

    // Trainer distribution pie chart
    const trainerCtx = document.getElementById('trainerChart') as HTMLCanvasElement;
    new Chart(trainerCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.trainerDistribution),
        datasets: [
          {
            data: Object.values(this.trainerDistribution),
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)']
          }
        ]
      }
    });
  }
}
