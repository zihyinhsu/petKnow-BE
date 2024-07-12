export const CASBIN_ENFORCER = 'casbin_enforcer';

export interface RegisterOptions {
  modelPath: string;
  policyAdapter: any;
  global?: boolean;
}

export enum AuthAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
}
