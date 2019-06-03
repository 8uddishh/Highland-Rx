import H from "highland";
class MapOpr {
    constructor(source, selector) {
        this._source = source;
        this._selector = selector;
    }
    stream$() {
        let index = 0;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                // next();
            }
            else if (x === H.nil) {
                push(null, H.nil);
            }
            else {
                push(null, this._selector(x, index));
                index++;
                next();
            }
        });
    }
}
export function map(project) {
    return (stream) => {
        const operator = new MapOpr(stream, project);
        return operator.stream$();
    };
}
