'use client';
import React from 'react';
import {
    BadgeCheck,
    Cloud,
    Braces,
    Layout,
    ExternalLink
} from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CertificationsSection({id,name, content}) {
    const iconMap = {
        badgecheck: BadgeCheck,
        cloud: Cloud,
        braces: Braces
    };
    return (
        <section id={name} className={`relative w-full py-20 bg-background px-6`}>
            <div className="container space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight">
                        {content?.heading || 'Certifications'}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {content?.subHeading || 'Credentials and certifications I have achieved.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content?.items?.map((item, index) => {
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

                                {item.link && (
                                    <CardFooter>
                                        <Button asChild variant="outline" className="w-full">
                                            <Link href={item.link} target="_blank">
                                                View Certificate
                                                <ExternalLink className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}