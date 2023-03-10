const Utils = ChartUtils.init()
Chart.defaults.font.size = 36;

// total level chart
const chart_ctx1 = document.getElementById('pieChart');
piechart_data = [1, 1, 1];
piechart_label = ['低等', '中等', '高等']
var pieChart = new Chart(chart_ctx1, {
  
  type: 'pie',
  data: {
    labels: piechart_label,
    datasets: [{
      label: '人數',
      data: piechart_data,
    //   backgroundColor: [ // 背景色
      // 			"#FF0000",
      // 			"#00FF00",
      // 			"#0000FF",
      // 			],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
          display: true,
          text: '所有考生歷史等級分佈'
      }
    },
    scales: {
      // y: {
      //   beginAtZero: true
      // }
    },
    onClick: (e, activeEls) => {
        let datasetIndex = activeEls[0].datasetIndex;
        let dataIndex = activeEls[0].index;
        let datasetLabel = e.chart.data.datasets[datasetIndex].label;
        let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
        let label = e.chart.data.labels[dataIndex];
        console.log("In click", datasetLabel, label, value);
    }
  }
});

// personal chart
const chart_ctx2 = document.getElementById('lineChart');
linechart_data = [7, 1, 3, 5, 2, 3];
linechart_label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
var lineChart = new Chart(chart_ctx2, {
  type: 'line',
  data: {
    labels: linechart_label,
    datasets: [{
      label: '總得分',
      data: linechart_data,
      fill: true,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
      
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: '成績紀錄'
        }
    },
    scales: {
        x: {
            
            display: true,
            title: {
              display: true,
              text: '時間'
            },
            maxTicksLimit: 10,
            ticks: {
              source: 'auto',
              // Disabled rotation for performance
              maxRotation: 0,
              autoSkip: true,
            },
        },
        y: {
            beginAtZero: true,
            suggestedMax: 10,
            display: true,
            title: {
              display: true,
            //   text: '總得分'
            },

        }
    },
    onClick: (e, activeEls) => {
        let datasetIndex = activeEls[0].datasetIndex;
        let dataIndex = activeEls[0].index;
        let datasetLabel = e.chart.data.datasets[datasetIndex].label;
        let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
        let label = e.chart.data.labels[dataIndex];
        console.log("In click", datasetLabel, label, value);
    }
  }
});

// time chart
const chart_ctx3 = document.getElementById('barChart');
barchart_data = [12, 11, 3, 5, 2, 3, 3, 5, 2, 3];
barchart_label = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
var barChart = new Chart(chart_ctx3, {
  type: 'bar',
  data: {
    labels: barchart_label,
    datasets: [{
      label: '正確數',
      data: barchart_data,
    //   backgroundColor: [ // 背景色
      // 			"#FF0000",
      // 			"#00FF00",
      // 			"#0000FF",
      // 			],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
          display: true,
          text: '期間內考生正確題目分佈'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    onClick: (e, activeEls) => {
        let datasetIndex = activeEls[0].datasetIndex;
        let dataIndex = activeEls[0].index;
        let datasetLabel = e.chart.data.datasets[datasetIndex].label;
        let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
        let label = e.chart.data.labels[dataIndex];
        console.log("In click", datasetLabel, label, value);
    }
  }
});


