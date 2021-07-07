import { Decorator } from "../..";

export class DecoratorUtils {
  /**
   * Get the list of the linked decorators
   *
   * A and B are two linked decorators
   *
   * @example
   * ```typescript
   * .@A()
   * .@B()
   * method() {}
   * ```
   *
   * @example
   * ```typescript
   * method(
   *    .@A()
   *    .@B()
   *    param: string
   * ) {}
   * ```
   *
   * @example
   * ```typescript
   * .@A()
   * .@B()
   * class X {}
   * ```
   *
   * @param a The decorator
   * @param list The list of linked decorators to a
   * @returns
   */
  static getLinkedObjects<Type extends Decorator>(a: Decorator, list: Type[]) {
    return list.filter((b) => {
      let cond = a.from === b.from && a.key === b.key;

      if (a.index !== undefined && b.index !== undefined) {
        cond &&= a.index === b.index;
      }

      return cond;
    });
  }

  static decorateAClass(method?: PropertyDescriptor) {
    return !method?.value;
  }
}
