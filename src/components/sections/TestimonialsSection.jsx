import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from 'react-redux';


export default function TestimonialsSection({ id }) {
  const selectedSection = useSelector((state) => state.portfolio.selectedSection);
  const isSelected = selectedSection._id === id;
  console.log(isSelected)
  const content = {
    heading: "What People Say", // optional heading
    testimonials: [
      {
        name: "Ravi Kumar",
        role: "CEO, TechCorp",
        message: "Harshad did an excellent job. Highly recommended!",
        image: "https://example.com/ravi.jpg"
      },
      {
        name: "Anjali Sharma",
        role: "Project Manager, InnovateX",
        message: "Professional, punctual, and very talented developer.",
        image: "https://example.com/anjali.jpg"
      },
      {
        name: "Rahul Verma",
        role: "Founder, CodeMasters",
        message: "Working with Harshad was a fantastic experience.",
        image: "https://example.com/rahul.jpg"
      }
    ]
  }

  return (
    <section className={`w-full py-3 border-2 border-dashed ${isSelected ? "border-muted" : ""} bg-background px-6`}>
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
