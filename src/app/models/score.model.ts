export class ScoreModel {

    private _id: number;

    private _name: string;

    private _score: number;

    private _date: Date;

    constructor(id: number, name: string, score: number) {
        this._id = id;
        this._name = name;
        this._score = score;
        this._date = new Date();
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}
