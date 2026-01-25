import React from 'react';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="antialiased text-gray-900 bg-white">
            {children}
        </div>
    );
}
