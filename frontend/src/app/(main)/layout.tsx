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
            <div className="flex bg-gray-100 p-4"> {/*min-h-screen*/}
                <Sidebar />
                <main className="flex-1 bg-[#F5F7F9] rounded-lg shadow-md">
                    <div className="items-center mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}