import React from 'react';

interface BusinessInsightsProps {
    insights: string[];
}

const BusinessInsights: React.FC<BusinessInsightsProps> = ({ insights }) => {
    if (insights.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-lg">💡</span> Key Business Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {insights.map((insight, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100"
                    >
                        <span className="text-blue-600 font-bold text-sm mt-0.5">{index + 1}.</span>
                        <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessInsights;
