"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { cn } from "~/utils/styles";

type CsvRow = Record<AssetHeader, string>;

type AssetHeader =
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

const visibleHeaders: AssetHeader[] = ["cusip", "identifier", "rating", "par"];

export const CsvUploader: React.FC = () => {
  const [data, setData] = useState<CsvRow[]>([]);
  const [headers, setHeaders] = useState<AssetHeader[]>([]);

  const [selectedRow, setSelectedRow] = useState<CsvRow | null>(null);

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

  const handleSelectRow = (row: CsvRow) => {
    console.log(row);
    setSelectedRow(row);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border border-dashed p-3",
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

      {/* Table Section */}
      {data.length > 0 && (
        <div className="mt-6 max-w-[1000px]">
          <h3 className="mb-4 text-xl font-semibold">CSV Data</h3>
          <div className="max-h-[1200px] overflow-x-auto overflow-y-auto">
            <table className="min-w-full border border-gray-200 bg-zinc-900">
              <thead>
                <tr className="bg-blue-500">
                  {visibleHeaders.map((header) => (
                    <th
                      key={header}
                      className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...data.slice(0, 10)].map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "cursor-pointer",
                      selectedRow?.cusip === row.cusip
                        ? "bg-zinc-700"
                        : "hover:bg-zinc-800",
                    )}
                    onClick={() => handleSelectRow(row)}
                  >
                    {visibleHeaders.map((header) => (
                      <td
                        key={header}
                        className="border border-gray-200 px-4 py-2 text-sm text-gray-200"
                      >
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
