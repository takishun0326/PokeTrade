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
                <main className="flex-1 bg-white rounded-lg shadow-md">
                    <div className="container-md mx-60 my-20">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}