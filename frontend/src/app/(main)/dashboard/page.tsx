'use client';

import React, { useState } from 'react';
import { Bookmark } from 'lucide-react'; // Lucideアイコンのブックマーク（アウトラインと塗りつぶし）


export default function Dashboard() {
    const postList = [
        {
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face",
            name: "John Doe",
            postText: "Great trader! Very responsive and fair. Would trade again.",
            offeringPokemon: [
                { name: "Pikachu", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif" },
                { name: "Charizard", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif" },
            ],
            lookingForPokemon: [
                { name: "Mewtwo", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/150.gif" },
                { name: "Groudon", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/383.gif" },
            ],
            timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5分前の投稿

        },
        {
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face",
            name: "John Doe",
            postText: "Great trader! Very responsive and fair. Would trade again.",
            offeringPokemon: [
                { name: "Eevee", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif" },
            ],
            lookingForPokemon: [
                { name: "Ditto", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif" },
            ],
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2日前の投稿

        },
    ]

    const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());

    const toggleBookmark = (postId: number) => {
        setBookmarkedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    }

    return (
        <>
            <div className="w-[760px] mx-auto pt-[40px]">
                {/* PostList */}
                <ul className="rounded-lg overflow-hidden bg-white shadow-xl">
                    {postList.map((post, idx) => (
                        <li key={idx}>
                            <a href="#" className="block relative">
                                <div className={`flex gap-2 p-[20px] ${idx < postList.length - 1 ? 'border-b border-b-[#e0e0e0]' : ''}`}>

                                    {/* ブックマークボタン (右上) */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // aタグの遷移を防ぐ
                                            toggleBookmark(idx);
                                        }}
                                        className="absolute top-4 right-4 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        {bookmarkedPosts.has(idx) ? (
                                            <Bookmark fill="#6B7280" className="size-7 text-gray-500" />
                                        ) : (
                                            <Bookmark className="size-7 text-gray-500" />
                                        )}
                                    </button>
                                    {/* icon */}
                                    <div>
                                        <img
                                            src={post.image}
                                            alt={post.name}
                                            className="size-10 rounded-full"
                                        />
                                    </div>

                                    {/* content */}
                                    <div className="flex flex-col flex-1 gap-3">
                                        <span className="font-bold text-[22px]">
                                            {post.name}
                                        </span>
                                        <p className="text-gray-700">
                                            {post.postText}
                                        </p>

                                        {/* 新しいポケモン情報セクション */}
                                        <div className="flex flex-col mt-4"> {/* 上部にマージンを追加 */}
                                            {/* 提示するポケモン */}
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm mb-1 text-gray-800">Offering</span>
                                                <div className="flex gap-2">
                                                    {post.offeringPokemon.map((pokemon, pIdx) => (
                                                        <div key={pIdx} className="flex flex-col items-center">
                                                            <img
                                                                src={pokemon.imageUrl}
                                                                alt={pokemon.name}
                                                                className="size-16 image-rendering-pixelated" // ドット絵対応
                                                                title={pokemon.name}
                                                            />
                                                            {/* <span className="text-xs text-gray-600 truncate max-w-[64px]">{pokemon.name}</span> 名前表示 */}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 欲しいポケモン */}
                                            <div className="flex flex-col mt-4">
                                                <span className="font-semibold text-sm mb-1 text-gray-800">Looking For</span>
                                                <div className="flex gap-2">
                                                    {post.lookingForPokemon.map((pokemon, pIdx) => (
                                                        <div key={pIdx} className="flex flex-col items-center">
                                                            <img
                                                                src={pokemon.imageUrl}
                                                                alt={pokemon.name}
                                                                className="size-16 image-rendering-pixelated" // ドット絵対応
                                                                title={pokemon.name}
                                                            />
                                                            {/* <span className="text-xs text-gray-600 truncate max-w-[64px]">{pokemon.name}</span> */}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div> {/* ポケモン情報セクションの終わり */}



                                        {/* end content */}
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