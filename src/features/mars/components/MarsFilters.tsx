"use client";

import Form from "next/form";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { findRover, ROVERS, type Rover } from "../rovers";

type MarsFiltersProps = {
  roverId: Rover["id"];
  cameraId?: string;
  sol: number;
};

const FIELD_STYLES = "mt-1 h-10 w-full rounded-md border border-line bg-surface px-3";

export function MarsFilters({ roverId, cameraId, sol }: MarsFiltersProps) {
  const [selectedRover, setSelectedRover] = useState(roverId);
  const [selectedSol, setSelectedSol] = useState(String(sol));

  // Each rover has its own cameras and sol range, so changing rover resets both.
  function handleRoverChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedRover(findRover(event.target.value).id);
    setSelectedSol("");
  }

  return (
    <Form
      action="/mars"
      className="mb-8 grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
    >
      <label className="block text-sm text-muted">
        Rover
        <select
          name="rover"
          value={selectedRover}
          onChange={handleRoverChange}
          className={`${FIELD_STYLES} text-star`}
        >
          {ROVERS.map((rover) => (
            <option key={rover.id} value={rover.id}>
              {rover.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-muted">
        Caméra
        <select
          key={selectedRover}
          name="camera"
          defaultValue={selectedRover === roverId ? cameraId : ""}
          className={`${FIELD_STYLES} text-star`}
        >
          <option value="">Toutes les caméras</option>
          {findRover(selectedRover).cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-muted">
        Sol
        <input
          name="sol"
          type="number"
          min="0"
          placeholder="Dernier sol"
          value={selectedSol}
          onChange={(event) => setSelectedSol(event.target.value)}
          className={`${FIELD_STYLES} text-star`}
        />
      </label>

      <Button type="submit">Afficher</Button>
    </Form>
  );
}
