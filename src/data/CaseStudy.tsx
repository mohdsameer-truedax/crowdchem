// src/data/caseStudiesData.ts (Create this new file)

export interface CaseStudyKeyed {
  index: number;
  id: string;
  // Use keys for all translatable fields
  titleKey: string;
  headingKey: string;
  subheadingKey: string;
  descriptionKey: string;
}
export interface CaseStudy {
  index: number;
  title: string;
  heading: string;
  subheading: string;
  description: string;
  id: string;
}

// The useStudies key is used to namespace the translations in the en.js file
export const caseStudiesData: CaseStudyKeyed[] = [
  {
    index: 1,
    id: "automotive",
    titleKey: "useStudies.automotive_title",
    headingKey: "useStudies.automotive_heading",
    subheadingKey: "useStudies.automotive_subheading",
    descriptionKey: "useStudies.automotive_description",
  },
  {
    index: 2,
    id: "advancedmaterials",
    titleKey: "useStudies.technology_title",
    headingKey: "useStudies.technology_heading",
    subheadingKey: "useStudies.technology_subheading",
    descriptionKey: "useStudies.technology_description",
  },
  {
    index: 3,
    id: "cosmetics",
    titleKey: "useStudies.healthcare_title",
    headingKey: "useStudies.healthcare_heading",
    subheadingKey: "useStudies.healthcare_subheading",
    descriptionKey: "useStudies.healthcare_description",
  },
];