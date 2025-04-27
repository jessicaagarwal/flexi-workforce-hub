import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// API base URL from environment or default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Utility function to merge class names with Tailwind CSS
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to get the full URL for a file
 * @param {string} url - The file URL or path
 * @returns {string} The full URL for the file
 */
export function getFileUrl(url) {
  // If the URL is null, undefined, or empty, return an empty string
  if (!url) return '';
  
  // If the URL starts with http:// or https://, it's already a full URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If the URL starts with /uploads/, prepend the base URL without the /api prefix
  if (url.startsWith('/uploads/')) {
    // Extract the base URL without the /api suffix
    const baseUrl = API_URL.endsWith('/api') 
      ? API_URL.substring(0, API_URL.length - 4) 
      : API_URL.replace('/api', '');
    
    return `${baseUrl}${url}`;
  }
  
  // Otherwise, return the URL as-is
  return url;
}
