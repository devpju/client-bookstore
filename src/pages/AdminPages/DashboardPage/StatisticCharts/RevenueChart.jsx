'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shadcnUI/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/shadcnUI/chart';
import { formatNumberWithK } from '@/utils/numberUtils';

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'hsl(var(--chart-1))'
  }
};

const RevenueChart = ({ revenueStatistic }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ thống kê doanh thu 6 tháng gần nhất</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={revenueStatistic}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickFormatter={formatNumberWithK} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey='revenue'
              type='linear'
              stroke='var(--color-revenue)'
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default RevenueChart;
