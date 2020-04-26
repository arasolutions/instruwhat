export enum Family {
  ALL = <any>{ 'label': 'Tout' },
  BOIS = <any>{ 'label': 'Bois' },
  CUIVRES = <any>{ 'label': 'Cuivre' },
  PERCUSSIONS = <any>{ 'label': 'Percussions' },
  CORDES = <any>{ 'label': 'Cordes' }
}

export enum SubFamily {
  BOIS_BISEAU,
  BOIS_ANCHE_DOUBLE,
  BOIS_ANCHE_SIMPLE,
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
}
