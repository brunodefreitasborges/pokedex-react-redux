import { typeColors, typeIcons } from "./typesColors";

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

export function getBackgroundColor(type: string): string {
    return 'bg-' + typeColors[type];
}

export function getTypeIcon(type: string): string {
    return typeIcons[type];
}

export function getOffsetFromUrl(url: string): string {
    return url.substring(url.indexOf('?') + 1);
}