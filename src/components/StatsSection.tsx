'use client';

import { 
  MdTrendingUp, 
  MdAccessTime, 
  MdSupportAgent, 
  MdPayments,
  MdSecurity,
  MdSpeed
} from 'react-icons/md';

const stats = [
  {
    value: '500+',
    label: 'Pharmacies',
    description: 'Trusted by pharmacies worldwide',
    trend: '+15% this month',
    icon: MdTrendingUp
  },
  {
    value: '99.9%',
    label: 'Uptime',
    description: 'Reliable system availability',
    trend: 'Last 30 days',
    icon: MdAccessTime
  },
  {
    value: '24/7',
    label: 'Support',
    description: 'Round-the-clock assistance',
    trend: 'Average response time: 5min',
    icon: MdSupportAgent
  },
  {
    value: '1M+',
    label: 'Transactions',
    description: 'Processed monthly',
    trend: '+25% YoY growth',
    icon: MdPayments
  },
  {
    value: '100%',
    label: 'Secure',
    description: 'HIPAA compliant',
    trend: 'Enterprise-grade security',
    icon: MdSecurity
  },
  {
    value: '50ms',
    label: 'Response Time',
    description: 'Lightning-fast performance',
    trend: 'Industry leading',
    icon: MdSpeed
  }
];

export function StatsSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover rounded-xl p-8 gradient-border"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2 gradient-text">{stat.value}</h3>
                <p className="text-lg font-semibold mb-2">{stat.label}</p>
                <p className="text-sm text-muted-foreground mb-1">{stat.description}</p>
                <p className="text-xs text-white/60">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 