"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { cn } from "~/utils/styles";

export type CsvRow = Record<AssetHeader, string>;

export type AssetHeader =
  | "cusip"
  | "identifier"
  | "maturity_in_months"
  | "coupon_fixedrate"
  | "bookprice"
  | "marketprice"
  | "par"
  | "currentpar"
  | "rating"
  | "frequency"
  | "asset_type"
  | "portfolio_group"
  | "is_floating"
  | "floating_margin"
  | "floating_floor"
  | "floating_cap"
  | "psa_factor"
  | "sda_factor"
  | "load_oas"
  | "thickness"
  | "IO"
  | "sinking_schedule"
  | "MV"
  | "sourcecusip"
  | "intex";

export const CsvUploader: React.FC<{ setData: (data: CsvRow[]) => void }> = ({
  setData,
}) => {
  const [headers, setHeaders] = useState<AssetHeader[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Convert CSV rows to JSON objects
        dynamicTyping: true, // Automatically convert numeric values
        complete: (results) => {
          if (results.data) {
            setData(results.data as CsvRow[]);
            setHeaders((results.meta.fields as AssetHeader[]) ?? []);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"], // Only accept CSV files
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "flex min-h-24 w-60 cursor-pointer items-center rounded-lg border border-dashed p-3 text-center",
          isDragActive ? "bg-zinc-800" : "",
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-100">Drop the CSV file here...</p>
        ) : (
          <p>Drag & drop a CSV file here, or click to select one</p>
        )}
      </div>
    </div>
  );
};
