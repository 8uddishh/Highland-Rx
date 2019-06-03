class TakeOpr {
    constructor(source, count) {
        this._index = 0;
        this._source = source;
        this._count = count;
    }
    stream$() {
        return this._source.take(this._count);
    }
}
export function take(count) {
    return (stream) => {
        const operator = new TakeOpr(stream, count);
        return operator.stream$();
    };
}
