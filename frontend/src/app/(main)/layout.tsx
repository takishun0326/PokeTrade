'use client'
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';


export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Sidebar>

            </Sidebar>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    {children}
                </div>
            </div>
        </>
    );
}