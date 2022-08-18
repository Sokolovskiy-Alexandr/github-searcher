import dayjs from "dayjs";

export const formatUserData = (data: any) => {
  const {
    id,
    avatar_url: avatarUrl,
    followers,
    following,
    location,
    name,
    login,
    public_repos: publicRepos,
    email,
    bio,
  } = data.data;

  let { created_at: createdAt } = data.data;
  createdAt = dayjs(createdAt).format("DD.MM.YYYY");

  return {
    id,
    avatarUrl,
    followers,
    following,
    location,
    name,
    login,
    publicRepos,
    email,
    createdAt,
    bio,
  };
};

export const formatRepoData = (data: any) => {
  return data.data.map((r: any) => ({
    id: r.id,
    name: r.name,
    htmlUrl: r.html_url,
    forks: r.forks,
    stargazersCount: r.stargazers_count,
  }));
};
