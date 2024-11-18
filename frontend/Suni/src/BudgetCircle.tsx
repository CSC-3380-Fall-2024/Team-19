import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { EVENTS } from './calendar/events/eventConstants'; // Assuming EVENTS is imported from eventConstants.ts
import { Food, Activity, Transportation, Entertainment, EventItem } from './calendar/events/eventTypes'; // Assuming these are your event types

// Define the BudgetItem type
interface BudgetItem {
  name: string;
  value: number;
  color: string;
}

interface BudgetChartProps {
  initialData?: BudgetItem[];
}

const COLORS = ['#8B4513', '#90EE90', '#6495ED', '#4169E1', '#1E90FF', '#D3D3D3', '#FFA500'];

// This function will categorize the events and return budget items
const generateBudgetData = (events: EventItem[]): BudgetItem[] => {
  // Use reduce to categorize the events
  const categorizedEvents = events.reduce(
    (acc, event) => {
      if (event?.data?.food) acc.foods.push(event);
      if (event?.data?.activity) acc.activities.push(event);
      if (event?.data?.transportation) acc.transportations.push(event);
      if (event?.data?.entertainment) acc.entertainments.push(event);
      return acc;
    },
    {
      foods: [] as EventItem[],
      activities: [] as EventItem[],
      transportations: [] as EventItem[],
      entertainments: [] as EventItem[],
    }
  );

  // Convert each category into a BudgetItem
  const budgetData: BudgetItem[] = [];

  // Map over each category and create the corresponding BudgetItem
  categorizedEvents.foods.forEach((event) => {
    const food = event.data?.food;
    if (food) {
      budgetData.push({
        name: food.name,
        value: food.price, // Use price for the value
        color: COLORS[0], // Assign a color
      });
    }
  });

  categorizedEvents.activities.forEach((event) => {
    const activity = event.data?.activity;
    if (activity) {
      budgetData.push({
        name: activity.name,
        value: 50, // Placeholder value for activity
        color: COLORS[1], // Assign a color
      });
    }
  });

  categorizedEvents.transportations.forEach((event) => {
    const transportation = event.data?.transportation;
    if (transportation) {
      budgetData.push({
        name: transportation.name,
        value: transportation.price, // Use price for the value
        color: COLORS[2], // Assign a color
      });
    }
  });

  categorizedEvents.entertainments.forEach((event) => {
    const entertainment = event.data?.entertainment;
    if (entertainment) {
      budgetData.push({
        name: entertainment.name,
        value: 100, // Placeholder value for entertainment
        color: COLORS[3], // Assign a color
      });
    }
  });

  return budgetData;
};

// Generate the initial data dynamically from the EVENTS array
const INITIAL_DATA: BudgetItem[] = generateBudgetData(EVENTS);

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

  return (
    <div className="w-[500px] h-[755px] bg-gray-800 p-5 rounded-xl">
      <h2 className="text-white text-center text-2xl mb-5">Itinerary Budget</h2>
      <div className="text-white text-center mb">
        Total Budget: ${totalBudget}
      </div>
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
          {/* <Legend /> (auto shows values b color, unneeded rn for styling reasons*/}
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default BudgetChart;
