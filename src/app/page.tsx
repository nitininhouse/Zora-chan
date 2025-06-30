import React from 'react';
import { ModeToggle } from '@/components/buttons/toggleThemeButton';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:shadow-3xl transition-all duration-300 hover:scale-105">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-black dark:text-white">
            Welcome Dashboard
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            Your personalized workspace awaits. Explore features and get started with your journey.
          </CardDescription>
          <CardAction className="flex justify-center">
            <ModeToggle />
          </CardAction>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-black dark:text-white">24</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-black dark:text-white">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Everything is running smoothly. Your latest updates have been processed successfully.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="pt-6 flex justify-between items-center">
          <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600">
            View Details
          </button>
          <button className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}