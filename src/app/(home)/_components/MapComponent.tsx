"use client";
import {
  AdvancedMarker,
  Map,
  MapMouseEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import axios from "axios";
import { useState } from "react";

export default function MapComponent() {
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; address: string | null }[]
  >([]);
  const [boundingBox, setBoundingBox] = useState<{
    northEast: { lat: number; lng: number };
    southWest: { lat: number; lng: number };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const map = useMap();

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!; // Substitua por sua chave
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);

      if (response.data.status === "OK") {
        const address =
          response.data.results[0]?.formatted_address ||
          "Endereço não encontrado.";
        return address;
      } else {
        throw new Error("Não foi possível obter o endereço.");
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      return "Erro ao buscar endereço.";
    }
  };

  const handleMapClick = async (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      const { lat, lng } = event.detail.latLng;
      setLoading(true);

      try {
        const address = await getAddressFromCoordinates(lat, lng);
        setMarkers([{ lat, lng, address }]);

        if (map) {
          const bounds = new google.maps.LatLngBounds();

          const latLng = new google.maps.LatLng(lat, lng);
          bounds.extend(latLng);

          const margin = 0.05; // A margem para expandir a área do bounding box
          bounds.extend(new google.maps.LatLng(lat + margin, lng + margin));
          bounds.extend(new google.maps.LatLng(lat - margin, lng - margin));

          const northEast = bounds.getNorthEast();
          const southWest = bounds.getSouthWest();

          setBoundingBox({
            northEast: { lat: northEast.lat(), lng: northEast.lng() },
            southWest: { lat: southWest.lat(), lng: southWest.lng() },
          });
        }
      } catch (err) {
        setError("Erro ao buscar o endereço. Tente novamente." + err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Map
        style={{ width: "100%", height: "100%" }}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID!}
        defaultCenter={{ lat: -23.55052, lng: -46.633308 }}
        defaultZoom={8}
        minZoom={4}
        disableDoubleClickZoom={true}
        gestureHandling={"greedy"}
        draggingCursor={"pointer"}
        draggableCursor={"pointer"}
        clickableIcons={false}
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            <div className="p-2 bg-white rounded-sm shadow-lg">
              <h3 className="font-bold text-gray-800">Local Selecionado</h3>
              <p>
                <strong>Lat:</strong> {marker.lat.toFixed(6)}
              </p>
              <p>
                <strong>Lng:</strong> {marker.lng.toFixed(6)}
              </p>
              <p>
                <strong>Endereço:</strong>{" "}
                {loading ? "Carregando..." : marker.address || "N/A"}
              </p>
            </div>
          </AdvancedMarker>
        ))}
      </Map>

      {boundingBox && (
        <div className="absolute top-4 left-4 p-4 bg-white shadow-md rounded-md">
          <h2 className="font-bold text-gray-800">Bounding Box:</h2>
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

      {error && (
        <div className="absolute bottom-4 left-4 p-4 bg-red-100 text-red-700 rounded-md shadow-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
