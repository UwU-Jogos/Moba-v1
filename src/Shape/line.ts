/// Creates a Line shape.
///
/// # Input
///
/// * `ini` - The initial point of the line (V2)
/// * `end` - The end point of the line (V2)
///
/// # Output
///
/// A Shape representing a line from ini to end

import { Shape } from './_';
import { V2 } from '../V2/_';

export function line(ini: V2, end: V2): Shape {
  return {
    type: 'line',
    ini: ini,
    end: end
  };
}
