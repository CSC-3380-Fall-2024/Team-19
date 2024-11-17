import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
//import eventTypes from "./calendar/events/eventTypes.ts"

//convert EventItem -> Budget Item values
//name ->
//type(category) -> name(current, change ofc)
//price -> value
//color: (create cohesive grouping (add to eventItem))

//Ideal:
//Get needed vals/props from calendar,
//1. get group/category to place in
//2. specialize within greater category when clickedon (on calendar) by name

interface BudgetItem {
  name: string;
  value: number;
  color: string;
}

interface BudgetChartProps {
  initialData?: BudgetItem[];
}

const COLORS = ['#8B4513', '#90EE90', '#6495ED', '#4169E1', '#1E90FF', '#D3D3D3', '#FFA500'];

const INITIAL_DATA: BudgetItem[] = [
  { name: 'Food', value: 90, color: '#22c55e' },
  { name: 'Transportation', value: 30, color: '#808080' },
  { name: 'Activities', value: 150, color: '#4169E1' },
  { name: 'Entertainment', value: 100, color: '#fb923c' },
  { name: 'Souveniers', value: 70, color: '#D3D3D3' },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`$${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const BudgetChart: React.FC<BudgetChartProps> = ({ initialData = INITIAL_DATA }) => {
  const [data, setData] = useState<BudgetItem[]>(initialData);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const totalBudget = data.reduce((sum, item) => sum + item.value, 0);
 //change size / shape / color
  return (
    <div className="w-[500px] h-[755px] bg-gray-800 p-5 rounded-xl"> 
      <h2 className="text-white text-center text-2xl mb-5">Itenerary Budget</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, 'Value']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-white text-center mt-5">
        Total Budget: ${totalBudget}
      </div>
    </div>
  );
};

export default BudgetChart;

//default budget circle values:

// const COLORS = ['#8B4513', '#90EE90', '#6495ED', '#4169E1', '#1E90FF', '#D3D3D3', '#FFA500'];

// const INITIAL_DATA: BudgetItem[] = [
//   { name: 'Hotel', value: 1200, color: '#8B4513' }, //have these values be based on calendar values (when clicked)
//   { name: 'Food', value: 400, color: '#90EE90' },
//   { name: 'Transportation', value: 200, color: '#6495ED' },
//   { name: 'Utilities', value: 150, color: '#4169E1' },
//   { name: 'Entertainment', value: 100, color: '#1E90FF' },
//   { name: 'Savings', value: 300, color: '#D3D3D3' },
//   { name: 'Miscellaneous', value: 150, color: '#FFA500' },
// ];