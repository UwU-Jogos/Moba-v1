/// Handles mouse movement events and updates mouse position.
///
/// # Description
///
/// This module tracks the mouse position relative to the canvas element.
///
/// # Exports
///
/// * `mouseX` - The current X coordinate of the mouse
/// * `mouseY` - The current Y coordinate of the mouse
/// * `handle_mouse_move` - Function to update mouse coordinates on mouse move event

// Mouse position tracking
export let mouseX = 0;
export let mouseY = 0;

/// Updates the mouse position when the mouse moves over the canvas.
///
/// # Input
///
/// * `event` - The MouseEvent object containing information about the mouse movement
///
/// # Side effects
///
/// Updates the global mouseX and mouseY variables

export function handle_mouse_move(event: MouseEvent): void {
  if (event.target instanceof HTMLCanvasElement) {
    mouseX = event.clientX - event.target.offsetLeft;
    mouseY = event.clientY - event.target.offsetTop;
  }
}
