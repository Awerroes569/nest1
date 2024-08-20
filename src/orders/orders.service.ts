import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((p) => p.id === id);
  }

  public deleteById(id: Order['id']) {
    const order = db.orders.find((p) => p.id === id);
    if (!order) {
      return { success: false, message: 'Order not found' };
    } else {
      db.orders = db.orders.filter((p) => p.id !== id);
      return { success: true, message: 'Order deleted' };
    }
  }

  public create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(id: Order['id'], orderData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((p) => {
      if (p.id === id) {
        return { ...p, ...orderData };
      }
      return p;
    });
  }
}
