"use client";
import { AttractionCard } from "@/components/AttractionCard";
import Header from "@/components/Header";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "./_components/MapComponent";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="w-full flex h-[calc(100dvh-68px)]">
          <aside className="w-1/4 h-full overflow-y-auto p-4 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">What&apos;s Nearby</h2>
            {/* Lista de atrações */}
            {[
              {
                name: "Torre Eiffel",
                description:
                  "Icônica torre de ferro forjado no Champ de Mars, Paris.",
                imageUrl: "https://rseat.pics/",
              },
              {
                name: "Museu do Louvre",
                description:
                  "O maior museu de arte do mundo e um monumento histórico em Paris.",
                imageUrl: "https://rseat.pics/",
              },
            ].map((attraction, index) => (
              <AttractionCard key={index} {...attraction} />
            ))}
          </aside>

          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <MapComponent />
          </APIProvider>
        </section>
      </main>
    </>
  );
}
