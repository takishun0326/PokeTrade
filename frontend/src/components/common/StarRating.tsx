import React from 'react';
import { Star } from "lucide-react";


interface StarRatingProps {
    rating: number; // 0 ~ 5
    // starSize?: string; // Tailwindのサイズクラス(w-4, h-4, size-5)
    maxStars?: number; // 星の最大数 5
    starSize?: number;
    fullStarColor?: string; // 塗りつぶされる星の色 (Tailwindクラス)
    emptyStarColor?: string; // 空の星の色 (Tailwindクラス)
    outlineStarColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxStars = 5,
    starSize = 32,
    fullStarColor = 'orange',
    emptyStarColor = 'white',
    outlineStarColor = 'black',
}) => {

    const starPercents = []
    for (let i = 1; i <= maxStars; i++) {
        // 小数点以下の計算で桁落ち？を防ぐ
        const rate = rating * 100;
        const starValue = i * 100;

        if (rate >= starValue) {
            // 完全に塗りつぶす星
            starPercents.push(100);
        } else if (rate - starValue < 100) {
            // n%塗りつぶす星
            starPercents.push(Math.max(rate - (starValue - 100), 0));
        }
    }

    return (
        <>
            <ul className="flex gap-2">
                {starPercents.map((percent, idx) => (
                    <li key={idx}>
                        {/* 星の定義 */}
                        <svg style={{ width: 0, height: 0 }} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${starSize} ${starSize}`}>
                            <defs>
                                <mask id={`mask${idx}`}>
                                    <rect x="0" y="0" width={starSize} height={starSize} fill="white" />
                                    {/* ここではx="50%"で半分を隠すマスクを作成 */}
                                    <rect x={`${percent}%`} y="0" width={starSize} height={starSize} fill="black" /> {/* fill="black"でマスクを適用する部分 */}
                                </mask>
                                {/* Corrected viewBox: use curly braces for the entire expression, and then backticks inside for string interpolation */}
                                <symbol id="sample" viewBox={`0 0 ${starSize} ${starSize}`}>
                                    <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
                                </symbol>
                            </defs>
                        </svg>


                        <div className="flex items-center space-x-2 my-4">
                            <svg className="w-8 h-8 star" viewBox={`0 0 ${starSize} ${starSize}`}>
                                {/* mask 属性内の url() はそのまま */}
                                <use xlinkHref="#sample" mask={`url(#mask${idx})`} fill={fullStarColor}></use> {/* マスクされた部分のfill色を追加 */}
                                <use xlinkHref="#sample" fill="none" stroke={outlineStarColor}></use> {/* アウトラインの星を重ねる */}
                            </svg>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default StarRating;