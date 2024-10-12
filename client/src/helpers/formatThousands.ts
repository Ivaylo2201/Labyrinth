export default function formatThousands(price: number): string {
    return price.toLocaleString('en-US');
}