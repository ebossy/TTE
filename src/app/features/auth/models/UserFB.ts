export class UserFB {
  id: string;
  name: string;
  email: string;

  constructor(data: Partial<UserFB> = {}){
    this.id = data.id || "";
    this.name = data.name || "";
    this.email = data.email || "";
  }
}
