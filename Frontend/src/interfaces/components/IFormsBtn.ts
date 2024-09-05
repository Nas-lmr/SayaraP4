export interface IFormsBtn {
  label: string;
  onclick: () => void;
  type?: "button" | "submit" | "reset";
}
