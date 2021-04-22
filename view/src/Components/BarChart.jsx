import React from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends React.PureComponent{
  state = {
    chartData: {
      ticks: {
        display: false
      }
    }
  }

  componentDidMount(){
        if(this.props.y){
      this.setState({
        chartData: {
          ticks: {
            beginAtZero:true,
            min: 0,
            max: 100,
            display: true    
        }
        }
      })
    }
  }
  render() {
    
    const data = {
        labels: this.props.lables,
        datasets: [
          {
            label: this.props.lable,
            borderColor: this.props.borderColor,
            borderWidth: 2,
            data: this.props.data
          }
        ]
      };
    return (
      <div style={{height: '180px'}}>
        <Bar
          data={data}
          width={100}
          height={150}
          options={{
            maintainAspectRatio: false,
            title:{
              display:this.props.displayTitle,
              fontSize: 10
            },
            legend:{
                display:false,
                position:'right'
            },
            scales: {
              yAxes: [
                this.state.chartData
              ]
              }
          }}
        />
      </div>
    );
  }
};

export default BarChart;