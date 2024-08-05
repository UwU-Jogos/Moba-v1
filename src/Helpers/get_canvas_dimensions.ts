
export function get_canvas_dimensions(): { width: number, height: number } {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  return { width: canvas.width, height: canvas.height };
}
