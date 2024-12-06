import { orderStatusList } from '@/lib/constants';

const OrderStatusBlock = ({ status }) => {
  const statusItem = orderStatusList.find((item) => item.value === status);

  return <div className={statusItem.style}>{statusItem.label}</div>;
};
export default OrderStatusBlock;
