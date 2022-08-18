export interface IUser {
  id: number | null;
  avatarUrl: string;
  followers: number;
  following: number;
  location: string | null;
  name: string | null;
  login: string;
  publicRepos: number | null;
  email: string | null;
  createdAt: string;
  bio: string | null;
}
