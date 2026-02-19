# 📊 Sales Performance Analytics Dashboard

A professional, interactive Sales Performance Analytics Dashboard built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**. This project demonstrates core Data Analyst skills — data aggregation, KPI computation, dynamic filtering, and business insight generation — all within a clean, corporate-grade UI.

---

## 🎯 Project Overview

This dashboard provides a comprehensive view of sales performance across regions, categories, and time periods. It enables business stakeholders to:

- Track revenue, profit, and order trends at a glance
- Drill down into regional and category-level performance
- Identify top-performing products
- Monitor month-over-month growth
- Export filtered data for further analysis

---

## ✨ Features

| Feature | Description |
|---|---|
| **5 KPI Metrics** | Total Sales, Total Profit, Total Orders, Avg Order Value, MoM Growth % |
| **Interactive Filters** | Date range, Region, and Category filters in a sidebar — all dynamically connected |
| **Monthly Sales Trend** | Line chart showing Sales & Profit over 12 months |
| **Sales by Region** | Bar chart comparing regional revenue |
| **Profit by Region** | Bar chart comparing regional profitability |
| **Sales by Category** | Donut pie chart with percentage breakdown |
| **Top 10 Products** | Horizontal bar chart ranking products by revenue |
| **Business Insights** | 4 auto-generated, data-driven insights based on current filters |
| **CSV Download** | Export filtered dataset as a CSV file |
| **Responsive Layout** | Clean sidebar + content layout with professional typography |

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS 3
- **Charts**: Recharts
- **Build Tool**: Vite
- **Font**: Inter (Google Fonts)

---

## 🚀 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/Sachjn/sales-conversation-analytics-dashboard.git
cd sales-conversation-analytics-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Dashboard/          # KPI cards, charts, insights, download
│   └── Layout/             # Header, Sidebar (filters), Layout shell
├── data/
│   └── salesData.ts        # 1000-row mock sales dataset
├── hooks/
│   └── useSalesData.ts     # Filtering, aggregation, KPI computation
├── pages/
│   └── Dashboard/          # Main Dashboard page
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # App entry
├── main.tsx                # React DOM mount
└── index.css               # Global styles + Tailwind
```

---

## 📸 Screenshots

> _Add screenshots of the running dashboard here._

---

## 💼 Business Value

This project demonstrates practical skills relevant to Data Analyst and Business Intelligence roles:

- **Data Aggregation**: Grouping and summarizing 1000+ records by multiple dimensions
- **KPI Design**: Choosing and computing metrics that drive business decisions
- **Interactive Filtering**: Building dynamic, interconnected filter logic
- **Visual Storytelling**: Using appropriate chart types to communicate insights
- **Auto-generated Insights**: Translating raw data into actionable business observations

---

## 📝 License

MIT License — free to use for your portfolio.
