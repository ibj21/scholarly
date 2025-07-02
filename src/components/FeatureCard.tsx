
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600 border-blue-200',
    indigo: 'from-indigo-500 to-indigo-600 bg-indigo-50 text-indigo-600 border-indigo-200',
    purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600 border-purple-200',
    cyan: 'from-cyan-500 to-cyan-600 bg-cyan-50 text-cyan-600 border-cyan-200',
    teal: 'from-teal-500 to-teal-600 bg-teal-50 text-teal-600 border-teal-200',
    orange: 'from-orange-500 to-orange-600 bg-orange-50 text-orange-600 border-orange-200',
  };

  const [bgClass, iconBgClass, iconColorClass, borderClass] = colorClasses[color as keyof typeof colorClasses].split(' ');

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${borderClass} bg-white/80 backdrop-blur-sm`}>
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 mx-auto ${iconBgClass} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className={iconColorClass}>
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-center leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
