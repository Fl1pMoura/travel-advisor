import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface IAttractionCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export function AttractionCard({
  name,
  description,
  imageUrl,
}: IAttractionCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="relative w-full h-40">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
