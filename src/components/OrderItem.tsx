
import React, { useState } from "react";
import { SalesOrder } from "@/lib/types";
import { ChevronDown, ChevronUp, Calendar, User, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface OrderItemProps {
  order: SalesOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
      case "pending":
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400";
    }
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 animate-slide-up"
      style={{ animationDelay: "calc(0.05s * var(--index, 0))" }}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-medium">{order.orderNumber}</h3>
              <Badge
                className={cn(
                  "ml-2 capitalize",
                  getStatusColor(order.status)
                )}
              >
                {order.status}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-muted-foreground/70" />
                <span>{order.customerName}</span>
              </div>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground/30"></div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                <span>{formatDate(order.orderDate)}</span>
              </div>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground/30"></div>
              <div className="flex items-center gap-1">
                <Package className="h-3.5 w-3.5 text-muted-foreground/70" />
                <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-base font-semibold">
              ${order.total.toFixed(2)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="ml-2 p-2"
            >
              {expanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t transition-all animate-slide-down">
            <h4 className="text-sm font-medium mb-2">Order Items</h4>
            <div className="rounded-md border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-muted/40">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <tr key={item.id || index}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {item.product}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground text-right">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/20">
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="px-4 py-2 text-sm font-medium text-right"
                    >
                      Total
                    </th>
                    <td className="px-4 py-2 text-sm font-semibold text-right">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrderItem;
