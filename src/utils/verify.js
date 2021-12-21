import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

const verifyJwt = jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-9amaefax.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'snapshelter API',
  issuer: 'https://dev-9amaefax.us.auth0.com/',
  algorithms: ['RS256'],
}); //.unless({path: ['/']}) can be used to define paths for which the verification of jwt token is not required

export default verifyJwt;
