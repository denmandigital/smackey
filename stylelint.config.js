export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // Keep existing rgba() / 0–1 alpha notation rather than enforcing modern color()
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    // Don't enforce a specific class-naming pattern
    'selector-class-pattern': null,
    // Relax whitespace rules that conflict with existing style
    'custom-property-empty-line-before': null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    // Existing cascade intentionally uses descending specificity in places
    'no-descending-specificity': null,
  },
}
