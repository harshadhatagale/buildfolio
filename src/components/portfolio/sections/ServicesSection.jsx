'use client';

import {
    Code,
    Palette,
    Smartphone,
    Layout
} from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '@/components/ui/card';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

export default function ServicesSection({ id,name, content }) {
    const iconMap = {
        code: Code,
        palette: Palette,
        smartphone: Smartphone
    };

    
    return (
        <section id={name} className={`relative w-full py-20 bg-background px-6`}>
            <div className="container space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight">
                        {content.heading}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {content.subHeading || 'What I can help you with'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content?.services?.map((item, index) => {
                        const Icon = iconMap[item.icon?.toLowerCase()] || Layout;
                        return (
                            <Card key={index} className="hover:shadow-xl transition-shadow">
                                <CardHeader className="flex flex-col gap-3 items-start">
                                    <div className="p-3 rounded-xl bg-muted">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href={item.link}>Learn More</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}