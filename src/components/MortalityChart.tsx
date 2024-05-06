"use client";
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
  AreaChart,
  Area,
} from "recharts";

const productSales = [
  {
    name: "Jan",
    product1: 4000,
    product2: 2400,
  },
  {
    name: "Feb",
    product1: 3000,
    product2: 2210,
  },
  {
    name: "Mar",
    product1: 2000,
    product2: 2290,
  },
  {
    name: "Apr",
    product1: 2780,
    product2: 2000,
  },
  {
    name: "May",
    product1: 1890,
    product2: 2181,
  },
  {
    name: "Jun",
    product1: 2390,
    product2: 2500,
  },
];

const MortalityChart = ({ data }: any) => {
  // console.log(data);
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={data} margin={{ right: 30 }}>
          <YAxis />
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="5 5" />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Area
            type="monotone"
            dataKey="capital"
            stroke="#2563eb"
            fill="#3b82f6"
            stackId="1"
          />

          <Area
            type="monotone"
            dataKey="net_profit"
            stroke="#7c3aed"
            fill="#8b5cf6"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="total_expense"
            stroke="#7c3aed"
            fill="#8b5cf6"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* <ResponsiveContainer width="100%" height="100%">
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
      </ResponsiveContainer> */}
    </>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-[--primary] flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-gray-100">{label}</p>
        <p className="text-sm text-white">
          Net Profit:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-white">
          Total Expense:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default MortalityChart;
