// Mock data
import orders, { Order } from 'data/orders';
import users from 'data/users';

type getOrdersType = { orders: Order[]; ordersTotal: number };

function lookupOrder(order: Order) {
  order.customer = users.find(user => user.id === order.customerId);
  return order;
}

export const getOrders = (limit = 6): Promise<getOrdersType> => {
  return new Promise<getOrdersType>(resolve => {
    const ordersLookup = JSON.parse(JSON.stringify(orders))
      .slice(0, limit)
      .map(lookupOrder);

    setTimeout(() => {
      resolve({
        orders: ordersLookup,
        ordersTotal: orders.length
      });
    }, 700);
  });
};
