// frontend/src/components/common/InputField.tsx
import React from 'react';

// InputField コンポーネントが受け取るプロップスの型を定義
interface InputFieldProps {
    label: string; // 入力欄のラベル（例: "メールアドレス"）
    type: string;  // inputのtype属性（例: "text", "email", "password"）
    id?: string;   // input要素のid属性。labelのfor属性と紐づけるため。省略可能。
    name?: string; // input要素のname属性。フォーム送信時に使用。省略可能。
    value?: string; // 入力値の制御。制御コンポーネントとして使う場合に使用。
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 入力値変更時のハンドラ
    placeholder?: string; // プレースホルダーテキスト
    required?: boolean; // 必須入力かどうか
    className?: string; // 親要素から受け取る追加のCSSクラス
    inputClassName?: string; // input要素に直接適用する追加のCSSクラス
    // ...その他、必要に応じてHTMLInput Attributesを追加可能
    // 例えば、readOnly?: boolean; など
}


const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    id,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    className = ' ',
    inputClassName = ' ',
}) => {
    // idが指定されていない場合、自動生成する（アクセシビリティのため）
    const uniqueId = id || React.useId(); // React 18+ の useId を推奨

    return (
        <div>
            <label className="text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                id={uniqueId}
                name={name || label.toLowerCase().replace(/\s/g, '-')}
                value={value}
                onChange={onChange}
                placeholder={placeholder || `${label}`}
                required={required}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
            />
        </div>
    );
};

export default InputField;