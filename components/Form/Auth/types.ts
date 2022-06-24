export type AuthFormContainerType = { overlay?: JSX.Element; form?: JSX.Element };
export type AuthFormType = {
  formTitle: string;
  elements: { email?: boolean; password?: boolean; confirmPassword?: boolean; username?: boolean };
  buttonName?: any;
  actions?: { name: string; action: any }[];
  onSubmit: any;
};
