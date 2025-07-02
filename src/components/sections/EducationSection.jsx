'use client';

import {
    GraduationCap,
    Book,
    School,
    Layout
} from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '@/components/ui/card';

export default function EducationSection() {
    const iconMap = {
        graduationcap: GraduationCap,
        book: Book,
        school: School
    };
    const content = {
        heading: "Education",
        subHeading: "My academic journey so far.",
        items: [
            {
                degree: "Bachelor of Technology in Computer Science",
                institution: "GCOEJ - Government College of Engineering, Jalgaon",
                year: "2022 - 2026",
                description: "Learning Computer Science fundamentals, data structures, algorithms, and software development practices.",
                icon: "graduationCap"
            },
            {
                degree: "HSC - Science",
                institution: "XYZ Junior College",
                year: "2020 - 2022",
                description: "Physics, Chemistry, Math with Computer Science.",
                icon: "book"
            },
            {
                degree: "SSC - High School",
                institution: "ABC High School",
                year: "2010 - 2020",
                description: "Completed schooling with distinction.",
                icon: "school"
            }
        ]
    }
    return (
        <section className="w-full py-4 md:py-4 px-6 bg-background">
            <div className="container space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight">
                        {content?.heading || 'Education'}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {content?.subHeading || 'My academic background'}
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
                                    <CardTitle>{item.degree}</CardTitle>
                                    <CardDescription>{item.institution}</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        {item.year}
                                    </p>
                                    <p className="text-sm">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
