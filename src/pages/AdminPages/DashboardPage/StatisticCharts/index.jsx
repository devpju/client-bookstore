import OrderChart from './OrderChart';
import RevenueChart from './RevenueChart';

const StatisticCharts = ({ dashboard }) => {
  return (
    <div className='mt-5 grid grid-cols-2 gap-5'>
      <OrderChart orderStatistic={dashboard.orderStatistic} />
      <RevenueChart revenueStatistic={dashboard.revenueStatistic} />
    </div>
  );
};
export default StatisticCharts;
