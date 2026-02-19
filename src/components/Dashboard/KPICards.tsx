import React from 'react';
import { KPIData } from '../../types';

interface KPICardsProps {
    data: KPIData;
}

const cards = [
    {
        key: 'totalSales' as const,
        label: 'Total Sales',
        icon: '💰',
        color: '#2563eb',
        format: (v: number) => `₹${v.toLocaleString()}`,
    },
    {
        key: 'totalProfit' as const,
        label: 'Total Profit',
        icon: '📈',
        color: '#059669',
        format: (v: number) => `₹${v.toLocaleString()}`,
    },
    {
        key: 'totalOrders' as const,
        label: 'Total Orders',
        icon: '📦',
        color: '#7c3aed',
        format: (v: number) => v.toLocaleString(),
    },
    {
        key: 'avgOrderValue' as const,
        label: 'Avg Order Value',
        icon: '🧾',
        color: '#ea580c',
        format: (v: number) => `₹${v.toLocaleString()}`,
    },
    {
        key: 'momGrowth' as const,
        label: 'MoM Growth',
        icon: '🚀',
        color: '#0891b2',
        format: (v: number) => `${v > 0 ? '+' : ''}${v}%`,
    },
];

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cards.map((card) => {
                const value = data[card.key];
                const isGrowth = card.key === 'momGrowth';
                const growthPositive = isGrowth && value > 0;
                const growthNegative = isGrowth && value < 0;

                return (
                    <div
                        key={card.key}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                        style={{ borderLeft: `4px solid ${card.color}` }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-500">{card.label}</span>
                            <span className="text-xl">{card.icon}</span>
                        </div>
                        <div
                            className={`text-2xl font-bold ${growthPositive
                                    ? 'text-green-600'
                                    : growthNegative
                                        ? 'text-red-500'
                                        : 'text-gray-900'
                                }`}
                        >
                            {card.format(value)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default KPICards;
