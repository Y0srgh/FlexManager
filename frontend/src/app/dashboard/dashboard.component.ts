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
        labels: ['John Doe', 'Jane Smith', 'Tom Brown', 'Lucy Green', 'Mark Lee'],
        datasets: [
          {
            label: 'Requests',
            data: [45, 30, 25, 20, 15],
            backgroundColor: ['#896CFE', '#A48EF5', '#B0A6FE', '#C7BEF5', '#D8D4FE'],
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
            backgroundColor: ['#896CFE', '#A48EF5', '#B0A6FE'],
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
            borderColor: '#896CFE',
            backgroundColor: 'rgba(137, 108, 254, 0.2)',
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
            backgroundColor: ['#4A47A3', '#B0A6FE', '#896CFE'],
          },
        ],
      },
    });
  }

  renderBarChartSubscription() {
    new Chart('barChartSubscription', {
      type: 'bar',
      data: {
        labels: ['John Doe', 'Jane Smith', 'Tom Brown', 'Lucy Green', 'Mark Lee'],
        datasets: [
          {
            label: 'Subscriptions',
            data: [15, 25, 18, 30, 10],
            backgroundColor: ['#4A47A3', '#A48EF5', '#B0A6FE', '#C7BEF5', '#D8D4FE'],
          },
        ],
      },
    });
  }
}
