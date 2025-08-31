'use client';

import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
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

export default function EducationSection({id, content}) {
    const iconMap = {
        graduationcap: GraduationCap,
        book: Book,
        school: School
    };
    const selectedSection= useSelector((state)=> state.portfolio.selectedSection)
  const [isSelected, setSelected]= useState(false)
  useEffect(()=>{
    const handleSelection=()=>{
      if (selectedSection._id===id) {
        setSelected(true)
      }
      else
      {
        setSelected(false)
      }
    }
    if(selectedSection)
    {
      handleSelection()
    }
  }, [selectedSection])
    return (
        <section className={`${isSelected ? "selected-section" : ""} relative w-full py-10 px-6 bg-background`}>
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