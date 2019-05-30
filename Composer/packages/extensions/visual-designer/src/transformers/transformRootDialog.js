import { ObiTypes } from '../shared/ObiTypes';

import { IndexedNode } from './models/IndexedNode';
import { normalizeObiStep } from './helpers/elementBuilder';

/**
 *      Recognizer    Rules     Steps
 *          |
 *       Events
 *          |
 *      ---------
 *      |intent1|
 *      |intent2|
 *      |intent3|
 *      |   +   |
 *      ---------
 */
function transformSimpleDialog(input) {
  if (!input) return {};

  const rules = input.rules || [];
  const steps = input.steps || [];

  const result = {};
  if (rules.length) {
    result.ruleGroup = new IndexedNode('$.rules', {
      $type: ObiTypes.RuleGroup,
      children: rules.map((x, index) => new IndexedNode(`$.rules[${index}]`, x)),
    });
  }

  result.stepGroup = new IndexedNode('$.steps', {
    $type: ObiTypes.StepGroup,
    children: steps.map((x, index) => new IndexedNode(`$.steps[${index}]`, normalizeObiStep(x))),
  });
  return result;
}

export function transformRootDialog(input) {
  if (!input) return {};
  return transformSimpleDialog(input);
}