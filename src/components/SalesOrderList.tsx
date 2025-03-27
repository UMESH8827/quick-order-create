
import React from "react";
import { Link } from "react-router-dom";
import { SalesOrder } from "@/lib/types";
import { PlusCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderItem from "./OrderItem";

interface SalesOrderListProps {
  orders: SalesOrder[];
  loading?: boolean;
}

const SalesOrderList: React.FC<SalesOrderListProps> = ({
  orders,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
            <Separator className="my-4" />
            <div className="h-10 bg-muted rounded w-full"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="p-8 text-center space-y-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-accent">
            <PlusCircle className="h-12 w-12 text-primary/50" />
          </div>
          <h3 className="text-xl font-medium">No orders yet</h3>
          <p className="text-muted-foreground max-w-md">
            Create your first sales order to get started. You'll be able to track and manage all your orders here.
          </p>
          <Button asChild className="mt-4">
            <Link to="/create">Create Sales Order</Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Orders</h3>
        <Button asChild size="sm">
          <Link to="/create" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>New Order</span>
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default SalesOrderList;
