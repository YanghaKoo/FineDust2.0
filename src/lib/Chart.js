import React, { Component } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class Chart extends Component {
  render() {

    if(this.props.data.length === 0) return <div/>

    return (
      <LineChart
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
      </LineChart>
    );
  }
}

export default Chart;
