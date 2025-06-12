'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { FaPills, FaUserMd, FaChartLine, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
      router.push('/dashboard');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
      router.push('/dashboard');
      toast.success('Registration successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 animate-float rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute -right-4 top-1/3 h-72 w-72 animate-float-delayed rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute bottom-1/4 left-1/2 h-72 w-72 -translate-x-1/2 animate-float-slow rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-900/20" />
      </div>

      <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 w-full max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pharmacy System
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Streamline your pharmacy operations with our comprehensive management solution
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Features Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                      <FaPills className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Inventory Management</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Track and manage your medicine inventory efficiently</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                      <FaUserMd className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Prescription Management</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Handle prescriptions and patient records securely</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 rounded-lg bg-pink-100 p-3 dark:bg-pink-900/30">
                      <FaChartLine className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Sales Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Track sales and generate detailed reports</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                      <FaShieldAlt className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Secure & Compliant</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">HIPAA compliant with advanced security features</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Auth Card */}
            <motion.div variants={itemVariants}>
              <Card className="glass-card relative overflow-hidden border-none shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                <CardHeader className="relative space-y-1">
                  <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                  <CardDescription className="text-base">
                    Choose your preferred sign in method
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="glass-input"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 transition-all hover:from-blue-700 hover:to-purple-700"
                          disabled={isLoading}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="glass-input"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 transition-all hover:from-blue-700 hover:to-purple-700"
                          disabled={isLoading}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? 'Creating account...' : 'Create Account'}
                            <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
