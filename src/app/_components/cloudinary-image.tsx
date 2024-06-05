"use client";

import { Image } from "@mantine/core";
import { type Image as CloudinaryImage } from "@prisma/client";

export function CloudinaryImage({
  image,
  alt,
}: {
  image: CloudinaryImage;
  alt: string;
}) {
  const { version, publicId, format } = image;
  const url = `http://res.cloudinary.com/ds6exncwx/image/upload/v${version}/${publicId}.${format}`;

  return <Image src={url} alt={alt} />;
}
