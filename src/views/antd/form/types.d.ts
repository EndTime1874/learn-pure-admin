export interface FormItem {
  type: string;
  sort: number;
  defaultHide?: Boolean;

  colConfig?: any;
  formItemConfig: FormItemConfig;
  compConfig?: CompConfig;
  slot?: any;
}

export interface FormItemConfig {
  name: string;
  label?: string;

  [props: string]: any;
}

export interface CompConfig {
  [props: string]: any;
}
