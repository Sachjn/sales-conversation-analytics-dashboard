import { useMemo, useState } from 'react';
import { salesData, ALL_REGIONS, ALL_CATEGORIES } from '../data/salesData';
import { SalesRecord, KPIData, FilterState } from '../types';

export function useSalesData() {
    const [filters, setFilters] = useState<FilterState>({
        dateRange: ['2024-01-01', '2024-12-31'],
        regions: [...ALL_REGIONS],
        categories: [...ALL_CATEGORIES],
    });

    /* Apply filters to dataset */
    const filteredData = useMemo<SalesRecord[]>(() => {
        return salesData.filter((record) => {
            const inDateRange =
                record.orderDate >= filters.dateRange[0] &&
                record.orderDate <= filters.dateRange[1];
            const inRegion = filters.regions.includes(record.region);
            const inCategory = filters.categories.includes(record.category);
            return inDateRange && inRegion && inCategory;
        });
    }, [filters]);

    /* Calculate KPIs from filtered data */
    const kpis = useMemo<KPIData>(() => {
        const totalSales = filteredData.reduce((sum, r) => sum + r.sales, 0);
        const totalProfit = filteredData.reduce((sum, r) => sum + r.profit, 0);
        const totalOrders = filteredData.length;
        const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

        /* Month-over-Month growth: compare last two months with data */
        const monthlySales: Record<string, number> = {};
        filteredData.forEach((r) => {
            const month = r.orderDate.substring(0, 7);
            monthlySales[month] = (monthlySales[month] || 0) + r.sales;
        });
        const sortedMonths = Object.keys(monthlySales).sort();
        let momGrowth = 0;
        if (sortedMonths.length >= 2) {
            const current = monthlySales[sortedMonths[sortedMonths.length - 1]];
            const previous = monthlySales[sortedMonths[sortedMonths.length - 2]];
            momGrowth = previous > 0 ? ((current - previous) / previous) * 100 : 0;
        }

        return {
            totalSales: Math.round(totalSales * 100) / 100,
            totalProfit: Math.round(totalProfit * 100) / 100,
            totalOrders,
            avgOrderValue: Math.round(avgOrderValue * 100) / 100,
            momGrowth: Math.round(momGrowth * 10) / 10,
        };
    }, [filteredData]);

    /* Monthly aggregation for trend chart */
    const monthlyData = useMemo(() => {
        const map: Record<string, { month: string; sales: number; profit: number; orders: number }> = {};
        filteredData.forEach((r) => {
            const month = r.orderDate.substring(0, 7);
            if (!map[month]) map[month] = { month, sales: 0, profit: 0, orders: 0 };
            map[month].sales += r.sales;
            map[month].profit += r.profit;
            map[month].orders += 1;
        });
        return Object.values(map)
            .sort((a, b) => a.month.localeCompare(b.month))
            .map((d) => ({
                ...d,
                sales: Math.round(d.sales),
                profit: Math.round(d.profit),
            }));
    }, [filteredData]);

    /* Region aggregation */
    const regionData = useMemo(() => {
        const map: Record<string, { region: string; sales: number; profit: number }> = {};
        filteredData.forEach((r) => {
            if (!map[r.region]) map[r.region] = { region: r.region, sales: 0, profit: 0 };
            map[r.region].sales += r.sales;
            map[r.region].profit += r.profit;
        });
        return Object.values(map)
            .sort((a, b) => b.sales - a.sales)
            .map((d) => ({
                ...d,
                sales: Math.round(d.sales),
                profit: Math.round(d.profit),
            }));
    }, [filteredData]);

    /* Category aggregation */
    const categoryData = useMemo(() => {
        const map: Record<string, { category: string; sales: number; profit: number }> = {};
        filteredData.forEach((r) => {
            if (!map[r.category]) map[r.category] = { category: r.category, sales: 0, profit: 0 };
            map[r.category].sales += r.sales;
            map[r.category].profit += r.profit;
        });
        return Object.values(map)
            .sort((a, b) => b.sales - a.sales)
            .map((d) => ({
                ...d,
                sales: Math.round(d.sales),
                profit: Math.round(d.profit),
            }));
    }, [filteredData]);

    /* Top 10 products by sales */
    const topProducts = useMemo(() => {
        const map: Record<string, { product: string; sales: number; orders: number }> = {};
        filteredData.forEach((r) => {
            if (!map[r.productName]) map[r.productName] = { product: r.productName, sales: 0, orders: 0 };
            map[r.productName].sales += r.sales;
            map[r.productName].orders += 1;
        });
        return Object.values(map)
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 10)
            .map((d) => ({ ...d, sales: Math.round(d.sales) }));
    }, [filteredData]);

    /* Business insights */
    const insights = useMemo(() => {
        if (filteredData.length === 0) return [];

        const result: string[] = [];

        /* Top region */
        if (regionData.length > 0) {
            const top = regionData[0];
            const pct = kpis.totalSales > 0 ? ((top.sales / kpis.totalSales) * 100).toFixed(1) : '0';
            result.push(`${top.region} region leads with ₹${top.sales.toLocaleString()} in sales (${pct}% of total revenue).`);
        }

        /* Most profitable category */
        if (categoryData.length > 0) {
            const sorted = [...categoryData].sort((a, b) => b.profit - a.profit);
            const top = sorted[0];
            const margin = top.sales > 0 ? ((top.profit / top.sales) * 100).toFixed(1) : '0';
            result.push(`${top.category} is the most profitable category with ₹${top.profit.toLocaleString()} profit (${margin}% margin).`);
        }

        /* Best performing month */
        if (monthlyData.length > 0) {
            const best = [...monthlyData].sort((a, b) => b.sales - a.sales)[0];
            const monthName = new Date(best.month + '-01').toLocaleString('default', {
                month: 'long',
                year: 'numeric',
            });
            result.push(`${monthName} was the best-performing month with ₹${best.sales.toLocaleString()} in sales.`);
        }

        /* Average discount impact */
        const avgDiscount = filteredData.reduce((sum, r) => sum + r.discount, 0) / filteredData.length;
        const profitMargin = kpis.totalSales > 0 ? (kpis.totalProfit / kpis.totalSales) * 100 : 0;
        result.push(
            `Overall profit margin stands at ${profitMargin.toFixed(1)}% with an average discount of ${(avgDiscount * 100).toFixed(1)}% across ${kpis.totalOrders} orders.`
        );

        return result;
    }, [filteredData, regionData, categoryData, monthlyData, kpis]);

    return {
        filters,
        setFilters,
        filteredData,
        kpis,
        monthlyData,
        regionData,
        categoryData,
        topProducts,
        insights,
    };
}
