import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

interface SalesTrendChartProps {
    data: { month: string; sales: number; profit: number }[];
}

const formatMonth = (val: string) => {
    const [, m] = val.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(m, 10) - 1] || val;
};

const formatCurrency = (val: number) => `₹${(val / 1000).toFixed(0)}K`;

const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Monthly Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value: number, name: string) => [
                            `₹${value.toLocaleString()}`,
                            name === 'sales' ? 'Sales' : 'Profit',
                        ]}
                        labelFormatter={formatMonth}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#2563eb"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#2563eb' }}
                        name="Sales"
                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#059669"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#059669' }}
                        name="Profit"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesTrendChart;
