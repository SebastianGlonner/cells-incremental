const enabled = false;

function traceMethodCalls(obj: any, className: string, propertyName: string) {
    const handler = {
        get(target: any, propKey: any, receiver: any) {
            const targetValue = Reflect.get(target, propKey, receiver);
            if (typeof targetValue === 'function') {
                return function (...args: any[]) {
                    console.log('CALL', className, propKey, args);
                    return targetValue.apply(obj, args); // (A)
                }
            } else {
                return targetValue;
            }
        },
        apply: function (target: any, thisArg: any, argumentsList: any[]) {        
            console.log('CALL', className, propertyName, argumentsList);
            return target.apply(thisArg, argumentsList);
          },
    };
    return new Proxy(obj, handler);    
}

export default function createTracingProxy<T extends Class, K extends keyof T>(obj: T, properties: K[]): T {  
    if (!enabled) {
        return obj;
    }
    const className = obj.constructor.name;
    properties.forEach(name => {
        obj[name] = traceMethodCalls(obj[name], className, name?.toString());
    });

    return obj;
}
