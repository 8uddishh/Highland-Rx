import H from 'highland';
import { Observable } from '../Observable';

export function bindCallback<T>(callbackFunc:Function): (...args: any[]) => Observable<T>{
  return (...args: any[]) => new Observable<T>(H.wrapCallback(callbackFunc)(args));
}