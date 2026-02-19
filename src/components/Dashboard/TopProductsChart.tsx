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

interface TopProductsChartProps {
    data: { product: string; sales: number; orders: number }[];
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Top 10 Products by Sales</h3>
            <ResponsiveContainer width="100%" height={380}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 120, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        type="number"
                        tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        type="category"
                        dataKey="product"
                        tick={{ fontSize: 11 }}
                        width={110}
                    />
                    <Tooltip
                        formatter={(value: number, name: string) => [
                            name === 'sales' ? `₹${value.toLocaleString()}` : value,
                            name === 'sales' ? 'Sales' : 'Orders',
                        ]}
                    />
                    <Bar dataKey="sales" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={20} name="Sales" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopProductsChart;
