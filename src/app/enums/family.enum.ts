export enum Family {
  ALL = <any>{ 'id': 1, 'label': 'Tout', 'fulllabel': 'Tous les instruments' },
  BOIS = <any>{ 'id': 2, 'label': 'Bois', 'fulllabel': 'Bois' },
  CUIVRES = <any>{ 'id': 3, 'label': 'Cuivre', 'fulllabel': 'Cuivre' },
  PERCUSSIONS = <any>{ 'id': 4, 'label': 'Percussions', 'fulllabel': 'Percussions' },
  CORDES = <any>{ 'id': 5, 'label': 'Cordes', 'fulllabel': 'Cordes' }
}

export enum SubFamily {
  BOIS_BISEAU,
  BOIS_ANCHE_DOUBLE,
  BOIS_ANCHE_LIBRE,
  BOIS_ANCHE_SIMPLE,
  BOIS_AUTRE,
  PERCUSSIONS_NON_DETERMINE,
  PERCUSSIONS_DETERMINE,
  CORDES_FROTTEES,
  CORDES_PINCEES_DOIGTS,
  CORDES_PINCEES_CLAVIER,
  CORDES_FRAPPEES
}

export namespace Family {
  export function getAll() {
    return [this.ALL, this.BOIS, this.CUIVRES, this.PERCUSSIONS, this.CORDES];
  }

  export function getById(id: number) {
    return this.getAll().find((element: any) => element.id === id);
  }
}
