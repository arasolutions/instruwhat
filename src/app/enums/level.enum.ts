export enum Level {
  EASY = <any>{ 'label': 'Facile', 'value': 10 },
  INTERMEDIATE = <any>{ 'label': 'Intermédiaire', 'value': 20 },
  EXPERT = <any>{ 'label': 'Expert', 'value': 30 }
}

export namespace Level {
  export function getAll() {
    return [this.EASY, this.INTERMEDIATE, this.EXPERT];
  }

  export function getByValue(value: number) {
    return this.getAll().find((element: any) => element.value === value);
  }
}
