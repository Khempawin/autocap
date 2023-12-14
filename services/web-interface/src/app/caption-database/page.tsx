import CaptionDatabase from "@/components/CaptionDatabaseUI";

export default function CaptionDatabasePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-1 min-w-0 w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-4xl font-bold mb-8">Caption Database UI</h1>
        <CaptionDatabase />
      </div>
    </main>
  )
}
