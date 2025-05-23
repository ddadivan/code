
export function withSideEffect<T extends object>(sideEffectFn: () => void) {

  return function<ThisType extends T>(currentFn: (...args: any[]) => any) {

    return function (this: ThisType, ...args: unknown[]) {

      const result = currentFn.call(this, ...args);

      if (typeof sideEffectFn === 'function') {
        (sideEffectFn as () => void)();
      }

      return result;
    }
  }

}



// public curry = this.withSideEffect(this.saveListToStorage.bind(this))
// public selectAll = this.curry(function (this: any) {
//   if (this.checkedItem) {
//     this.listTask.forEach((item: ITodoItem) => item.checked = false);
//     return;
//   }
//   this.listTask.forEach((item: ITodoItem) => item.checked = true);
//   return;
// })

