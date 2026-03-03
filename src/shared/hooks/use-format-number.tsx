
export function useFormatNumber() {
    function formatNum(num: number) {
        return Number(num).toLocaleString('ru-RU');
    }
    return formatNum
}