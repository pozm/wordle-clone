export enum CharState {
    Active,
    Correct,
    WrongPos,
    Entered,
    None
}

export interface ICharState {
    char:string,
    state:CharState
}