'use client';
import React from 'react'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* children に login/page.tsx または register/page.tsx の内容が入ってくる */}
                {children}
            </div>
        </div>
    );
}