
import { useState, useEffect } from "react";
import { SalesOrder, SalesOrderItem } from "./types";
import { toast } from "sonner";

// Hook for managing sales orders
export function useSalesOrders() {
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll use localStorage
      const storedOrders = localStorage.getItem("salesOrders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders([]);
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders");
      toast.error("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (order: Omit<SalesOrder, "id" | "createdAt">) => {
    try {
      // In a real app, this would be an API call
      const newOrder: SalesOrder = {
        ...order,
        id: `order-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      
      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);
      localStorage.setItem("salesOrders", JSON.stringify(updatedOrders));
      
      toast.success("Order created successfully");
      return newOrder;
    } catch (err) {
      toast.error("Failed to create order");
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
  };
}

// Hook for calculating order total
export function useOrderTotal(items: SalesOrderItem[]) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [items]);

  return total;
}
