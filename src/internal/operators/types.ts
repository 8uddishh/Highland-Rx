import { Subscribable } from "../types";

export type Operator<T, R> = (stream:Highland.Stream<T>) => Highland.Stream<R>;

export interface Pipeable<T> {
  pipe<R>(first:Operator<any, any>, ...rest: Operator<any, any>[]): Subscribable<R>;
}