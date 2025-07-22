import DatabaseTabs from "@/components/layout/tabs"

export default async function DatabaseLayout({ children, params }: { children: React.ReactNode, params: Promise<{ database: string }> }) {
  const { database } = await params;

  return (
    <>
      <h2 className="text-xl font-semibold mb-5">Exploring {database}</h2>
      <DatabaseTabs database={database} />
      <div className="py-10 h-full">
          { children }
      </div>
    </>
  )
}