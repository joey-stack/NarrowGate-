import { redirect } from "next/navigation";

export function generateStaticParams() {
  const locales = ["en", "it"];
  const slugs = [
    "counseling",
    "visitation",
    "child-dedication",
    "families",
    "testimonies",
    "love-feast",
    "cultural-sunday"
  ];

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function GetInvolvedSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/get-involved`);
}
