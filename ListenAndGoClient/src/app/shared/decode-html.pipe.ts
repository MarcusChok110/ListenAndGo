import { Pipe, PipeTransform } from '@angular/core';

/**
 * Decodes HTML entities in string
 * Usage:
 *  value | decodeHTML
 * Example:
 *  {{ "Let&#39;s" | decodeHTML }}
 *  formats to: "Let's"
 */
@Pipe({
  name: 'decodeHTML',
})
export class DecodeHTMLPipe implements PipeTransform {
  transform(value: string): string {
    const tempElement = document.createElement('textarea');
    tempElement.innerHTML = value;
    return tempElement.value;
  }
}
