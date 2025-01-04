"use client";
import {
  AdvancedMarker,
  Map,
  MapMouseEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function MapComponent() {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [boundingBox, setBoundingBox] = useState<{
    northEast: { lat: number; lng: number };
    southWest: { lat: number; lng: number };
  } | null>(null);

  const map = useMap(); // Obtém a referência do mapa

  const handleMapClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      const { lat, lng } = event.detail.latLng;

      setMarkers([{ lat, lng }]); // Atualiza o marcador no local do clique

      // Calculando o bounding box ao redor do clique
      if (map) {
        const bounds = new google.maps.LatLngBounds();

        // Adicionando o marcador ao bounds
        const latLng = new google.maps.LatLng(lat, lng);
        bounds.extend(latLng);

        // Definindo uma margem (ajuste conforme necessário)
        const margin = 0.05; // A margem para expandir a área do bounding box
        bounds.extend(new google.maps.LatLng(lat + margin, lng + margin));
        bounds.extend(new google.maps.LatLng(lat - margin, lng - margin));

        // Obtendo as coordenadas do bounding box
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();

        // Atualizando o estado do bounding box
        setBoundingBox({
          northEast: { lat: northEast.lat(), lng: northEast.lng() },
          southWest: { lat: southWest.lat(), lng: southWest.lng() },
        });
      }
    }
  };

  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID!}
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={10}
      minZoom={4}
      disableDoubleClickZoom={true}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      onClick={handleMapClick} // Adiciona o evento de clique
    >
      {/* Exibe os marcadores criados */}
      {markers.map((marker, index) => (
        <AdvancedMarker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
        >
          <div className="p-2 bg-white rounded-sm">
            <h3 className="font-bold">Novo Local</h3>
            <p>Lat: {marker.lat.toFixed(6)}</p>
            <p>Lng: {marker.lng.toFixed(6)}</p>
          </div>
        </AdvancedMarker>
      ))}

      {/* Exibe o boundingBox no console ou na UI */}
      {boundingBox && (
        <div className="p-4">
          <h2 className="font-bold">Bounding Box:</h2>
          <p>
            <strong>NorthEast:</strong> Lat: {boundingBox.northEast.lat}, Lng:{" "}
            {boundingBox.northEast.lng}
          </p>
          <p>
            <strong>SouthWest:</strong> Lat: {boundingBox.southWest.lat}, Lng:{" "}
            {boundingBox.southWest.lng}
          </p>
        </div>
      )}
    </Map>
  );
}
