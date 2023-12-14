import CaptionDatabase from "@/components/CaptionDatabaseUI";

export default function CaptionDatabasePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-4/5">
        <h2 className="m-8">Caption Database UI</h2>
        <CaptionDatabase />
      </div>
    </main>
  )
}
