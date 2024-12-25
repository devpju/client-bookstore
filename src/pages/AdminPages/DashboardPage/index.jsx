import Loading from '@/components/Loading';
import { useGetDashboardQuery } from '@/redux/apis/dashboardApi';
import { useSelector } from 'react-redux';
import StatisticCards from './StatisticCards';
import StatisticCharts from './StatisticCharts';
import RecentOrders from './RecentOrders';
import RecentReviews from './RecentReviews';
import BestSellerBooks from './BestSellerBooks';

const DashboardPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetDashboardQuery();
  const dashboard = data?.results;
  console.log(dashboard);
  if (isLoading) return <Loading />;
  return (
    <div className='w-full p-5'>
      <p className='text-slate-900'>
        Xin chào, <span>{userInfo.fullName}</span>
      </p>
      <p className='mb-2 mt-4 text-sm text-slate-500'>
        Thống kê về cửa hàng của bạn tháng này
      </p>
      <StatisticCards dashboard={dashboard} />
      <StatisticCharts dashboard={dashboard} />
      <RecentOrders recentOrders={dashboard.recentOrders} />
      <div className='mt-5 grid grid-cols-2 gap-5'>
        <BestSellerBooks bestSellerBooks={dashboard.bestSeller} />
        <RecentReviews recentReviews={dashboard.recentReviews} />
      </div>
    </div>
  );
};
export default DashboardPage;
