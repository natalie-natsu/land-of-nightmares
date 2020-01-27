export const SKILLS = ['intellect', 'strength', 'agility', 'instinct', 'composure', 'charisma', 'influence'];
export const SKILLS_SHORTEN = ['INT', 'STR', 'AGI', 'STI', 'COMP', 'CHA', 'FLU'];

export const shortenSkill = (skill) => SKILLS_SHORTEN[SKILLS.indexOf(skill)];
