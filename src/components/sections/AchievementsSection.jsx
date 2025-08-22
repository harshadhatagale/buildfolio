'use client';
import React, { useState, useEffect } from 'react';

import {
  Award,
  Cloud,
  GitBranch,
  Layout
} from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';

export default function AchievementsSection({ id, content }) {
  const iconMap = {
    award: Award,
    cloud: Cloud,
    gitbranch: GitBranch
  };


  return (
    <section className={`relative w-full py-10 px-6 bg-background`}>

      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            {content.heading || 'Achievements'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content.subHeading || 'Some of my proudest moments.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item, index) => {
            const Icon = iconMap[item.icon?.toLowerCase()] || Layout;
            return (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-col gap-3 items-start">
                  <div className="p-3 rounded-xl bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.issuer}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{item.year}</p>
                  <p className="text-sm">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
