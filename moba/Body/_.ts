import { Shape } from '../../base/Shape/_';
import { V2 } from '../../base/V2/_';
import { GameState } from '../GameState/_';

/// Represents a physical body in the game world.
///
/// # Description
///
/// A Body is an entity in the game that has a position, a hitbox for collision detection,
/// and methods for updating its state and drawing itself.
///
/// # Fields
///
/// * `id` - A unique identifier for the body
/// * `hitbox` - The Shape used for collision detection
/// * `pos` - The current position of the body in 2D space
/// * `tick` - A function that updates the game state based on this body's behavior
/// * `draw` - A function that renders this body on the canvas
export type Body = {
  id: string;
  hitbox: Shape;
  pos: V2;
  tick: (gs: GameState) => GameState;
  draw: (ctx: CanvasRenderingContext2D) => void;
};
