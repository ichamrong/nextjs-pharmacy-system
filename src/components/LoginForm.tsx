import React from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';

export const LoginForm = () => {
  return (
    <div className="relative w-full max-w-md px-4 sm:px-6">
      {/* Glass card with enhanced effects */}
      <div className="relative overflow-hidden rounded-2xl bg-white/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Decorative elements */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-pink-500/5 blur-3xl" />
        
        <div className="relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Sign in to your pharmacy account
            </p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative group">
                  <EnvelopeClosedIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11 rounded-xl border-gray-200 bg-white/50 pl-10 shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-gray-300"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative group">
                  <LockClosedIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-11 rounded-xl border-gray-200 bg-white/50 pl-10 shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-gray-300"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
            
            <Button
              type="submit"
              className="group relative h-11 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500/20"
            >
              <span className="relative z-10">Sign in</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}; 