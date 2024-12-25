import { BookCheck, Box, CircleDollarSign, CircleUserIcon } from 'lucide-react';
import StatisticCard from './StatisticCard';

const StatisticCards = ({ dashboard }) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <StatisticCard
        title='Tài khoản'
        value={dashboard.totalCustomers}
        valueChange={dashboard.totalCustomersChange}
        to='/admin/users'
        toName='Người dùng'
        icon={CircleUserIcon}
        colors={['text-green-400', 'bg-green-300/30']}
      />
      <StatisticCard
        title='Đơn hàng'
        value={dashboard.totalOrders}
        valueChange={dashboard.totalOrdersChange}
        to='/admin/orders'
        toName='Đơn hàng'
        icon={Box}
        colors={['text-sky-400', 'bg-sky-300/30']}
      />
      <StatisticCard
        title='Doanh thu'
        value={dashboard.totalRevenue}
        valueChange={dashboard.totalRevenueChange}
        type='money'
        to='/admin/orders'
        toName='Đơn hàng'
        icon={CircleDollarSign}
        colors={['text-purple-400', 'bg-purple-300/30']}
      />
      <StatisticCard
        title='Sách đã bán'
        value={dashboard.totalSelledBooks}
        valueChange={dashboard.totalSelledBooksChange}
        to='/admin/books'
        toName='Sách'
        icon={BookCheck}
        colors={['text-yellow-400', 'bg-yellow-300/30']}
      />
    </div>
  );
};
export default StatisticCards;
