export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  website?: string;
  email: string;
  bio?: string;
  username: string;
  isModerator: boolean;
  avatar?: string;
  rooms: string[];
}
export interface Room {
  users: string[];
  messages?: string[];
  public: boolean;
  topic: string;
  description?: string;
  title: string;
  avatar?: string;
}
