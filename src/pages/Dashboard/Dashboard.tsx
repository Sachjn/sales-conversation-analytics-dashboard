import React from 'react';
import { useSalesData } from '../../hooks/useSalesData';
import KPICards from '../../components/Dashboard/KPICards';
import SalesTrendChart from '../../components/Dashboard/SalesTrendChart';
import RegionSalesChart from '../../components/Dashboard/RegionSalesChart';
import RegionProfitChart from '../../components/Dashboard/RegionProfitChart';
import CategoryChart from '../../components/Dashboard/CategoryChart';
import TopProductsChart from '../../components/Dashboard/TopProductsChart';
import BusinessInsights from '../../components/Dashboard/BusinessInsights';
import DownloadButton from '../../components/Dashboard/DownloadButton';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Layout/Sidebar';

const Dashboard: React.FC = () => {
  const {
    filters,
    setFilters,
    filteredData,
    kpis,
    monthlyData,
    regionData,
    categoryData,
    topProducts,
    insights,
  } = useSalesData();

  return (
    <Layout sidebar={<Sidebar filters={filters} onFilterChange={setFilters} />}>
      <div className="space-y-6 max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredData.length.toLocaleString()} orders across selected filters
            </p>
          </div>
          <DownloadButton data={filteredData} />
        </div>

        {/* KPI Cards */}
        <KPICards data={kpis} />

        {/* Charts Row 1: Trend + Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesTrendChart data={monthlyData} />
          </div>
          <CategoryChart data={categoryData} />
        </div>

        {/* Charts Row 2: Region Sales + Region Profit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegionSalesChart data={regionData} />
          <RegionProfitChart data={regionData} />
        </div>

        {/* Top Products */}
        <TopProductsChart data={topProducts} />

        {/* Business Insights */}
        <BusinessInsights insights={insights} />

        {/* Footer */}
        <footer className="text-center py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Sales Performance Analytics Dashboard &bull; Built with React, TypeScript & Recharts
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Dashboard;
