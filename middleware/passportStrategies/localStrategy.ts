import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);
      return done(null, user || false);
    } catch (error: any) {
      // Handle specific error messages
      return done(null, false, { message: error.message });
    }
  }
);

// Fixed annotation - ✅ (Partially)
passport.serializeUser(function (user: any, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

// Fixed annotation - ✅
passport.deserializeUser(function (id: number, done: (err: any, user?: any | false) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
