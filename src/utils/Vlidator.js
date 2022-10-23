export const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    language,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
  } = movieInfo;

  if (!title.trim()) return { error: "Title is missing!" };
  if (!storyLine.trim()) return { error: "StoryLine is missing!" };
  if (!language.trim()) return { error: "Language is missing!" };
  if (!releaseDate.trim()) return { error: "ReleaseDate is missing!" };
  if (!status.trim()) return { error: "Status is missing!" };
  if (!type.trim()) return { error: "Type is missing!" };
  // checking genres is array or not and it's field with string value
  if (!genres.length) return { error: "Genres are missing!" };
  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres!" };
  }
  // checking tags is array or not and it's field with string value
  if (!tags.length) return { error: "Tags are missing!" };
  for (let gen of tags) {
    if (!gen.trim()) return { error: "Invalid tags!" };
  }
  // checking cast is array or not and it's field with string value
  if (!cast.length) return { error: "Cast and crew are missing!" };
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid cast!" };
  }

  return { error: null };
};
