class ObserveOpr {
    constructor(source) {
        this._source = source;
    }
    stream$() {
        let index = 0;
        return this._source.observe();
    }
}
export function observe() {
    return (stream) => {
        const operator = new ObserveOpr(stream);
        return operator.stream$();
    };
}
