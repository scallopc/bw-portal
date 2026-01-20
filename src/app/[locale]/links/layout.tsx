// src/app/[locale]/links/layout.tsx
'use client';

export default function LinksLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className="min-h-screen bg-white">
                {children}
            </body>
        </html>
    );
}