'use client'

import ProfilePage from '@/components/profile/ProfilePage'
import React from 'react'

export const sampleUser = {
  userId: "user_123456789",
  name: "Harshad Hatagale",
  email: "harshad@example.com",
  bio: "Full-stack developer and founder of BuildFolio. I love creating SaaS products, writing clean code, and helping people build their digital identity.",
  avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
  socialLinks: {
    github: "https://github.com/harshad",
    linkedin: "https://linkedin.com/in/harshad",
    twitter: "https://twitter.com/harshad",
    website: "https://buildfolio.space",
  },
  subscriptionType: "premium",
  createdAt: "2025-01-12T10:00:00Z",
  updatedAt: "2025-01-18T15:30:00Z",
};

export default function page() {
  return (
    <>
    <ProfilePage user={sampleUser}/>
    </>
  )
}
