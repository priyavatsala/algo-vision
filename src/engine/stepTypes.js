/**
 * Shared vocabulary of step "types" that algorithms can emit.
 * Keeping this as one central file means every algorithm and every
 * renderer (Bar, GraphCanvas, TreeCanvas...) agrees on the same names —
 * no risk of one file saying 'swap' and another checking for 'SWAP'.
 */
export const STEP_TYPES = {
  COMPARE: 'compare',
  SWAP: 'swap',
  OVERWRITE: 'overwrite',
  SORTED: 'sorted',
};