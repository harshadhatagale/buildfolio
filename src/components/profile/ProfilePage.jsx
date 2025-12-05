import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter, Globe, Code2, Terminal, Cpu, Database, Server, Shield, Zap, GitBranch, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

export default function DeveloperProfilePage({ user }) {
    const skills = user?.skills || ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"];
    const stats = user?.stats || {
        projects: 24,
        contributions: 128,
        experience: "5+ years",
        availability: "Open to work"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Terminal-style header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="flex w-full justify-between items-center gap-3 text-green-600 dark:text-green-400 font-mono">
                        <div className="flex justify-center items-center gap-2">
                            <Terminal className="w-5 h-5" />
                        <span className="text-sm md:text-base">~/{user?.username || "developer"}/profile</span>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex gap-2 ml-auto">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <AnimatedThemeToggler />
                        </div>
                    </div>

                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <Card className="bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-xl dark:shadow-2xl rounded-xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

                            <CardHeader className="pt-8 pb-4">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="w-32 h-32 border-4 border-gray-100 dark:border-gray-800 shadow-lg">
                                        <AvatarImage src={user?.avatarUrl} />
                                        <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-900 dark:to-blue-900 text-white text-3xl">
                                            {user?.name?.charAt(0) || "D"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <CardTitle className="mt-6 text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                                        {user?.name}
                                    </CardTitle>

                                    <div className="flex items-center gap-2 mt-2">
                                        <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                        <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">{user?.title || "Full Stack Developer"}</p>
                                    </div>

                                    <Badge className="mt-3 px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 border border-cyan-300 dark:border-cyan-700/50 text-cyan-800 dark:text-cyan-300 rounded-full font-medium">
                                        <Shield className="w-3 h-3 mr-1" />
                                        {user?.subscriptionType || "PRO TIER"}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <Separator className="bg-gray-200 dark:bg-gray-800" />

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(stats).map(([key, value]) => (
                                        <div key={key} className="text-center p-3 bg-gray-50/50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-800">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{key}</p>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="bg-gray-200 dark:bg-gray-800" />

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Connect
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {user?.socialLinks?.github && (
                                            <Button
                                                variant="ghost"
                                                className="justify-start bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-800"
                                                asChild
                                            >
                                                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                    <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                                    <span className="text-gray-700 dark:text-gray-300">GitHub</span>
                                                </a>
                                            </Button>
                                        )}

                                        {user?.socialLinks?.linkedin && (
                                            <Button
                                                variant="ghost"
                                                className="justify-start bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-800"
                                                asChild
                                            >
                                                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                    <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                    <span className="text-gray-700 dark:text-gray-300">LinkedIn</span>
                                                </a>
                                            </Button>
                                        )}

                                        {user?.socialLinks?.twitter && (
                                            <Button
                                                variant="ghost"
                                                className="justify-start bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-800"
                                                asChild
                                            >
                                                <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                    <Twitter className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                                                    <span className="text-gray-700 dark:text-gray-300">Twitter</span>
                                                </a>
                                            </Button>
                                        )}

                                        {user?.socialLinks?.website && (
                                            <Button
                                                variant="ghost"
                                                className="justify-start bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-800"
                                                asChild
                                            >
                                                <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-emerald-600 dark:text-green-400" />
                                                    <span className="text-gray-700 dark:text-gray-300">Portfolio</span>
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Right Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Bio Section */}
                        <Card className="bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-xl dark:shadow-2xl rounded-xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                    <Terminal className="w-5 h-5 text-emerald-600 dark:text-green-400" />
                                    $ whoami
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-mono text-sm md:text-base">
                                    {user?.bio || "// Senior developer specializing in scalable systems and cutting-edge web technologies. Passionate about open-source, cybersecurity, and building tools that make a difference."}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Skills Section */}
                        <Card className="bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-xl dark:shadow-2xl rounded-xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                    <Cpu className="w-5 h-5 text-violet-600 dark:text-purple-400" />
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
                                            <Badge
                                                variant="outline"
                                                className="px-4 py-2 bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 font-mono"
                                            >
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-xl dark:shadow-2xl rounded-xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                    <GitBranch className="w-5 h-5 text-amber-600 dark:text-yellow-400" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { project: "neural-network-fw", action: "pushed to main", time: "2 hours ago", color: "text-emerald-600 dark:text-green-400" },
                                        { project: "security-suite", action: "merged PR #42", time: "5 hours ago", color: "text-blue-600 dark:text-blue-400" },
                                        { project: "blockchain-api", action: "fixed vulnerability", time: "1 day ago", color: "text-red-600 dark:text-red-400" },
                                        { project: "ui-library", action: "released v2.1.0", time: "2 days ago", color: "text-violet-600 dark:text-purple-400" },
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${activity.color} animate-pulse`}></div>
                                                <div>
                                                    <code className="text-gray-800 dark:text-gray-300 font-mono text-sm">{activity.project}</code>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">{activity.action}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">{activity.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800/30 backdrop-blur-sm rounded-xl">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ready to collaborate?</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mt-1">Let's build something amazing together</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border-0 text-white">
                                                <Palette className="w-4 h-4 mr-2" />
                                                View Portfolio
                                            </Button>
                                            <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                                                <Terminal className="w-4 h-4 mr-2" />
                                                Contact
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Footer Terminal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-500 dark:text-gray-500 text-sm font-mono">
                        Last updated: {new Date().toLocaleDateString()} | Status: <span className="text-emerald-600 dark:text-green-400">● Active</span>
                    </p>
                    <p className="text-gray-400 dark:text-gray-600 text-xs font-mono mt-2">
                        $ cat profile.txt | grep -i "available_for_collaboration"
                    </p>
                </motion.div>
            </div>
        </div>
    );
}