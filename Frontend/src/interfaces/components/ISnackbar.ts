export interface ISnackbar {
  snackOpen: boolean;
  message: string;
  onClose: () => void;
  severity: "success" | "error";
}
