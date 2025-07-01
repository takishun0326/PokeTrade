// src/app/(auth)/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link'
import InputField from '@/components/common/InputField'; // 例: 共通コンポーネントのインポート
import Button from '@/components/common/Button'; // 例: 共通コンポーネントのインポート


export default function RegistPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);



    return (
        <>
            <form>
                <h2>アカウント新規作成</h2>
                <InputField
                    label='ユーザー名'
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=''
                    required
                />
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
                {/* // InputFieldコンポーネントのすぐ後に条件付きでエラーメッセージを表示 */}
                {password2.length > 0 && password !== password2 && (
                    <p className="text-red-500 text-sm mt-1">パスワードが一致しません</p>
                )}
                <InputField
                    label="パスワード確認"
                    type="password"
                    id="password"
                    name="password"
                    value={password2}
                    placeholder='パスワードを再入力'
                    onChange={(e) => {
                        setPassword2(e.target.value)

                    }}
                    required
                />
                <Button
                    type="submit" // HTMLのtype属性も指定可能
                    variant="primary"
                    size="large"
                    fullWidth
                    isLoading={loading} // ローディング状態を渡す
                    disabled={!username || !email || !password
                        || password !== password2
                    } // メールとパスワードが入力されていなければ無効
                >
                    アカウント作成
                </Button>
            </form>
            <p>既にアカウントをお持ちですか？{' '}
                <a href="/login" className="text-blue-500 hover:text-blue-700 font-bold">
                    ログイン
                </a></p>
        </>
    );
}