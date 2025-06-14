'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function AdminDashboard() {
  const { t, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('dashboard.title')}</h1>
          <p className="text-gray-600 mt-1">{t('dashboard.welcome')}</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {t('dashboard.refresh')}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('dashboard.totalUsers')}
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5%
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('dashboard.totalProducts')}
            </CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.2%
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('dashboard.totalOrders')}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2.4%
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('dashboard.revenue')}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15.3%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-md">
          <CardHeader>
            <CardTitle>{t('dashboard.salesOverview')}</CardTitle>
            <CardDescription>{t('dashboard.salesDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              {t('dashboard.chartPlaceholder')}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            <CardDescription>{t('dashboard.activityDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('dashboard.activityItem')}</p>
                    <p className="text-xs text-gray-500">{t('dashboard.activityTime')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 