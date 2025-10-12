import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Profile } from 'passport';
import { Request } from 'express';
import { userModel } from '../../models/userModel';


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },

    // Fixed annotation - ✅
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: any) => {
        try {
            // Check if user already exists
            let user = userModel.findByGithubId(profile.id);

            if (user) {
                // User exists, log them in
                return done(null, user);
            }

            // User doesn't exist, create new user
            const newUser = userModel.createGithubUser(profile);
            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
