import Loading from '@/components/Loading';
import { useGetDashboardQuery } from '@/redux/apis/dashboardApi';
import { useSelector } from 'react-redux';
import StatisticCards from './StatisticCards';

const DashboardPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetDashboardQuery();
  const dashboard = data?.results;
  console.log(dashboard);
  if (isLoading) return <Loading />;
  return (
    <div className='w-full px-5'>
      <p className='text-slate-900'>
        Xin chào, <span>{userInfo.fullName}</span>
      </p>
      <p className='mb-2 mt-4 text-sm text-slate-500'>
        Thống kê về cửa hàng của bạn ngày hôm nay
      </p>
      <StatisticCards dashboard={dashboard} />
    </div>
  );
};
export default DashboardPage;
