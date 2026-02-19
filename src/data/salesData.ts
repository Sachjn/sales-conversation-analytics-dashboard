import { SalesRecord } from '../types';

const REGIONS = ['North', 'South', 'East', 'West'];
const CATEGORIES: Record<string, { subCategories: string[]; products: string[] }> = {
    Technology: {
        subCategories: ['Phones', 'Laptops', 'Accessories', 'Tablets'],
        products: [
            'iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Air M2', 'Dell XPS 15',
            'HP Spectre x360', 'AirPods Pro', 'Logitech MX Master', 'iPad Air',
            'Sony WH-1000XM5', 'Google Pixel 8', 'ThinkPad X1 Carbon', 'Galaxy Tab S9',
            'Bose QC Ultra', 'Apple Watch Ultra', 'Razer DeathAdder', 'Keychron K2',
        ],
    },
    Furniture: {
        subCategories: ['Chairs', 'Desks', 'Storage', 'Bookcases'],
        products: [
            'Herman Miller Aeron', 'IKEA Markus Chair', 'Standing Desk Pro',
            'Executive L-Desk', 'Filing Cabinet 3-Drawer', 'Bookcase Oak 5-Shelf',
            'Ergonomic Mesh Chair', 'Corner Workstation', 'Storage Ottoman',
            'Wall-Mount Shelf Unit', 'Adjustable Monitor Stand', 'Sit-Stand Converter',
        ],
    },
    'Office Supplies': {
        subCategories: ['Paper', 'Pens', 'Binders', 'Labels'],
        products: [
            'A4 Copy Paper 500-Sheet', 'Pilot G2 Pen Pack', 'Stapler Heavy Duty',
            '3-Ring Binder Set', 'Post-it Notes Bulk', 'Sharpie Marker Pack',
            'Label Maker Pro', 'Envelope Pack 100', 'Desk Organizer Bamboo',
            'Whiteboard Markers Set', 'Paper Clips Box 1000', 'Highlighter 6-Pack',
        ],
    },
};

/* Deterministic pseudo-random number generator for consistent data */
function seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

function generateSalesData(): SalesRecord[] {
    const rand = seededRandom(42);
    const records: SalesRecord[] = [];
    const categoryKeys = Object.keys(CATEGORIES);

    for (let i = 0; i < 1000; i++) {
        const month = Math.floor(rand() * 12);
        const day = Math.floor(rand() * 28) + 1;
        const orderDate = `2024-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const region = REGIONS[Math.floor(rand() * REGIONS.length)];
        const category = categoryKeys[Math.floor(rand() * categoryKeys.length)];
        const catData = CATEGORIES[category];
        const subCategory = catData.subCategories[Math.floor(rand() * catData.subCategories.length)];
        const productName = catData.products[Math.floor(rand() * catData.products.length)];

        /* Realistic price ranges by category */
        let baseSales: number;
        if (category === 'Technology') {
            baseSales = 150 + rand() * 2500;
        } else if (category === 'Furniture') {
            baseSales = 80 + rand() * 1200;
        } else {
            baseSales = 5 + rand() * 120;
        }

        const quantity = Math.floor(rand() * 5) + 1;
        const discount = Math.round(rand() * 30) / 100;
        const sales = Math.round(baseSales * quantity * (1 - discount) * 100) / 100;
        const profitMargin = 0.08 + rand() * 0.35;
        const profit = Math.round(sales * profitMargin * 100) / 100;

        records.push({
            orderId: `ORD-${String(i + 1001).padStart(5, '0')}`,
            orderDate,
            region,
            category,
            subCategory,
            productName,
            sales,
            profit,
            quantity,
            discount,
        });
    }

    return records;
}

export const salesData: SalesRecord[] = generateSalesData();

export const ALL_REGIONS = REGIONS;
export const ALL_CATEGORIES = Object.keys(CATEGORIES);
