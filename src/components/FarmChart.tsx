import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3E93F6", "#02579E", "#C3A6FF", "#B6C8F8", "#F84D4D"];

// const RADIAN = Math.PI / 180;

const datacart = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
];

const FarmChart = ({ data }: any) => {
  // console.log(data);
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            data={data?.pie_data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value">
            {data?.pie_data?.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default FarmChart;
