export interface IFormRowProps {
  type: string;
  name: string;
  labelText: string;
  defaultValue: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
