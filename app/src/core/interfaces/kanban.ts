export interface BaseKanban {
  _id?: string;
  name: string;
  description?: string;
}

export interface GetKanban extends BaseKanban {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostKanban extends BaseKanban {
  password: string;
}
