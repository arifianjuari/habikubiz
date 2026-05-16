export interface ParentProfile {
  id: string;
  fullName: string;
  email: string;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  birthYear: number;
  pin: string;
}

export interface Business {
  id: string;
  childId: string;
  name: string;
  type: "simulasi" | "nyata";
  category: string;
  description: string;
  initialCapital: number;
}
