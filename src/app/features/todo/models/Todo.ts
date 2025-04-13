export class Todo{
  id: string;
  title: string;
  status: boolean;
  userId: string;
  description: string;

  constructor(data: Partial<Todo> = {}){
    this.id = data.id || "";
    this.title = data.title || "";
    this.status = data.status || false;
    this.userId = data.userId || "";
    this.description = data.description || "";
  }
}
