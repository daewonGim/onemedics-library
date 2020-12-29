export type Storage = {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
};

export type JoinFormData = {
  username: string;
  loginId: string;
  phone: string;
  password: string;
  authNum: string;
  authNumId: string;
  marketingAgreement: boolean;
};
