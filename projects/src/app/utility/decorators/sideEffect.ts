export function sideEffectDecorator<T extends object>(method: keyof T & string): (target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {

  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: string[]) {

      const originalResult = originalMethod.call(this, ...args);

      if (typeof target[method] === 'function') {
        target[method].call(this);
      }

      return originalResult;
    }


    return descriptor;
  }

}
