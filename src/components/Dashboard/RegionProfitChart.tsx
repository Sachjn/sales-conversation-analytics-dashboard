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

interface RegionProfitChartProps {
    data: { region: string; profit: number }[];
}

const RegionProfitChart: React.FC<RegionProfitChartProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Profit by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                    <YAxis
                        tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Profit']} />
                    <Bar dataKey="profit" fill="#059669" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RegionProfitChart;
