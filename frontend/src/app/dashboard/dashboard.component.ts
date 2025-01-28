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
  memberDemographics = {
    "18-24": 40,
    "25-34": 30,
    "35-44": 20,
    "45+": 10
  };

  revenueByMembership = {
    "Standard": 3000,
    "Premium": 2000,
    "VIP": 1000
  };

  visitFrequency = [50, 60, 70, 80, 90, 100, 110]; // Weekly visit frequency

  trainerPerformance = {
    "Trainer A": 150,
    "Trainer B": 130,
    "Trainer C": 100
  };

  memberRetentionRate = [95, 90, 85, 80, 75, 70, 65]; // Retention rate over months



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
            backgroundColor: '#003f5c' 
          },
          {
            label: 'Expense',
            data: this.revenueAnalytics.map(d => d.expense),
            backgroundColor: '#ffa600' // Purple color for expense
          }
        ]
      }
    });
  
    const capacityCtx = document.getElementById('capacityChart') as HTMLCanvasElement;
    new Chart(capacityCtx, {
      type: 'line',
      data: {
        labels: this.revenueAnalytics.map(d => d.month),
        datasets: [
          {
            label: 'Gym Capacity',
            data: this.gymCapacityAnalytics,
            borderColor: '#003f5c', 
            backgroundColor: 'rgba(66, 66, 67, 0.2)', 
            fill: true
          }
        ]
      }
    });
  
    const trainerCtx = document.getElementById('trainerChart') as HTMLCanvasElement;
    new Chart(trainerCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.trainerDistribution),
        datasets: [
          {
            data: Object.values(this.trainerDistribution),
            backgroundColor: ['#FF6F61', '#6B5B93', '#88B04B'] // Updated colors for pie chart
          }
        ]
      }
    });
  
    const demographicsCtx = document.getElementById('demographicsChart') as HTMLCanvasElement;
    new Chart(demographicsCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.memberDemographics),
        datasets: [
          {
            data: Object.values(this.memberDemographics),
            backgroundColor: ['#FF6F61', '#6B5B93', '#88B04B', '#F7CAC9'] // Updated colors for pie chart
          }
        ]
      }
    });
  
    const membershipRevenueCtx = document.getElementById('membershipRevenueChart') as HTMLCanvasElement;
    new Chart(membershipRevenueCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.revenueByMembership),
        datasets: [
          {
            label: 'Revenue',
            data: Object.values(this.revenueByMembership),
            backgroundColor: '#FF6F61' // Updated color
          }
        ]
      }
    });
  
    const visitFrequencyCtx = document.getElementById('visitFrequencyChart') as HTMLCanvasElement;
    new Chart(visitFrequencyCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
        datasets: [
          {
            label: 'Visits',
            data: this.visitFrequency,
            borderColor: '#6B5B93', // Updated color
            backgroundColor: 'rgba(107, 91, 147, 0.2)', // Maintain background color
            fill: true
          }
        ]
      }
    });
  
    const trainerPerformanceCtx = document.getElementById('trainerPerformanceChart') as HTMLCanvasElement;
    new Chart(trainerPerformanceCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.trainerPerformance),
        datasets: [
          {
            label: 'Sessions Conducted',
            data: Object.values(this.trainerPerformance),
            backgroundColor: ['#FF6F61', '#6B5B93', '#88B04B'] // Updated colors for bar chart
          }
        ]
      }
    });
  
    const retentionRateCtx = document.getElementById('retentionRateChart') as HTMLCanvasElement;
    new Chart(retentionRateCtx, {
      type: 'line',
      data: {
        labels: this.revenueAnalytics.map(d => d.month),
        datasets: [
          {
            label: 'Retention Rate',
            data: this.memberRetentionRate,
            borderColor: '#F7CAC9', // Updated color for line
            backgroundColor: 'rgba(247, 202, 201, 0.2)', // Maintain background color
            fill: true
          }
        ]
      }
    });
}
  


 

}
