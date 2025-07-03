// 日付をYYYY-MM-DD形式の文字列にフォーマットする関数
export function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()は0から始まるため+1し、2桁にパディング
    const day = date.getDate().toString().padStart(2, '0'); // 2桁にパディング
    return `${year}-${month}-${day}`;
}
