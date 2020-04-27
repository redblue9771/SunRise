// Mock data
import users, { User } from 'data/users';
import orders, { Order } from 'data/orders';

type getUsersType = {
  users: User[];
  usersTotal: number;
};

function lookupUser(user: User) {
  const userCopy: User = JSON.parse(JSON.stringify(user));
  const userOrders: Order[] = userCopy.orderIds.map(
    id => orders.find(order => order.id === id) || ({} as Order)
  );
  userCopy.orders = userOrders;
  const userMoneySpent = userCopy.orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  userCopy.moneySpent = userMoneySpent;

  return userCopy;
}

export const getUsers = (limit = 10): Promise<getUsersType> => {
  return new Promise<getUsersType>(resolve => {
    setTimeout(() => {
      const usersLookup = users.slice(0, limit).map(lookupUser);

      resolve({
        users: usersLookup,
        usersTotal: users.length
      });
    }, 700);
  });
};

export const getUser = (id: string): Promise<{ user: User }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);

      if (user) {
        resolve({
          user: lookupUser(user)
        });
      } else {
        reject({
          error: 'User not found'
        });
      }
    }, 500);
  });
};
