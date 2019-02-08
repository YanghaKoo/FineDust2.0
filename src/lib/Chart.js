import React, { Component } from "react";
import "./Chart.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from "recharts";

class Chart extends Component {
  render() {
    if (this.props.data.length === 0) return <div />;

    return (
      <div className="chart">
        {/* <LineChart
        width={400}
        height={200}
        data={this.props.data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="미세"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="초미세" stroke="#82ca9d" />
      </LineChart> */}
        <div>
          <div style={{textAlign : "center"}}>
            <p>최근 3일 미세먼지</p>
          </div>
          <center>
            <AreaChart
              width={400}
              height={150}
              data={this.props.data}
              syncId="anyId"
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="미세"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </center>
        </div>
        <div>
          <div style={{textAlign : "center"}}>
            <p>최근 3일 초미세 먼지</p>          
          </div>
            <AreaChart
              width={400}
              height={150}
              data={this.props.data}
              syncId="anyId"
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="초미세"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          
        </div>
      </div>
    );
  }
}

export default Chart;
