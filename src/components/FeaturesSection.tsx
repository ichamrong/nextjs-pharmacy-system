'use client';

import { 
  MdInventory2,
  MdAnalytics,
  MdPeople,
  MdTrendingUp,
  MdAssignment,
  MdNotifications,
  MdSecurity,
  MdSpeed,
  MdCloud,
  MdSupport,
  MdSync,
  MdVerified
} from 'react-icons/md';

const features = [
  {
    title: 'Inventory Management',
    description: 'Track and manage your pharmacy inventory in real-time with automated alerts and smart reordering',
    icon: MdInventory2,
    benefits: ['Real-time stock tracking', 'Automated reordering', 'Expiry date monitoring'],
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Get comprehensive insights into your pharmacy performance with customizable reports',
    icon: MdAnalytics,
    benefits: ['Sales analytics', 'Inventory trends', 'Performance metrics'],
    color: 'from-purple-500/20 to-purple-600/20'
  },
  {
    title: 'Patient Management',
    description: 'Manage patient records, prescriptions, and medication history in one secure place',
    icon: MdPeople,
    benefits: ['Patient profiles', 'Prescription history', 'Medication tracking'],
    color: 'from-green-500/20 to-green-600/20'
  },
  {
    title: 'Sales Tracking',
    description: 'Monitor sales trends, revenue, and profitability with detailed analytics',
    icon: MdTrendingUp,
    benefits: ['Revenue tracking', 'Profit analysis', 'Sales forecasting'],
    color: 'from-yellow-500/20 to-yellow-600/20'
  },
  {
    title: 'Prescription Management',
    description: 'Streamline prescription processing with digital verification and automated workflows',
    icon: MdAssignment,
    benefits: ['Digital prescriptions', 'Automated verification', 'Refill management'],
    color: 'from-red-500/20 to-red-600/20'
  },
  {
    title: 'Stock Alerts',
    description: 'Stay ahead with intelligent stock alerts and automated reordering suggestions',
    icon: MdNotifications,
    benefits: ['Low stock alerts', 'Reorder suggestions', 'Stock level monitoring'],
    color: 'from-pink-500/20 to-pink-600/20'
  }
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Key Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your pharmacy efficiently and grow your business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
              <div className="relative glass-card glass-card-hover rounded-xl p-8 h-full">
                <div className="flex flex-col h-full">
                  <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl w-fit mb-6`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <MdVerified className="w-4 h-4 mr-2 text-white/60" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 