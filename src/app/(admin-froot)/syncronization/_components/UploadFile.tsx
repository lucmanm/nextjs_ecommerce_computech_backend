"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
// xlsx library
import * as XLSX from "xlsx";
import { createBulkProduct, TCreateBulkProductProps } from "@/action/project";
import { toast } from "@/components/ui/use-toast";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  // const [jsonData, setJsonData] = useState("");

  async function onSave() {
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
          const json : TCreateBulkProductProps[] =
            XLSX.utils.sheet_to_json(workSheet);
          try {
            //Save to the DB
            const jsonData = JSON.parse(JSON.stringify(json))
            await createBulkProduct(jsonData);
            toast({
              variant: "default",
              description: "Succefully Syncronized"
            })

          } catch (error) {
            console.log("ERROR_UPLOAD_FILE_EXCEL",error);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  return (
    <section className="w-1/4 space-y-6">
      <Input
        type="file"
        accept=".xls, .xlsx"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />

      <span>Accepts Excel File Format .xls & .xlsx</span>

      <Button className="w-full" onClick={onSave}>
        Upload
      </Button>
    </section>
  );
}
