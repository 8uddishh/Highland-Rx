import H from "highland";
import { Operatable } from "../types";

class BufferCountOpr<T> implements Operatable<T, T[]> {
  _source: Highland.Stream<T>;
  _bufferSize: number;
  _startBufferEvery: number;
  constructor(source: Highland.Stream<T>, bufferSize: number, startBufferEvery?: number) {
    this._source = source;
    this._bufferSize = bufferSize;
    this._startBufferEvery = startBufferEvery;
  }

  stream$(): Highland.Stream<T[]> {
    if (this._startBufferEvery == null) {
      return this._source.batch(this._bufferSize);
    }
    let buffer: T[] = [];
    let first = true;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
      } else if (x === H.nil) {
        push(null, H.nil);
      } else {
        buffer.push(x as T);
        if (this._startBufferEvery < this._bufferSize) {
          if (buffer.length === this._bufferSize) {
            push(null, buffer);
            buffer = buffer.filter((_, idx) => idx >= this._startBufferEvery);
          }
        } else if (first) {
          if (buffer.length === this._bufferSize) {
            push(null, buffer);
            first = false;
          }
        } else {
          const altBuffer = buffer.filter((_, idx) => idx >= this._startBufferEvery);
          if (altBuffer.length === this._bufferSize) {
            push(null, altBuffer);
            buffer = buffer.filter((_, idx) => idx >= this._startBufferEvery);
          }
        }
        next();
      }
    });
  }
}

export function bufferCount<T> (bufferSize: number, startBufferEvery?: number):(stream:Highland.Stream<T>) => Highland.Stream<T[]> {
  return (stream:Highland.Stream<T>) => {
    const operator = new BufferCountOpr(stream, bufferSize, startBufferEvery);
    return operator.stream$();
  }
}