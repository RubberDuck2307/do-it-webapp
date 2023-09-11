export interface EventListShortGetDTO {
    id: number;
    name: string;
    color: string;
    amount: number;
}

export interface EventListCreateDTO {
    name: string;
    color: string;
}

export interface EventListDeleteDTO {
    ids : number[];
}