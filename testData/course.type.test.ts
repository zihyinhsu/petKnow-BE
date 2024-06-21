type Subchapter = {
  title: string;
};

type Chapter = {
  title: string;
  subchapters: Subchapter[];
};

type courseHierarchyType = {
  tag: string[];
  title: string;
  chapters: Chapter[];
};

export { courseHierarchyType };
