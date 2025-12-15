'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Github, Linkedin, Twitter, Globe, Code2, Terminal,
    Cpu, GitBranch, Palette, Shield, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "./sections/Header";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function DeveloperProfilePage() {
    const { isLoaded, isSignedIn, user } = useUser();

    // If data is still loading
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                Loading…
            </div>
        );
    }

    // If user is NOT signed in
    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-3xl font-bold mb-3">You're not signed in</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Please sign in to view your developer profile.
                </p>

                <SignInButton mode="modal">
                    <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Sign In
                    </Button>
                </SignInButton>
            </div>
        );
    }

    // ---------- SAFE METADATA EXTRACTION ----------
    const metadata = user?.publicMetadata || {};

    const skills =
        metadata.skills ||
        ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"];

    const stats =
        metadata.stats || {
            projects: 24,
            contributions: 128,
            experience: "5+ years",
            availability: "Open to work",
        };

    const socialLinks = metadata.socialLinks || {};

    // ----------------------------------------------

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 p-4 md:p-4">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <Header user={user} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT PROFILE CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <Card className="relative bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-xl shadow-xl">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

                            <CardHeader className="pt-8 pb-4">
                                <div className="flex flex-col items-center text-center">

                                    {/* Avatar */}
                                    <Avatar className="w-32 h-32 border-4 border-gray-200 dark:border-gray-800 shadow-lg">
                                        <AvatarImage
                                            src={user?.imageUrl ?? ""}
                                            alt={user?.fullName ?? "Profile"}
                                        />
                                        <AvatarFallback className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                                            {user?.firstName?.charAt(0) ?? "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="mt-6 text-2xl font-bold">
                                        {user?.firstName ?? "Developer"}
                                    </CardTitle>

                                    <div className="flex items-center gap-2 mt-2">
                                        <Code2 className="w-4 h-4 text-cyan-600" />
                                        <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                                            {metadata.title ?? "Full Stack Developer"}
                                        </p>
                                    </div>

                                    <Badge className="mt-3 px-3 py-1">
                                        <Shield className="w-3 h-3 mr-1" />
                                        {metadata.subscriptionType ?? "PRO TIER"}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Social Links */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Connect
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3">
                                        {socialLinks.github && (
                                            <Button variant="outline" asChild>
                                                <a href={socialLinks.github} target="_blank">
                                                    <Github className="w-4 h-4" /> GitHub
                                                </a>
                                            </Button>
                                        )}

                                        {socialLinks.linkedin && (
                                            <Button variant="outline" asChild>
                                                <a href={socialLinks.linkedin} target="_blank">
                                                    <Linkedin className="w-4 h-4" /> LinkedIn
                                                </a>
                                            </Button>
                                        )}

                                        {socialLinks.twitter && (
                                            <Button variant="outline" asChild>
                                                <a href={socialLinks.twitter} target="_blank">
                                                    <Twitter className="w-4 h-4" /> Twitter
                                                </a>
                                            </Button>
                                        )}

                                        {socialLinks.website && (
                                            <Button variant="outline" asChild>
                                                <a href={socialLinks.website} target="_blank">
                                                    <Globe className="w-4 h-4" /> Website
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* RIGHT SIDE (Bio, Skills, CTA) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* BIO */}
                        <Card className="relative bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-xl shadow-xl">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-emerald-600" />
                                    $ whoami
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-mono text-gray-700 dark:text-gray-300">
                                    {metadata.bio ??
                                        "// Senior developer specializing in scalable systems."}
                                </p>
                            </CardContent>
                        </Card>

                        {/* SKILLS */}
                        <Card className="relative bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-xl shadow-xl">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>

                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cpu className="w-5 h-5 text-violet-600" />
                                    Tech Stack
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Badge variant="outline">{skill}</Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div className="mt-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="font-mono text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}