import { ORDER_STATUS_LIST } from '@/utils/constants';

const OrderStatusBlock = ({ status }) => {
  const statusItem = ORDER_STATUS_LIST.find((item) => item.value === status);

  return <div className={statusItem.style}>{statusItem.label}</div>;
};
export default OrderStatusBlock;
