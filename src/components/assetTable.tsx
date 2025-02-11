"use client";

import { useState } from "react";
import type { CsvRow, AssetHeader } from "./csvUploader";
import { cn } from "~/utils/styles";
import { useAssetStore } from "~/stores/assetStore";

const visibleHeaders: AssetHeader[] = ["cusip", "identifier", "rating", "par"];

export const AssetTable: React.FC<{
  data: CsvRow[];
  title: string;
  datasetType: "A" | "B";
}> = ({ data, title, datasetType }) => {
  const { selectedRowA, selectedRowB, setSelectedRowA, setSelectedRowB } =
    useAssetStore();

  const handleSelectRow = (row: CsvRow) => {
    if (datasetType === "A") {
      setSelectedRowA(row);
    } else {
      setSelectedRowB(row);
    }
  };

  return (
    <div className="mt-6 max-w-[1000px]">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      <div className="max-h-[1200px] overflow-x-auto overflow-y-auto">
        <table className="min-w-full border border-zinc-700 bg-zinc-900">
          <thead>
            <tr className="bg-slate-900">
              {visibleHeaders.map((header) => (
                <th
                  key={header}
                  className="border border-zinc-700 px-4 py-2 text-left text-sm font-medium text-gray-200"
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
                  datasetType === "A"
                    ? selectedRowA?.cusip === row.cusip
                      ? "bg-slate-700"
                      : "hover:bg-slate-700/50"
                    : selectedRowB?.cusip === row.cusip
                      ? "bg-slate-700"
                      : "hover:bg-slate-700/50",
                )}
                onClick={() => handleSelectRow(row)}
              >
                {visibleHeaders.map((header) => (
                  <td
                    key={header}
                    className="border border-zinc-700 px-4 py-2 text-sm text-gray-200"
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
  );
};
