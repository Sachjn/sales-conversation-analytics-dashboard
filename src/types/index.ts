export interface SalesRecord {
  orderId: string;
  orderDate: string;
  region: string;
  category: string;
  subCategory: string;
  productName: string;
  sales: number;
  profit: number;
  quantity: number;
  discount: number;
}

export interface KPIData {
  totalSales: number;
  totalProfit: number;
  totalOrders: number;
  avgOrderValue: number;
  momGrowth: number;
}

export interface FilterState {
  dateRange: [string, string];
  regions: string[];
  categories: string[];
}
