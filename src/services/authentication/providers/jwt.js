import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import config from '../../../config';
import User from '../../../models/user';

const jwtOptions = {
  secretOrKey: config.token.secret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ]),
  passReqToCallback: true,
};

export default function configureJwt(User) {
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      const user = await User.query().findById(payload.sub).first();
      if (!user) {
        return done(null, false, { message: 'This email is not registered.' });
      } else {
        return done(null, user);
      }
    }),
  );
}
