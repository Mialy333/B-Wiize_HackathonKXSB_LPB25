import React, { useState } from 'react';
import { PieChart as PieChartIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSwipeable } from 'react-swipeable';
import { CardProps } from './types';
import { useTheme } from '../../ThemeContext';

interface ExpensesByCategoriesProps extends CardProps {
  expenses?: { category: string; amount: number }[];
}

export const ExpensesByCategories: React.FC<ExpensesByCategoriesProps> = ({
  isLoading,
  error,
  onRetry,
  expenses,
}) => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<'inflows' | 'outflows'>('inflows');
  const [flowData, setFlowData] = React.useState<{
    inflows: { name: string; amount: number }[];
    outflows: { name: string; amount: number }[];
  }>({ inflows: [], outflows: [] });
  
  React.useEffect(() => {
    const storedData = localStorage.getItem('flowData');
    if (storedData) {
      const { inflows, outflows } = JSON.parse(storedData);
      setFlowData({ inflows, outflows });
    }
  }, []);

  const COLORS = {
    inflows: ['#4ECDC4', '#45B7D1', '#96CEB4', '#83DEC4'],
    outflows: ['#FF6B6B', '#FF8787', '#FFA5A5', '#FFC3C3']
  };

  const totalInflows = flowData.inflows.reduce((sum, flow) => sum + flow.amount, 0);
  const totalOutflows = flowData.outflows.reduce((sum, flow) => sum + flow.amount, 0);

  const inflowData = flowData.inflows.map(flow => ({
    name: flow.name,
    value: (flow.amount / totalInflows) * 100
  }));

  const outflowData = flowData.outflows.map(flow => ({
    name: flow.name,
    value: (flow.amount / totalOutflows) * 100
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-2 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-900'
        }`}>
          <p className="text-xs font-medium">{payload[0].name}</p>
          <p className="text-xs">{`${Math.round(payload[0].value)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveSection('outflows'),
    onSwipedRight: () => setActiveSection('inflows'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900/50' : 'bg-white/50'
    } backdrop-blur-sm shadow-lg`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <PieChartIcon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
              Monthly Flow
            </h3>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveSection('inflows')}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === 'inflows'
                  ? isDark ? 'bg-teal-500 w-4' : 'bg-teal-600 w-4'
                  : isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
            <button
              onClick={() => setActiveSection('outflows')}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === 'outflows'
                  ? isDark ? 'bg-teal-500 w-4' : 'bg-teal-600 w-4'
                  : isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className={`h-48 ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'} rounded-lg`} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-3">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-purple-600 hover:text-purple-800"
              >
                Try Again
              </button>
            )}
          </div>
        ) : (
          <div {...handlers} className="relative overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out"
                 style={{ transform: `translateX(${activeSection === 'inflows' ? '0%' : '-100%'})` }}>
              <div className="min-w-full">
                <h4 className={`text-base font-semibold text-center mb-4 ${
                  isDark ? 'text-teal-400' : 'text-teal-600'
                }`}>
                  Inflows Distribution
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inflowData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {inflowData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS.inflows[index % COLORS.inflows.length]}
                            stroke={isDark ? '#1F2937' : '#FFFFFF'}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value) => (
                          <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="min-w-full">
                <h4 className={`text-base font-semibold text-center mb-4 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  Outflows Distribution
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={outflowData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {outflowData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS.outflows[index % COLORS.outflows.length]}
                            stroke={isDark ? '#1F2937' : '#FFFFFF'}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value) => (
                          <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={() => setActiveSection('inflows')}
                className={`p-1 rounded-full transition-colors ${
                  activeSection === 'outflows'
                    ? isDark
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      : 'bg-gray-200/50 text-gray-600 hover:bg-gray-300/50'
                    : 'opacity-0'
                } backdrop-blur-sm`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={() => setActiveSection('outflows')}
                className={`p-1 rounded-full transition-colors ${
                  activeSection === 'inflows'
                    ? isDark
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      : 'bg-gray-200/50 text-gray-600 hover:bg-gray-300/50'
                    : 'opacity-0'
                } backdrop-blur-sm`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};