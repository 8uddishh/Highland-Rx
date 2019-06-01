import H from "highland";
class BufferCountOpr {
    constructor(source, bufferSize, startBufferEvery) {
        this._source = source;
        this._bufferSize = bufferSize;
        this._startBufferEvery = startBufferEvery;
    }
    stream$() {
        if (this._startBufferEvery == null) {
            return this._source.batch(this._bufferSize);
        }
        let buffer = [];
        let first = true;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
            }
            else if (x === H.nil) {
                push(null, H.nil);
            }
            else {
                buffer.push(x);
                if (this._startBufferEvery < this._bufferSize) {
                    if (buffer.length === this._bufferSize) {
                        push(null, buffer);
                        buffer = buffer.filter((_, idx) => idx >= this._startBufferEvery);
                    }
                }
                else if (first) {
                    if (buffer.length === this._bufferSize) {
                        push(null, buffer);
                        first = false;
                    }
                }
                else {
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
export function bufferCount(bufferSize, startBufferEvery) {
    return (stream) => {
        const operator = new BufferCountOpr(stream, bufferSize, startBufferEvery);
        return operator.stream$();
    };
}
