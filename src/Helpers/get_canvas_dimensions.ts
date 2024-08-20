/// Returns the dimensions of the canvas element.
///
/// # Exports
///
/// * `get_canvas_dimensions` - Function that retrieves the width and height of the canvas
///
/// # Returns
///
/// * An object with `width` and `height` properties representing the canvas dimensions

export function get_canvas_dimensions(): { width: number, height: number } {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  return { width: canvas.width, height: canvas.height };
}
