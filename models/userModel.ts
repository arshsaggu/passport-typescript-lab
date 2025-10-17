const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
];

const userModel = {

  // Fixed annotation - ✅
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null
  },
  // Fixed annotation - ✅
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByGithubId: (githubId: string) => {
    const user = database.find((user: any) => user.githubId === githubId);
    return user || null;
  },

  createGithubUser: (profile: any) => {
    const newUser = {
      id: database.length + 1,
      name: profile.displayName || profile.username,
      githubId: profile.id,
      email: profile.emails?.[0]?.value || null,
      password: null,
      role: "user",
    };
    database.push(newUser as any);
    return newUser;
  },

};

export { database, userModel };
