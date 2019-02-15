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
            <p>최근 3일 미세먼지 수치</p>
          </div>
          <center>
            <AreaChart
              width={400}
              height={100}
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
                stroke="#a5d8ff"
                fill="#a5d8ff"
              />
            </AreaChart>
          </center>
        </div>
        <div>
          <div style={{textAlign : "center"}}>
            <p>최근 3일 초미세 먼지 수치</p>          
          </div>
            <AreaChart
              width={400}
              height={100}
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
                stroke="#c5f6fa"
                fill="#c5f6fa"
              />
            </AreaChart>
          
        </div>
      </div>
    );
  }
}

export default Chart;
