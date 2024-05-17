import { getProdutCategory } from "@/action/category";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableData from "./table-data";

type TTabsProps = {
  value: string;
};

export default async function ProductTable({value}: TTabsProps) {

    
    if(value === "category"){
        const { productCategory } = await getProdutCategory();
        return (
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle className="capitalize">{value}</CardTitle>
                <CardDescription>List of item of your store</CardDescription>
              </CardHeader>
              <CardContent>
                {
                    productCategory.map((data, index)=>(

                        <TableData key={index} item={data}/>
                    ))
                }
              </CardContent>
            </Card>
          );
    }else{
        return (
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle className="capitalize">{value}</CardTitle>
                <CardDescription>List of item of your store</CardDescription>
              </CardHeader>
              <CardContent>
                    Other Data
              </CardContent>
            </Card>
          );
    }
  
}
