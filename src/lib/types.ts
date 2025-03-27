
export interface SalesOrderItem {
  id?: string;
  product: string;
  quantity: number;
  price: number;
  tempId?: string; // Used for local state management
}

export interface SalesOrder {
  id?: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  status: "pending" | "completed" | "cancelled";
  items: SalesOrderItem[];
  total: number;
  createdAt?: string;
}

export type SalesOrderFormData = Omit<SalesOrder, "id" | "total" | "createdAt">;
