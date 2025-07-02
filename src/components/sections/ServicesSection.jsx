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
import { Button } from '@/components/ui/button';

export default function ServicesSection() {
    const content = {
        heading: "My Services",
        subHeading: "Here’s what I can do for you.",
        services: [
            {
                title: "Web Development",
                description: "Building responsive and modern websites using Next.js, React, and Tailwind CSS.",
                icon: "code",
                link: "/services/web-development"
            },
            {
                title: "UI/UX Design",
                description: "Designing user-friendly, clean, and interactive UI experiences.",
                icon: "palette",
                link: "/services/ui-ux-design"
            },
            {
                title: "Mobile App Development",
                description: "Creating cross-platform mobile apps with React Native.",
                icon: "smartphone",
                link: "/services/mobile-development"
            }
        ]
    }
    const iconMap = {
        code: Code,
        palette: Palette,
        smartphone: Smartphone
    };

    return (
        <section className="w-full py-12 md:py-20 bg-background px-6">
            <div className="container space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight">
                        {content?.heading || 'My Services'}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {content?.subHeading || 'What I can help you with'}
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
