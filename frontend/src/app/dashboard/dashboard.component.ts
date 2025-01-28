import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.renderBarChart();
    this.renderPieChart();
    this.renderLineChart();
    this.renderPieChartRevenue();
    this.renderBarChartSubscription();
  }

  renderBarChart() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['mohamed', 'heni', 'maha', 'imen', 'wael'],
        datasets: [
          {
            label: 'Requests',
            data: [45, 30, 25, 20, 15],
            backgroundColor: [
              '#421A3F', // Dark purple
              '#5F2B4F', // Deep purple
              '#693B5D', // Medium purple
              '#723680', // Medium purple
              '#864A94', // Medium purple
              // '#E5924E', // Warm orange
              // '#181818'  // Dark grey
            ],
          },
        ],
      },
    });
  }

  renderPieChart() {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Monthly', 'Quarterly', 'Yearly'],
        datasets: [
          {
            data: [40, 30, 30],
            backgroundColor: [
              '#421A3F', // Dark purple
              '#723680', // Deep purple
              '#693B5D'  // Medium purple
            ],
          },
        ],
      },
    });
  }

  renderLineChart() {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [5000, 7000, 8000, 6000, 11000, 15000, 14000, 13000, 12000, 14000, 16000, 18000],
            borderColor:   '#693B5D', // Warm orange

            backgroundColor: 'rgba(66, 26, 63, 0.2)', // Lightened dark purple for area fill
          },
        ],
      },
    });
  }

  renderPieChartRevenue() {
    new Chart('pieChartRevenue', {
      type: 'pie',
      data: {
        labels: ['Basic', 'Premium', 'VIP'],
        datasets: [
          {
            data: [50, 30, 20],
            backgroundColor: [
              '#421A3F', // Dark purple

              '#723680', // Medium purple
              '#5F2B4F' // Deep purple
            ],
          },
        ],
      },
    });
  }

  renderBarChartSubscription() {
    new Chart('barChartSubscription', {
      type: 'bar',
      data: {
        labels: ['mohamed', 'heni', 'maha', 'imen', 'wael'],
        datasets: [
          {
            label: 'Subscriptions',
            data: [15, 25, 18, 30, 10],
            backgroundColor: [
              '#421A3F', // Dark purple
              '#693B5D', // Medium purple
              '#5F2B4F', // Deep purple
              '#723680', // Deep purple
              '#864A94', // Deep purple
              // '#E5924E', // Warm orange
             
              
              
              // '#181818' // Dark grey
            ],
          },
        ],
      },
    });
  }
}
