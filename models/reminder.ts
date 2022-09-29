export class Reminder {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public type: "reminder" | "todo",
    public complete: boolean,
    public date: Date
  ) {}
}
