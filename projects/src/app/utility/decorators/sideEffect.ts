export function sideEffectDecorator<T extends object>(method: keyof T & string): (target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {

  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {

    const originalMethod = descriptor.value;

    console.log('descriptor', target);

    descriptor.value = function (...args: string[]) {

      console.log('original method');
      const originalResult = originalMethod.call(this, ...args);

      console.log('original result', originalResult);

      if (typeof target[method] === 'function') {
        target[method].call(this);
      }

      return originalResult;
    }


    return descriptor;
  }

}
