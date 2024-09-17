export interface IRoadMap {
  onRouteData: (
    distance: number,
    duration: number,
    villeDId: number | null,
    villeAId: number | null
  ) => void;
}
