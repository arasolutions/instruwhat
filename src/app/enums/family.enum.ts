export enum Family {
  ALL = <any>{ 'id': 1, 'directory': null, 'fulllabel': 'Tous les instruments' },
  BOIS = <any>{ 'id': 2, 'directory': 'bois', 'fulllabel': 'Bois' },
  CUIVRES = <any>{ 'id': 3, 'directory': 'cuivres', 'fulllabel': 'Cuivres' },
  PERCUSSIONS = <any>{ 'id': 4, 'directory': 'percussions', 'fulllabel': 'Percussions' },
  CORDES = <any>{ 'id': 5, 'directory': 'cordes', 'fulllabel': 'Cordes' },
  VENTS = <any>{ 'id': 6, 'directory': 'vents', 'fulllabel': 'Vents' },
  ELECTRONIQUES = <any>{ 'id': 7, 'directory': 'éléctroniques', 'fulllabel': 'Electroniques' }
}

export enum SubFamily {
  BOIS_BISEAU = <any>{ 'id': 1, 'directory': 'biseau' },
  BOIS_ANCHE_DOUBLE = <any>{ 'id': 2, 'directory': 'anche-double' },
  BOIS_ANCHE_LIBRE = <any>{ 'id': 3, 'directory': 'anche-libre' },
  BOIS_ANCHE_SIMPLE = <any>{ 'id': 4, 'directory': 'anche-simple' },
  BOIS_AUTRE = <any>{ 'id': 5, 'directory': 'autres' },
  PERCUSSIONS_NON_DETERMINE = <any>{ 'id': 6, 'directory': 'sons-indetermines' },
  PERCUSSIONS_DETERMINE = <any>{ 'id': 7, 'directory': 'sons-determines' },
  CORDES_FROTTEES = <any>{ 'id': 8, 'directory': 'cordes-frottees' },
  CORDES_PINCEES_DOIGTS = <any>{ 'id': 9, 'directory': 'cordes-pincees' },
  CORDES_PINCEES_CLAVIER = <any>{ 'id': 10, 'directory': 'cordes-pincees' },
  CORDES_FRAPPEES = <any>{ 'id': 11, 'directory': 'cordes-frappees' }
}

export namespace Family {
  export function getAll() {
    return [this.ALL, this.BOIS, this.CUIVRES, this.PERCUSSIONS, this.CORDES, this.VENTS];
  }

  export function getById(id: number) {
    return this.getAll().find((element: any) => element.id === id);
  }
}
