// src/app/[locale]/services/components/testimonials-list.tsx
"use client";

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
}

export function TestimonialsList() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const q = query(
                    collection(db, 'testimonials'),
                    where('approved', '==', true),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const testimonialsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Testimonial[];

                setTestimonials(testimonialsData);
            } catch (error) {
                console.error('Erro ao buscar depoimentos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return <div>Carregando depoimentos...</div>;
    }

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-card p-6 rounded-lg shadow">
                    <p className="text-muted-foreground italic mb-4">{testimonial.content}</p>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                            {testimonial.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {testimonial.role}, {testimonial.company}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}