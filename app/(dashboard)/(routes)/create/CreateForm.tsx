
// Components
import React from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

// Hooks
import { useCreatePage } from "./CreatePageContext";

const CreateForm = ({ form, onSubmit }) => {
  const {
    currentQuery,
    isLoading,
    selectedSongs,
    setCurrentQuery,
  } = useCreatePage();

  let buttonText = currentQuery ? "Modify your Vybe" : "Generate New Vybe";
  buttonText = isLoading ? "Generating..." : buttonText;
  if (selectedSongs.length > 0) {
    buttonText = `More Like Selected (${selectedSongs.length})`;
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full pb-3 pt-3 px-3 focus-within:shadow-sm grid grid-cols-12 gap-2"
      >
        <FormField
          name="prompt"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-8">
              <FormControl className="m-0 p-0">
                <Input
                  className="text-md border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder={currentQuery ? "please make the songs more exciting" :"Songs to listen to by the ocean"}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* ... Add other form fields (amount, resolution) here */}
          <Button className="text-lg col-span-12 lg:col-span-4 w-full" variant="premium" disabled={isLoading}>
              {buttonText}
              {!isLoading ? <Zap className="w-4 h-4 ml-2 fill-white"/> : null}
          </Button>
      </form>
    </Form>
  );
};

export default CreateForm;