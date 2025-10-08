import { Input } from "@/components/ui/input";

interface Props {
  publication: string;
  setPublication: (value: string) => void;
  disabled: boolean;
}

export default function PublicationInput({
  publication,
  setPublication,
  disabled,
}: Props) {
  return (
    <Input
      id="publication"
      placeholder={
        disabled
          ? "Disabled — remove the file to insert a link"
          : "Insert link here"
      }
      value={publication}
      onChange={(e) => setPublication(e.target.value)}
      className="border-2 border-plum rounded-lg focus-visible:border-plum focus-visible:ring-plum focus-visible:ring-[1px] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={disabled}
    />
  );
}
