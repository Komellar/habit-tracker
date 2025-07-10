const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const COOKIE_SESSION_KEY = 'session-id';
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;

export { COOKIE_SESSION_KEY, JWT_SECRET, SESSION_EXPIRATION_SECONDS };
