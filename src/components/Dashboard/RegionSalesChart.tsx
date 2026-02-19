import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface RegionSalesChartProps {
    data: { region: string; sales: number }[];
}

const COLORS = ['#2563eb', '#7c3aed', '#059669', '#ea580c'];

const RegionSalesChart: React.FC<RegionSalesChartProps> = ({ data }) => {
    const chartData = data.map((d, i) => ({ ...d, fill: COLORS[i % COLORS.length] }));

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Sales by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                    <YAxis
                        tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Sales']} />
                    <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, index) => (
                            <rect key={index} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RegionSalesChart;
