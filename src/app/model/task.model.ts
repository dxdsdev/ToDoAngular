export interface TaskList{
    id:number;
    text:string;
    completed:boolean;
    editable?:boolean;

}

export enum Filter{
    all,
    pending,
    completed
}