
import React from "react";
import { useSalesOrders } from "@/lib/hooks";
import SalesOrderList from "@/components/SalesOrderList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { orders, loading, fetchOrders } = useSalesOrders();

  return (
    <>
      <Navbar />
      <main className="pt-24 page-container animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="inline-block px-2 py-1 bg-accent rounded-md text-sm font-medium text-primary mb-2">
              Sales Orders
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your sales orders
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchOrders()}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button asChild size="sm" className="flex items-center gap-1">
              <Link to="/create">
                <PlusCircle className="h-4 w-4" />
                <span>New Order</span>
              </Link>
            </Button>
          </div>
        </div>

        <SalesOrderList orders={orders} loading={loading} />
      </main>
    </>
  );
};

export default Index;
