'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Package, Users, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Total Sales',
    value: '$12,345',
    description: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Active Prescriptions',
    value: '245',
    description: '+12% from last month',
    icon: Package,
  },
  {
    title: 'Total Patients',
    value: '1,234',
    description: '+8.2% from last month',
    icon: Users,
  },
  {
    title: 'Recent Activities',
    value: '12',
    description: 'In the last 24 hours',
    icon: Activity,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your pharmacy.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="glass-card col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent sales to display.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card col-span-3">
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent prescriptions to display.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 