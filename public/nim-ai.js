// TODO: Place methods in shared file with nim implementation

/**
 * Get a random move for a certain Nim game state
 *
 * @param {Number} heap The size of the heap a move is being chosen for
 * @param {Array} moves The moves available
 *
 * @return {Array} List of two values. The first is the index of the heap chosen to play at, the second is the move played.
 */
//! THIS IS CURRENTLY UNTESTED
const get_random_move = (heaps, moves) => {
  for (let heap of heaps) {
    if (heap > moves.max()) {
      return [
        heaps.indexOf(heap),
        moves[Math.floor(Math.random() * moves.length)],
      ];
    }
  }
  heap = heaps.max();
  return [heaps.indexOf(heap), moves.min()];
};

/**
 * Returns a selection from the moves indicating what amount of objects the ai would like to take from which heap
 *
 * @param {Array} heaps A list of the sizes of each heap
 * @param {Array} moves A list of legal moves
 * @param {boolean} misere Whether the game is misere or not. If false, the game is won by taking the last item, otherwise by making the other person take the last item
 * @param {number} difficulty A value between 0.0 and 1.0, indicating what proportion of the time the method will return the perfect move.
 *
 * @returns {Array} List of two values. The first is the index of the heap chosen to play at, the second is the move played.
 */
//! THIS IS CURRENTLY UNTESTED
const get_move = (heaps, moves, misere = false, difficulty = 1.0) => {
  // Begin with random selection
  if (Math.random() >= difficulty) {
    return get_random_move(heaps, moves);
  }

  let active_heaps = moves.reduce((a, b) => (b > 1 ? a + 1 : a + 0), 0); // Determine how many playable heaps exist
  let endgame = active_heaps <= 1; // If there is only one (or less) playable heaps, behavior is different

  if (misere && endgame) {
    let remaining = heaps.reduce((x) => (x > 0 ? 1 : 0), 0);
    let max_heap = heaps.max();
    let max_index = heaps.indexOf(max_heap);
    let ideal_move = max_heap - (remaining % 2);

    if ((max_heap == 1 && remaining % 2 == 1) || !moves.includes(ideal_move)) {
      return get_random_move(heaps, moves); // Losing situation, no good move
    }

    return [max_index, ideal_move];
  } else {
    let nim_sum = moves.reduce((a, b) => a ^ b, 0); // Goal is to make nim_sum 0

    if (nim_sum == 0) {
      return get_random_move(heaps, moves); // Losing situation, no good move
    }
    
    for (let i = 0; i < heaps.length; i++) {
      target_size = heaps[i] ^ nim_sum;
      if (target_size < heap && moves.includes(heap - target_size)) {
        return [i, heap - target_size];
      }
    }
  }

  return get_random_move(heaps, moves); // No winning move was found
};
