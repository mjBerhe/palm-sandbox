import { create } from "zustand";
import type { CsvRow } from "~/components/csvUploader";

type AssetState = {
  datasetA: CsvRow[];
  datasetB: CsvRow[];
  selectedRowA: CsvRow | null;
  selectedRowB: CsvRow | null;
  setDatasetA: (data: CsvRow[]) => void;
  setDatasetB: (data: CsvRow[]) => void;
  setSelectedRowA: (row: CsvRow) => void;
  setSelectedRowB: (row: CsvRow) => void;
  swapRow: () => void;
};

export const useAssetStore = create<AssetState>((set) => ({
  datasetA: [],
  datasetB: [],
  selectedRowA: null,
  selectedRowB: null,
  setDatasetA: (data) => set({ datasetA: data }),
  setDatasetB: (data) => set({ datasetB: data }),
  setSelectedRowA: (row) => set({ selectedRowA: row }),
  setSelectedRowB: (row) => set({ selectedRowB: row }),
  swapRow: () =>
    set((state) => {
      const rowA = state.selectedRowA;
      const rowB = state.selectedRowB;

      if (!rowA || !rowB) return {};

      const newDatasetA = state.datasetA.map((x) =>
        x.cusip === rowA.cusip ? rowB : x,
      );
      const newDatasetB = state.datasetB.map((x) =>
        x.cusip === rowB.cusip ? rowA : x,
      );

      return {
        datasetA: newDatasetA,
        datasetB: newDatasetB,
      };
    }),
}));
