'use client';

import React from 'react';

export default function Dashboard() {
    const postList = [
        {
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face",
            name: "John Doe",
            postText: "Great trader! Very responsive and fair. Would trade again."
        },
        {
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face",
            name: "John Doe",
            postText: "Great trader! Very responsive and fair. Would trade again."
        },
    ]
    return (
        <>
            <div className="w-[760px] mx-auto pt-[40px]">
                {/* PostList */}
                <ul className="rounded-lg overflow-hidden bg-white shadow-xl">
                    {postList.map((post, idx) => (
                        <li key={idx}>
                            <a href="#">
                                <div className={`flex gap-2 p-[20px] ${idx < postList.length - 1 ? 'border-b border-b-[#e0e0e0]' : ''}`}>
                                    {/* icon */}
                                    <div>
                                        <img
                                            src={post.image}
                                            alt={post.name}
                                            className="size-10 rounded-full"
                                        />
                                    </div>

                                    {/* content */}
                                    <div className="flex flex-col gap-3">
                                        <span className="font-bold text-[22px]">
                                            {post.name}
                                        </span>
                                        <p>
                                            {post.postText}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}