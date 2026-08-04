import { NewsFormPage } from "@/components/dashboard/news/NewsFormPage";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NewsFormPage newsId={id} />;
}
