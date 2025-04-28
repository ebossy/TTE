export class Project{
  id: string;
  title: string;
  member: string[];

  constructor(data: Partial<Project> = {}){
    this.id = data.id || "";
    this.title = data.title || "";
    this.member = data.member || [];
  }
}
