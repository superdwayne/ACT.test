import { ClassValue } from 'clsx';

declare function cn(...inputs: ClassValue[]): string;
declare function formatDate(date: Date | string | number): string;
declare function formatCurrency(amount: number, currency?: string): string;
declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;

export { cn, debounce, formatCurrency, formatDate, throttle };
