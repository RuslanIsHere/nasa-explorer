export type Camera = {
  id: string;
  label: string;
  instruments: string[];
};

export type Rover = {
  id: "curiosity" | "perseverance";
  label: string;
  cameras: Camera[];
};

export const ROVERS: Rover[] = [
  {
    id: "curiosity",
    label: "Curiosity",
    cameras: [
      { id: "mast", label: "Mastcam", instruments: ["MAST_LEFT", "MAST_RIGHT"] },
      { id: "navigation", label: "Navigation", instruments: ["NAV_LEFT_B", "NAV_RIGHT_B"] },
      { id: "front-hazard", label: "Danger avant", instruments: ["FHAZ_LEFT_B", "FHAZ_RIGHT_B"] },
      { id: "rear-hazard", label: "Danger arrière", instruments: ["RHAZ_LEFT_B", "RHAZ_RIGHT_B"] },
      { id: "mahli", label: "MAHLI (bras)", instruments: ["MAHLI"] },
      { id: "chemcam", label: "ChemCam", instruments: ["CHEMCAM_RMI"] },
    ],
  },
  {
    id: "perseverance",
    label: "Perseverance",
    cameras: [
      { id: "mastcam-z", label: "Mastcam-Z", instruments: ["MCZ_LEFT", "MCZ_RIGHT"] },
      { id: "navigation", label: "Navigation", instruments: ["NAVCAM_LEFT", "NAVCAM_RIGHT"] },
      {
        id: "front-hazard",
        label: "Danger avant",
        instruments: [
          "FRONT_HAZCAM_LEFT_A",
          "FRONT_HAZCAM_RIGHT_A",
          "FRONT_HAZCAM_LEFT_B",
          "FRONT_HAZCAM_RIGHT_B",
        ],
      },
      { id: "rear-hazard", label: "Danger arrière", instruments: ["REAR_HAZCAM_LEFT", "REAR_HAZCAM_RIGHT"] },
      { id: "watson", label: "WATSON (bras)", instruments: ["SHERLOC_WATSON"] },
      { id: "supercam", label: "SuperCam", instruments: ["SUPERCAM_RMI"] },
      { id: "skycam", label: "SkyCam", instruments: ["SKYCAM"] },
    ],
  },
];

export function findRover(id: unknown): Rover {
  return ROVERS.find((rover) => rover.id === id) ?? ROVERS[0];
}

export function findCamera(rover: Rover, id: unknown): Camera | undefined {
  return rover.cameras.find((camera) => camera.id === id);
}

export function getCameraLabel(rover: Rover, instrument: string): string {
  const camera = rover.cameras.find(({ instruments }) => instruments.includes(instrument));
  return camera?.label ?? instrument.replaceAll("_", " ");
}
