import React from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends React.PureComponent{

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
        <Line
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
              yAxes: [{
                ticks: {
                    display: false 
                }
              }]
              }
          }}
        />
      </div>
    );
  }
};

export default Chart;