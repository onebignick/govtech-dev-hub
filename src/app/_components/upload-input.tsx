"use client";

import { Group, Input, Text, rem, Image } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { useUncontrolled } from "@mantine/hooks";

interface CustomInputProps {
  label: string;
  description?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  withAsterisk?: boolean;
  onChange?: (value: string) => void;
}

export function UploadInput({
  label,
  description,
  error,
  value,
  defaultValue = "",
  withAsterisk = false,
  onChange,
}: CustomInputProps) {
  const [_value, handleChange] = useUncontrolled<string>({
    value,
    defaultValue,
    onChange,
  });

  return (
    <Input.Wrapper
      withAsterisk={withAsterisk}
      label={label}
      description={description}
      error={error}
    >
      <Dropzone
        onDrop={(files) => {
          const file = files.find((f) => f);
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              handleChange(e.target!.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          {_value.length > 0 ? (
            <Image
              src={_value}
              alt="Test"
              width={100}
              height={_value ? 100 : 0}
            />
          ) : (
            <>
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </>
          )}
        </Group>
      </Dropzone>
    </Input.Wrapper>
  );
}
