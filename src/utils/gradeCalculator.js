/**
 * Calculates student Grade based on numeric score.
 * Rules:
 * 90 - 100: A
 * 80 - 89 : B
 * 70 - 79 : C
 * Below 70: D
 * 
 * @param {number} score 
 * @returns {string} Grade letter ('A', 'B', 'C', 'D')
 */
export const calculateGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'D';
};

/**
 * Returns color mapping for Grade Tag display
 */
export const getGradeColor = (grade) => {
  switch (grade) {
    case 'A':
      return 'purple';
    case 'B':
      return 'blue';
    case 'C':
      return 'orange';
    case 'D':
      return 'magenta';
    default:
      return 'default';
  }
};
