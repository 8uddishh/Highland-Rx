export function pluckDeep(first: string, ...props: string[]): any {
  return (obj: any) => {
    if (props.length === 0) {
      return obj[first];
    }
    if (obj[first]) {
      if (props.length > 1) {
        const [ next, ...after ] = props;
        return pluckDeep(next, ...after)(obj[first]);
      }
      return pluckDeep(props[0])(obj[first]);
    }
    return obj[first];
  };
}