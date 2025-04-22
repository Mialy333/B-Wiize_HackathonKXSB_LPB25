import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Minus,
  ArrowRight,
  Euro,
  Upload,
  AlertCircle,
  FileText,
  X,
} from "lucide-react";
import { useTheme } from "../../ThemeContext";
import Papa from "papaparse";

interface Flow {
  name: string;
  amount: number;
}

interface SetupFlowProps {
  onComplete: () => void;
}

// Demo data
const demoInflows: Flow[] = [
  { name: "Aid", amount: 500 },
  { name: "Teaching", amount: 300 },
  { name: "Babysitting", amount: 120 },
];

const demoOutflows: Flow[] = [
  { name: "Rent", amount: 800 },
  { name: "Utilities", amount: 150 },
  { name: "Food", amount: 300 },
];

export const SetupFlow: React.FC<SetupFlowProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [inflows, setInflows] = useState<Flow[]>(demoInflows);
  const [outflows, setOutflows] = useState<Flow[]>(demoOutflows);
  const [activeSection, setActiveSection] = useState<
    "inflows" | "outflows" | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddInflow = () => {
    setInflows([...inflows, { name: "", amount: 0 }]);
  };

  const handleAddOutflow = () => {
    setOutflows([...outflows, { name: "", amount: 0 }]);
  };

  const handleRemoveInflow = (index: number) => {
    setInflows(inflows.filter((_, i) => i !== index));
  };

  const handleRemoveOutflow = (index: number) => {
    setOutflows(outflows.filter((_, i) => i !== index));
  };

  const handleInflowChange = (
    index: number,
    field: keyof Flow,
    value: string
  ) => {
    const newInflows = [...inflows];
    if (field === "amount") {
      newInflows[index][field] = parseFloat(value) || 0;
    } else {
      newInflows[index][field] = value;
    }
    setInflows(newInflows);
  };

  const handleOutflowChange = (
    index: number,
    field: keyof Flow,
    value: string
  ) => {
    const newOutflows = [...outflows];
    if (field === "amount") {
      newOutflows[index][field] = parseFloat(value) || 0;
    } else {
      newOutflows[index][field] = value;
    }
    setOutflows(newOutflows);
  };

  const handleSubmit = () => {
    // Calculate totals
    const totalInflows = inflows.reduce((sum, flow) => sum + flow.amount, 0);
    const totalOutflows = outflows.reduce((sum, flow) => sum + flow.amount, 0);

    // Store in localStorage or context
    localStorage.setItem(
      "flowData",
      JSON.stringify({
        inflows,
        outflows,
        currentBalance: totalInflows - totalOutflows,
      })
    );

    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Small delay to ensure smooth scroll completes
    setTimeout(() => {
      onComplete();
      navigate("/overview");
    }, 300);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file from your bank");
      return;
    }

    Papa.parse(file, {
      complete: (results) => {
        try {
          const data = results.data as string[][];
          if (data.length < 2) {
            throw new Error("File appears to be empty");
          }

          // Process transactions
          const newInflows: Flow[] = [];
          const newOutflows: Flow[] = [];

          // Skip header row and process transactions
          for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (row.length < 2) continue; // Skip invalid rows

            const amount = parseFloat(row[1].replace(/[^0-9.-]/g, ""));
            if (isNaN(amount)) continue;

            const flow = {
              name: row[0] || "Unknown Transaction",
              amount: Math.abs(amount),
            };

            if (amount > 0) {
              newInflows.push(flow);
            } else {
              newOutflows.push(flow);
            }
          }

          // Update state with new flows
          if (newInflows.length || newOutflows.length) {
            setInflows(newInflows);
            setOutflows(newOutflows);
          } else {
            throw new Error("No valid transactions found");
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError(
            "Failed to process bank statement. Please check the file format."
          );
        }
      },
      error: () => {
        setError("Failed to read the file. Please try again.");
      },
    });
  };

  // Calculate totals
  const totalInflows = inflows.reduce((sum, flow) => sum + flow.amount, 0);
  const totalOutflows = outflows.reduce((sum, flow) => sum + flow.amount, 0);
  const balance = totalInflows - totalOutflows;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div
        className={`p-4 rounded-2xl ${
          isDark ? "bg-gray-800/90" : "bg-white/90"
        } backdrop-blur-sm shadow-lg`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-xl font-bold text-teal-500 mb-4 md:mb-0">
            Set Your Flow
          </h1>

          {/* Balance Preview */}
          <div
            className={`p-3 rounded-xl ${
              isDark ? "bg-gray-700/50" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Current Balance:
              </span>
              <span
                className={`text-lg font-bold ${
                  balance >= 0
                    ? isDark
                      ? "text-green-400"
                      : "text-green-600"
                    : isDark
                    ? "text-red-400"
                    : "text-red-600"
                }`}
              >
                €{Math.round(balance)}
              </span>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div
          className={`mb-8 p-6 rounded-xl border-2 border-dashed transition-colors ${
            isDragging
              ? isDark
                ? "border-teal-500 bg-teal-500/10"
                : "border-teal-500 bg-teal-50"
              : isDark
              ? "border-gray-700 hover:border-teal-500/50"
              : "border-gray-300 hover:border-teal-500/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center text-center">
            <Upload
              className={`w-12 h-12 mb-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <h3
              className={`text-lg font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Import Bank Statement
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Drag and drop your bank statement CSV file here, or click to
              select
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Select Bank Statement
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              isDark ? "bg-red-900/20 text-red-400" : "bg-red-50 text-red-600"
            }`}
          >
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm flex-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-2 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile View - Tabs */}
        <div className="md:hidden mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() =>
                setActiveSection(activeSection === "inflows" ? null : "inflows")
              }
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === "inflows"
                  ? isDark
                    ? "bg-teal-600 text-white"
                    : "bg-teal-100 text-teal-900"
                  : isDark
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Inflows (€{totalInflows})
            </button>
            <button
              onClick={() =>
                setActiveSection(
                  activeSection === "outflows" ? null : "outflows"
                )
              }
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === "outflows"
                  ? isDark
                    ? "bg-teal-600 text-white"
                    : "bg-teal-100 text-teal-900"
                  : isDark
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Outflows (€{totalOutflows})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inflows */}
          <div
            className={`space-y-3 ${
              activeSection === "outflows" ? "hidden md:block" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Monthly Inflows
              </h2>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-teal-400" : "text-teal-600"
                }`}
              >
                €{Math.round(totalInflows)}
              </span>
            </div>
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto space-y-2 pr-2">
              {inflows.map((inflow, index) => (
                <div key={index} className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={inflow.name}
                    onChange={(e) =>
                      handleInflowChange(index, "name", e.target.value)
                    }
                    placeholder="Source"
                    className={`flex-1 px-2 py-1.5 rounded-lg text-sm ${
                      isDark
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    } border focus:ring-2 focus:ring-teal-500`}
                  />
                  <div className="relative">
                    <Euro
                      className={`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="number"
                      value={inflow.amount || ""}
                      onChange={(e) =>
                        handleInflowChange(index, "amount", e.target.value)
                      }
                      placeholder="0"
                      className={`w-24 pl-8 pr-2 py-1.5 rounded-lg text-sm ${
                        isDark
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-gray-900 border-gray-300"
                      } border focus:ring-2 focus:ring-teal-500`}
                    />
                  </div>
                  {inflows.length > 1 && (
                    <button
                      onClick={() => handleRemoveInflow(index)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDark
                          ? "bg-red-900/20 text-red-400 hover:bg-red-900/30"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleAddInflow}
              className={`flex items-center space-x-1.5 text-sm ${
                isDark
                  ? "text-teal-400 hover:text-teal-300"
                  : "text-teal-600 hover:text-teal-700"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Inflow</span>
            </button>
          </div>

          {/* Outflows */}
          <div
            className={`space-y-3 ${
              activeSection === "inflows" ? "hidden md:block" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Monthly Outflows
              </h2>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-red-400" : "text-red-600"
                }`}
              >
                €{Math.round(totalOutflows)}
              </span>
            </div>
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto space-y-2 pr-2">
              {outflows.map((outflow, index) => (
                <div key={index} className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={outflow.name}
                    onChange={(e) =>
                      handleOutflowChange(index, "name", e.target.value)
                    }
                    placeholder="Expense"
                    className={`flex-1 px-2 py-1.5 rounded-lg text-sm ${
                      isDark
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    } border focus:ring-2 focus:ring-teal-500`}
                  />
                  <div className="relative">
                    <Euro
                      className={`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="number"
                      value={outflow.amount || ""}
                      onChange={(e) =>
                        handleOutflowChange(index, "amount", e.target.value)
                      }
                      placeholder="0"
                      className={`w-24 pl-8 pr-2 py-1.5 rounded-lg text-sm ${
                        isDark
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-gray-900 border-gray-300"
                      } border focus:ring-2 focus:ring-teal-500`}
                    />
                  </div>
                  {outflows.length > 1 && (
                    <button
                      onClick={() => handleRemoveOutflow(index)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDark
                          ? "bg-red-900/20 text-red-400 hover:bg-red-900/30"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleAddOutflow}
              className={`flex items-center space-x-1.5 text-sm ${
                isDark
                  ? "text-teal-400 hover:text-teal-300"
                  : "text-teal-600 hover:text-teal-700"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Outflow</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl text-base font-bold bg-teal-500 text-white hover:bg-teal-600 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            <span>See Your Balance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
