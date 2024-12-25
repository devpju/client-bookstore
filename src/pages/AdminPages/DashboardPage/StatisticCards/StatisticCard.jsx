import { formatCurrencyVND, formatNumberVietnamese } from '@/utils/numberUtils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

const StatisticCard = ({
  title,
  value,
  valueChange,
  type = 'number',
  to,
  toName,
  icon: Icon,
  colors = []
}) => {
  return (
    <div className='rounded-lg border border-slate-200 p-2 shadow-md'>
      <div className='flex items-center justify-between'>
        <span className='font-medium text-slate-600'>
          {title.toUpperCase()}
        </span>
        {valueChange >= 0 ? (
          <span className='flex items-center gap-1 text-sm text-green-500'>
            <ArrowUpRight className='size-5' /> +{valueChange}%
          </span>
        ) : (
          <span className='flex items-center gap-1 text-sm text-red-500'>
            <ArrowDownRight className='size-5' /> {valueChange}%
          </span>
        )}
      </div>
      <div className='mt-3 text-2xl font-semibold text-slate-700'>
        {type === 'money'
          ? formatCurrencyVND(value)
          : formatNumberVietnamese(value)}
      </div>
      <div className='flex items-end justify-between'>
        <Link className='text-xs font-medium text-sky-700/90 underline' to={to}>
          {toName}
        </Link>
        <div
          className={`flex size-10 items-center justify-center rounded-md ${colors[1]}`}
        >
          <Icon className={`size-5 ${colors[0]}`} />
        </div>
      </div>
    </div>
  );
};
export default StatisticCard;
