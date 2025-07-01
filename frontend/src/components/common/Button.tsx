// frontend/src/components/common/Button.tsx
import React from 'react';

// ボタンのプロパティを定義するインターフェース
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // ボタンに表示するテキストまたは要素
    children: React.ReactNode;
    /**
     * ボタンのスタイルタイプ
     * 'primary': 主要なアクション (例: ログイン、登録)
     * 'secondary': 二次的なアクション (例: キャンセル、戻る)
     * 'danger': 危険なアクション (例: 削除)
     * 'ghost': 背景透過
     */
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';

    // ボタンのサイズ
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    isLoading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * 汎用的なカスタムボタンコンポーネント
 * @param {ButtonProps} props - ボタンのプロパティ
 */
const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary', // デフォルトはprimary
    size = 'medium',    // デフォルトはmedium
    fullWidth = false,
    isLoading = false,
    onClick,
    className,
    disabled,
    ...rest             // その他の標準的なHTMLボタン属性
}) => {
    // Variantに基づいたスタイル
    const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out';
    let variantStyles = '';
    switch (variant) {
        case 'primary':
            variantStyles = 'bg-blue-500 hover:bg-blue-700 text-white';
            break;
        case 'secondary':
            variantStyles = 'bg-gray-300 hover:bg-gray-400 text-gray-800';
            break;
        case 'danger':
            variantStyles = 'bg-red-500 hover:bg-red-700 text-white';
            break;
        case 'ghost':
            variantStyles = 'bg-transparent hover:bg-gray-100 text-blue-500 hover:text-blue-700 border border-blue-500';
            break;
        default:
            variantStyles = 'bg-blue-500 hover:bg-blue-700 text-white';
    }

    // Sizeに基づいたスタイル
    let sizeStyles = '';
    switch (size) {
        case 'small':
            sizeStyles = 'py-1 px-3 text-sm';
            break;
        case 'medium':
            sizeStyles = 'py-2 px-4 text-base';
            break;
        case 'large':
            sizeStyles = 'py-3 px-6 text-lg';
            break;
        default:
            sizeStyles = 'py-2 px-4 text-base';
    }

    // fullWidthのスタイル
    const widthStyles = fullWidth ? 'w-full' : 'w-auto';

    // disabled状態のスタイル
    const disabledStyles = disabled || isLoading ? 'opacity-30 cursor-not-allowed' : '';

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${disabledStyles} ${className || ''}`}
            onClick={onClick}
            disabled={disabled || isLoading} // ローディング中もdisabledにする
            {...rest}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading... {/* ローディング中のテキスト */}
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;