import { constants } from "fs";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";


const MortalityChart = ({ data }: any) => {
  

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis dataKey="name" padding={{ left: 3, right: 3 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="capital"
          stroke="#82ca5d"
          className="mt-4"
        />
        <Line
          type="monotone"
          dataKey="net_profit"
          stroke="#0180EA"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="total_expense" stroke="#0A2A5E" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MortalityChart;
