const Utils = ChartUtils.init()

// total level chart
function NewPieChart(data, label){
  var ctx1 = document.getElementById('pieChart');

  var pieChart = new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: label,
      datasets: [{
        label: '總得分',
        data: data,
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
}


// personal chart
const ctx2 = document.getElementById('lineChart');
linechart_data = [7, 1, 3, 5, 2, 3];
linechart_label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
var lineChart = new Chart(ctx2, {
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
            text: '個人成績紀錄'
        }
    },
    scales: {
        x: {
            
            display: true,
            title: {
              display: true,
              text: '時間'
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
const ctx3 = document.getElementById('barChart');
barchart_data = [12, 11, 3, 5, 2, 3];
barchart_label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
var barChart = new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: linechart_label,
    datasets: [{
      label: '總得分',
      data: linechart_data,
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

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}

function changeValue(){
  console.log(lineChart.data.labels);
  // if(document.getElementById('v').value == 'e'){
  //   console.log(lineChart.data.datasets[0].data);
  //   lineChart.data.datasets[0].data = [1, 1, 1, 1, 1, 1];
  //   console.log(lineChart.data.datasets[0].data);
  //   lineChart.update();
  // }
  // d = [document.getElementById('v').value, document.getElementById('v').value, document.getElementById('v').value];
  // l = ['1', '11', '111'];
  // NewPieChart(d, l);
    
    // for (i=0;i<pieChart.data.labels.length; i++){
    //   console.log(i);
    //   removeData(pieChart);
    //   // addData(pieChart, document.getElementById('v').value, document.getElementById('v').value);
    //   // piechart_data[i] = parseInt(document.getElementById('v').value);
    //   // piechart_data.push(i);
    //   // piechart_label.push(i);
    // }
    // for (i=0;i<pieChart.data.labels.length; i++){
    //   console.log(i);
    //   // removeData(pieChart);
    //   addData(pieChart, document.getElementById('v').value, document.getElementById('v').value);
    //   // piechart_data[i] = parseInt(document.getElementById('v').value);
    //   // piechart_data.push(i);
    //   // piechart_label.push(i);
    // }
    // piechart_data = [1, 1, 1, 1, 1, 1]; //parseInt(document.getElementById('v').value)
    
    
    // pieChart.update();
}
