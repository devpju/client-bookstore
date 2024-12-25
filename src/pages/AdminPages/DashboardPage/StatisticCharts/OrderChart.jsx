import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/shadcnUI/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/shadcnUI/chart';

const chartConfig = {
  cancelled: {
    label: 'Đã huỷ',
    color: 'hsl(var(--chart-3))'
  },
  completed: {
    label: 'Hoàn thành',
    color: 'hsl(var(--chart-2))'
  },
  returned: {
    label: 'Đã hoàn trả',
    color: 'hsl(var(--chart-1))'
  }
};

const OrderChart = ({ orderStatistic }) => {
  return (
    <Card className='max-w-full'>
      <CardHeader>
        <CardTitle>Biểu đồ thống kê đơn hàng 6 tháng gần nhất</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={orderStatistic}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis axisLine={true} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />
            <Bar dataKey='cancelled' fill='var(--color-cancelled)' radius={4} />
            <Bar dataKey='returned' fill='var(--color-returned)' radius={4} />
            <Bar dataKey='completed' fill='var(--color-completed)' radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default OrderChart;
