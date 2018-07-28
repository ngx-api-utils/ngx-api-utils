import {Injectable} from '@angular/core';

export function localStorageFactory(): TokenStorage {
  return typeof localStorage !== 'undefined' ? localStorage : undefined;
}
/**
 * TokenStorage to use basically it is a subset of Storage (localStorage or sessionStorage)
 *
 * @default {{localStorage}}
 */
@Injectable({
  providedIn: 'root',
  useFactory: localStorageFactory
})
export abstract class TokenStorage implements Partial<Storage> {
  abstract getItem(key: string): string | null;
  abstract removeItem(key: string): void;
  abstract setItem(key: string, value: string): void;
}
