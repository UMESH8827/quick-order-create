
import React from "react";
import { useSalesOrders } from "@/lib/hooks";
import SalesOrderForm from "@/components/SalesOrderForm";
import { SalesOrderFormData } from "@/lib/types";
import Navbar from "@/components/Navbar";

const CreateOrder = () => {
  const { createOrder } = useSalesOrders();

  const handleSubmit = async (data: SalesOrderFormData & { total: number }) => {
    await createOrder(data);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 page-container animate-fade-in">
        <div className="mb-8">
          <div className="inline-block px-2 py-1 bg-accent rounded-md text-sm font-medium text-primary mb-2">
            New Order
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create Sales Order</h1>
          <p className="text-muted-foreground mt-1">
            Enter order details and add items
          </p>
        </div>

        <SalesOrderForm onSubmit={handleSubmit} />
      </main>
    </>
  );
};

export default CreateOrder;
