// src/app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link'
import InputField from '@/components/common/InputField'; // 例: 共通コンポーネントのインポート
import Button from '@/components/common/Button'; // 例: 共通コンポーネントのインポート

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); //pageの再読み込みを防ぐ
        setLoading(true);
        console.log(email, password);

        // goへ
        // authApi.login(email, password)
    }

    return (
        <>
            <h2 className="text-center">Welcome to PokeTrade</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="メールアドレス"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="your.email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                // inputClassName='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"'
                />
                <InputField
                    label="パスワード"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder='パスワードを入力'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Link href="">Forgot Password?</Link>

                <Button
                    type="submit" // HTMLのtype属性も指定可能
                    variant="primary"
                    size="large"
                    fullWidth
                    isLoading={loading} // ローディング状態を渡す
                    disabled={!email || !password} // メールとパスワードが入力されていなければ無効
                >
                    ログイン
                </Button>
            </form>
            <p>アカウントをお持ちでないですか？{' '}
                <a href="/register" className="text-blue-500 hover:text-blue-700 font-bold">
                    新規登録
                </a></p>
        </>
    );
}