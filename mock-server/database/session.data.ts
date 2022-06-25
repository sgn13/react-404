export type SessionType = { email: string; access: string; refresh: string };
export type SessionsType = SessionType[];
const sessions: SessionsType = [];
export default sessions;
