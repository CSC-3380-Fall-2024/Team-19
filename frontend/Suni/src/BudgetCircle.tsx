'use client'

import React, { useState, useCallback } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { EVENTS } from './calendar/events/eventConstants'
import { Food, Activity, Transportation, Entertainment, EventItem } from './calendar/events/eventTypes'

interface BudgetItem {
  name: string
  value: number
  color: string
}

interface BudgetChartProps {
  initialData?: BudgetItem[]
}

const COLORS = ['#8B4513', '#90EE90', '#6495ED', '#4169E1', '#1E90FF', '#D3D3D3', '#FFA500']

const generateBudgetData = (events: EventItem[]): BudgetItem[] => {
  const categorizedEvents = events.reduce(
    (acc, event) => {
      if (event?.data?.food) acc.foods.push(event)
      if (event?.data?.activity) acc.activities.push(event)
      if (event?.data?.transportation) acc.transportations.push(event)
      if (event?.data?.entertainment) acc.entertainments.push(event)
      return acc
    },
    {
      foods: [] as EventItem[],
      activities: [] as EventItem[],
      transportations: [] as EventItem[],
      entertainments: [] as EventItem[],
    }
  )

  const budgetData: BudgetItem[] = []

  categorizedEvents.foods.forEach((event) => {
    const food = event.data?.food
    if (food) {
      budgetData.push({
        name: food.name,
        value: food.price,
        color: COLORS[0],
      })
    }
  })

  categorizedEvents.activities.forEach((event) => {
    const activity = event.data?.activity
    if (activity) {
      budgetData.push({
        name: activity.name,
        value: activity.price,
        color: COLORS[1],
      })
    }
  })

  categorizedEvents.transportations.forEach((event) => {
    const transportation = event.data?.transportation
    if (transportation) {
      budgetData.push({
        name: transportation.name,
        value: transportation.price,
        color: COLORS[2],
      })
    }
  })

  categorizedEvents.entertainments.forEach((event) => {
    const entertainment = event.data?.entertainment
    if (entertainment) {
      budgetData.push({
        name: entertainment.name,
        value: entertainment.price || 0,
        color: COLORS[3],
      })
    }
  })

  return budgetData
}

const INITIAL_DATA: BudgetItem[] = generateBudgetData(EVENTS)

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + outerRadius * 0.1) * cos
  const sy = cy + (outerRadius + outerRadius * 0.1) * sin
  const mx = cx + (outerRadius + outerRadius * 0.3) * cos
  const my = cy + (outerRadius + outerRadius * 0.3) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff" fontSize="12">
        {`$${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize="10">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const BudgetChart: React.FC<BudgetChartProps> = ({ initialData = INITIAL_DATA }) => {
  const [data] = useState<BudgetItem[]>(initialData)
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index)
  }, [])

  const onPieLeave = useCallback(() => {
    setActiveIndex(undefined)
  }, [])

  const totalBudget = data.reduce((sum, item) => sum + item.value, 0)

  const getCenterText = () => {
    if (activeIndex !== undefined && activeIndex >= 0 && activeIndex < data.length) {
      return { text: `${data[activeIndex].name}\n$${data[activeIndex].value.toLocaleString()}`, color: data[activeIndex].color }
    }
    return { text: `Total:\n$${totalBudget.toLocaleString()}`, color: '#FFFFFF' }
  }

  const centerText = getCenterText()

  return (
    <div className="w-full h-[calc(100vh-15vh)] bg-drk-blue p-5 rounded-xl flex flex-col justify-center mx-auto relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="60%"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ fontSize: `${Math.min(16, 180 / centerText.text.length)}px` }}
      >
        {centerText.text.split('\n').map((line, index) => (
          <span key={index} className="text-center" style={{ color: centerText.color }}>
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}

export default BudgetChart

// border border-gray-300 rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.1)] make boarder