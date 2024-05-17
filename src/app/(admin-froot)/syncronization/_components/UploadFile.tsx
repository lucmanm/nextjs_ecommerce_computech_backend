"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
// xlsx library
import * as XLSX from "xlsx";
import { createBulkProduct, TCreateBulkProductProps } from "@/action/project";
import { toast } from "@/components/ui/use-toast";
import CustomButtom from "@/app/(admin-froot)/syncronization/_components/UploadButton";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);

  // const [jsonData, setJsonData] = useState("");

   function onSave() {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json: TCreateBulkProductProps[] =
            XLSX.utils.sheet_to_json(workSheet);
          try {
            //Save to the DB
            const jsonData =  JSON.parse(JSON.stringify(json));
            await createBulkProduct(jsonData);
            toast({
              variant: "success",
              title: "Succefully Syncronized",
            });
          } catch (error) {
            console.log("ERROR_UPLOAD_FILE_EXCEL", error);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  return (
    <section className="w-1/4 space-y-6 ">
      <form action={async () =>{
         onSave()
      }} className="flex flex-col gap-y-4">
        <Input
          type="file"
          accept=".xls, .xlsx"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />

        <span>Accepts Excel File Format .xls & .xlsx</span>
        <CustomButtom/>
      </form>
    </section>
  );
}
