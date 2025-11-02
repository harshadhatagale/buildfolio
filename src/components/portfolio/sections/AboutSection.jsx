// components/AboutSection.tsx
import Image from "next/image"
import { useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
export default function AboutSection({ id, content }) {
 
  return (
    <div className={`relative py-10 px-5 bg-background`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <img
            src={`https://media.licdn.com/dms/image/v2/D5603AQHxr5mE2KkGkQ/profile-displayphoto-scale_400_400/B56ZgisT7tHQAg-/0/1752928702690?e=1763596800&v=beta&t=qzO37s3-ygrAI8flMPwlH0dPZ8oZ8I5_LY6-vdbygk0`} // Add your image in public folder
            alt="Harshad"
            
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {content.heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {content.about}
          </p>
        </div>
      </div>
    </div>
  )
}