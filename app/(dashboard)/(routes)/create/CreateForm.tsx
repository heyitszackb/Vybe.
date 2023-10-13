
// Components
import React from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CreateForm = ({ form, isLoading, onSubmit }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full pb-4 pt-2 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
      >
        <FormField
          name="prompt"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-6">
              <FormControl className="m-0 p-0">
                <Input
                  className="text-md border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder="Songs to listen to by the ocean"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* ... Add other form fields (amount, resolution) here */}
        <Button className="text-lg col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
          Generate
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;