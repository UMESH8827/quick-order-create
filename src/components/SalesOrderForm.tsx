
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Plus, Trash2, Save } from "lucide-react";
import { SalesOrderFormData, SalesOrderItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useOrderTotal } from "@/lib/hooks";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface SalesOrderFormProps {
  onSubmit: (data: SalesOrderFormData & { total: number }) => Promise<void>;
  isSubmitting?: boolean;
}

const SalesOrderForm: React.FC<SalesOrderFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SalesOrderFormData>({
    defaultValues: {
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      customerName: "",
      orderDate: new Date().toISOString().split("T")[0],
      status: "pending",
      items: [
        {
          tempId: uuidv4(),
          product: "",
          quantity: 1,
          price: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items") as SalesOrderItem[];
  const total = useOrderTotal(watchedItems);

  const handleAddItem = () => {
    append({
      tempId: uuidv4(),
      product: "",
      quantity: 1,
      price: 0,
    });
  };

  const handleFormSubmit = async (data: SalesOrderFormData) => {
    try {
      setSubmitting(true);
      // Add total to the form data
      await onSubmit({ ...data, total });
      setSubmitting(false);
      navigate("/");
    } catch (error) {
      setSubmitting(false);
      toast.error("Error creating sales order");
      console.error("Error creating sales order:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="animate-slide-up"
    >
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              {...register("orderNumber", { required: "Order number is required" })}
              className="input-field"
            />
            {errors.orderNumber && (
              <p className="text-destructive text-sm mt-1">
                {errors.orderNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderDate">Order Date</Label>
            <Input
              id="orderDate"
              type="date"
              {...register("orderDate", { required: "Order date is required" })}
              className="input-field"
            />
            {errors.orderDate && (
              <p className="text-destructive text-sm mt-1">
                {errors.orderDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            {...register("customerName", { required: "Customer name is required" })}
            className="input-field"
          />
          {errors.customerName && (
            <p className="text-destructive text-sm mt-1">
              {errors.customerName.message}
            </p>
          )}
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Order Items</h3>
            <Button
              type="button"
              onClick={handleAddItem}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card
                key={field.tempId}
                className="p-4 animate-fade-in"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 space-y-2">
                    <Label htmlFor={`items.${index}.product`}>Product</Label>
                    <Input
                      id={`items.${index}.product`}
                      {...register(`items.${index}.product` as const, {
                        required: "Product name is required",
                      })}
                      className="input-field"
                    />
                    {errors.items?.[index]?.product && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.items[index]?.product?.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`items.${index}.quantity`}>Quantity</Label>
                    <Controller
                      name={`items.${index}.quantity` as const}
                      control={control}
                      rules={{ required: "Required", min: 1 }}
                      render={({ field }) => (
                        <Input
                          id={`items.${index}.quantity`}
                          type="number"
                          min="1"
                          step="1"
                          className="input-field"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      )}
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.items[index]?.quantity?.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`items.${index}.price`}>Price</Label>
                    <Controller
                      name={`items.${index}.price` as const}
                      control={control}
                      rules={{ required: "Required", min: 0 }}
                      render={({ field }) => (
                        <Input
                          id={`items.${index}.price`}
                          type="number"
                          min="0"
                          step="0.01"
                          className="input-field"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      )}
                    />
                    {errors.items?.[index]?.price && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.items[index]?.price?.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t">
        <div className="text-lg font-medium">
          Total: <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || submitting}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {(isSubmitting || submitting) ? "Saving..." : "Save Order"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SalesOrderForm;
