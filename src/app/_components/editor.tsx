import {
  RichTextEditor,
  Link,
  type RichTextEditorProps,
} from "@mantine/tiptap";
import { type Content, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Input } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import MDEditor from "@uiw/react-md-editor";

interface CustomInputProps {
  withAsterisk?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  error?: string;
}

// ✅ CustomInput supports both controlled and uncontrolled modes
export function Editor({
  value,
  defaultValue,
  onChange,
  label,
  description,
  error,
  withAsterisk = false,
  ...others
}: CustomInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "Final",
    onChange,
  });

  return (
    <Input.Wrapper
      withAsterisk={withAsterisk}
      label={label}
      description={description}
      error={error}
      {...others}
    >
      <MDEditor
        value={_value}
        onChange={(value) => handleChange(value ?? "")}
        height="50vh"
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </Input.Wrapper>
  );
}
