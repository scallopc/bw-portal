"use client";

import { motion } from "framer-motion";
import { Users, Target, BarChart2, Code, Shield, Clock, Zap, MessageSquare, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("about");

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-background via-background to-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t('title')}</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Nossa História */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold text-foreground mb-6">{t('history.title')}</h2>
                                <div className="space-y-4 text-foreground/90">
                                    <p>
                                        {t('history.text')}
                                    </p>
                                    <p>
                                        {t('history.text2')}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl p-8 h-full"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground"> {t('history.mission.title')}</h3>
                                            <p className="text-muted-foreground">{t('history.mission.description')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                            <Target className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground">{t('history.vision.title')}</h3>
                                            <p className="text-muted-foreground">{t('history.vision.description')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                            <BarChart2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground">{t('history.values.title')}</h3>
                                            <p className="text-muted-foreground">{t('history.values.description')}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diferenciais */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center max-w-4xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">{t('differentials.tagTitle')}</span>
                        <h2 className="text-4xl font-bold text-foreground mb-4">{t('differentials.title')}</h2>
                        <p className="text-lg text-muted-foreground">
                            {t('differentials.description')}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Code className="h-6 w-6" />,
                                title: t('differentials.developmentAgile.title'),
                                description: t('differentials.developmentAgile.description'),
                                color: "text-blue-600",
                                bgColor: "bg-blue-100 dark:bg-blue-900/30"
                            },
                            {
                                icon: <Shield className="h-6 w-6" />,
                                title: t('differentials.securityGuaranteed.title'),
                                description: t('differentials.securityGuaranteed.description'),
                                color: "text-emerald-600",
                                bgColor: "bg-emerald-100 dark:bg-emerald-900/30"
                            },
                            {
                                icon: <Clock className="h-6 w-6" />,
                                title: t('differentials.support.title'),
                                description: t('differentials.support.description'),
                                color: "text-amber-600",
                                bgColor: "bg-amber-100 dark:bg-amber-900/30"
                            },
                            {
                                icon: <Zap className="h-6 w-6" />,
                                title: t('differentials.highPerformance.title'),
                                description: t('differentials.highPerformance.description'),
                                color: "text-violet-600",
                                bgColor: "bg-violet-100 dark:bg-violet-900/30"
                            },
                            {
                                icon: <MessageSquare className="h-6 w-6" />,
                                title: t('differentials.clearCommunication.title'),
                                description: t('differentials.clearCommunication.description'),
                                color: "text-rose-600",
                                bgColor: "bg-rose-100 dark:bg-rose-900/30"
                            },
                            {
                                icon: <Globe className="h-6 w-6" />,
                                title: t('differentials.globalVision.title'),
                                description: t('differentials.globalVision.description'),
                                color: "text-cyan-600",
                                bgColor: "bg-cyan-100 dark:bg-cyan-900/30"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-white dark:bg-card p-8 rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <div className={`w-16 h-16 ${item.bgColor} ${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110`}>
                                    {item.icon}
                                </div>
                                <h3 className={`text-xl font-bold text-center ${item.color} mb-3`}>{item.title}</h3>
                                <p className="text-foreground/80 dark:text-muted-foreground text-center leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


        </main>
    );
}
