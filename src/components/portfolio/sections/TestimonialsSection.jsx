import React, {useState, useEffect} from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from 'react-redux';


export default function TestimonialsSection({ id,name, content }) {
  
  return (
    <section id={name} className={`relative w-full py-20 bg-background px-6`}>
      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            {content?.heading || "Testimonials"}
          </h2>
          <p className="text-muted-foreground text-lg">
            What people say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.testimonials?.map((item, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={item.image} alt={item.name} />
                  <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{item.name}</CardTitle>
                <CardDescription>{item.role}</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">
                  “{item.message}”
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

  )
}