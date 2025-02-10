import { CsvUploader } from "./csvUploader";

export const InputSandbox: React.FC = () => {
  return (
    <div className="flex w-full justify-between">
      <CsvUploader title="Data1" />
      <CsvUploader title="Data2" />
    </div>
  );
};
