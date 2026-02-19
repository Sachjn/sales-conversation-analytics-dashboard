import React from 'react';
import { SalesRecord } from '../../types';

interface DownloadButtonProps {
    data: SalesRecord[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
    const handleDownload = () => {
        if (data.length === 0) return;

        const headers = [
            'Order ID', 'Order Date', 'Region', 'Category', 'Sub-Category',
            'Product Name', 'Sales', 'Profit', 'Quantity', 'Discount',
        ];

        const csvRows = [
            headers.join(','),
            ...data.map((r) =>
                [
                    r.orderId,
                    r.orderDate,
                    r.region,
                    r.category,
                    r.subCategory,
                    `"${r.productName}"`,
                    r.sales,
                    r.profit,
                    r.quantity,
                    r.discount,
                ].join(',')
            ),
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filtered_sales_data.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            disabled={data.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <span>⬇</span>
            Download Data ({data.length} rows)
        </button>
    );
};

export default DownloadButton;
