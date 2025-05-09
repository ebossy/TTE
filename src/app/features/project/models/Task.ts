export class Task {
  id: string;
  title: string;
  status: boolean;
  assignedToId: string;
  description: string;
  projId: string;

  constructor(data: Partial<Task> = {}){
    this.id = data.id || "";
    this.title = data.title || "";
    this.status = data.status || false;
    this.assignedToId = data.assignedToId || "";
    this.description = data.description || "";
    this.projId = data.projId || "";
  }
}
