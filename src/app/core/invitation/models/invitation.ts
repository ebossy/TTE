
export class Invitation{
  id: string;
  groupId: string;
  groupType: string;
  userId: string;
  message: string;


  constructor(data: Partial<Invitation> = {}){
    this.id = data.id || "";
    this.groupId = data.groupId || "";
    this.groupType = data.groupType || "";
    this.userId = data.userId || "";
    this.message = data.message || "";

  }
}
