"use client";
import Header from "@/components/Header";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="w-full flex h-[calc(100dvh-68px)]">
          <aside className="w-2/5 h-full bg-gray-500">
            <h1>Sidebar</h1>
          </aside>
          <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY!}>
            <Map
              style={{ width: "100%", height: "100%" }}
              mapId={process.env.GOOGLE_MAPS_MAP_ID!}
              defaultCenter={{ lat: 22.54992, lng: 0 }}
              defaultZoom={10}
              minZoom={4}
              disableDoubleClickZoom={true}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              <AdvancedMarker position={{ lat: 29.5, lng: -81.2 }}>
                <div className="p-2 bg-white rounded-lg ">
                  <h3 className="font-bold">Teste</h3>
                  <p>Endereco</p>
                  <Image
                    src="https://rseat.pics/"
                    className="my-2"
                    alt="Imagem"
                    width={100}
                    height={100}
                  />
                  <p>Avaliação: 5 ⭐</p>
                </div>
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </section>
      </main>
    </>
  );
}
