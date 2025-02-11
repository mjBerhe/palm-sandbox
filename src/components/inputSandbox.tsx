"use client";

import { useAssetStore } from "~/stores/assetStore";
import { CsvUploader } from "./csvUploader";
import { AssetTable } from "./assetTable";
import { cn } from "~/utils/styles";

export const InputSandbox: React.FC = () => {
  const {
    datasetA,
    datasetB,
    setDatasetA,
    setDatasetB,
    selectedRowA,
    selectedRowB,
    swapRow,
  } = useAssetStore();

  // TODO: swap works, but a lot of bugs appear, like the same cusip's will be on one dataset
  const handleSwapRow = () => {
    // some validation here
    swapRow();
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col">
        <CsvUploader setData={setDatasetA} />
        {datasetA.length > 0 && (
          <AssetTable data={datasetA} title="DataA" datasetType="A" />
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSwapRow}
          className={cn(
            "inline-flex h-12 items-center justify-center rounded-md bg-neutral-700 px-6 font-medium text-neutral-50 transition active:scale-110",
            "disabled:scale-100 disabled:opacity-50",
          )}
          disabled={selectedRowA === null || selectedRowB === null}
        >
          Swap
        </button>
      </div>

      <div className="flex flex-col">
        <CsvUploader setData={setDatasetB} />
        {datasetB.length > 0 && (
          <AssetTable data={datasetB} title="DataB" datasetType="B" />
        )}
      </div>
    </div>
  );
};
