import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, ListFilter } from "lucide-react";
import React from "react";
import ProductTable from "./_components/table";
import { getProdutCategory } from "@/action/category";

export const tabs = [
  {
    value: "products",
  },
  {
    value: "brands",
  },
  {
    value: "category",
  },
];

const Products = async () => {
  
  
  return (
    <section className="p-4">
      <Tabs defaultValue="products">
        <div className="flex items-center">
          {tabs.map((data, index) => (
            <TabsList key={index}>
              <TabsTrigger value={data.value} className="capitalize">
                {data.value}
              </TabsTrigger>
            </TabsList>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        {tabs.map((data, index) => (
          <TabsContent value={data.value} key={index}>
            <ProductTable value={data.value} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Products;
