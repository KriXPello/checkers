import { ObjectWithId } from '#interfaces';

/* Как Set, только для работы с объектами по id */

export class ReadonlyObjectSet<T extends ObjectWithId> {
  protected _elements: T[];
  public get elements() { return this._elements.slice(); }

  constructor(initialElements: T[]) {
    const elementsMap = initialElements.reduce((acc, curr) => {
      acc[curr.id] = curr;

      return acc;
    }, {} as Record<string, T>);
    const uniqueElements = Object.values(elementsMap);

    this._elements = uniqueElements;
  }

  public get length() { return this._elements.length; }

  public find(id: string): T | undefined {
    return this._elements.find(element => element.id === id);
  }

  public has(id: string): boolean {
    return !!this.find(id);
  }
}

export class ObjectSet<T extends ObjectWithId> extends ReadonlyObjectSet<T> {
  /**
   * Если элемент с таким id уже есть, ничего не произойдёт
   */
  public insert(obj: T): boolean {
    const alreadyExists = this.has(obj.id);
    if (alreadyExists) {
      return false;
    }

    this._elements.push(obj);

    return true;
  }

  public remove(id: string): T | null {
    const element = this.find(id);

    if (!element) {
      return null;
    }

    const elementIndex = this._elements.indexOf(element);

    const [removedElement] = this._elements.splice(elementIndex, 1);

    return removedElement;
  }
}
