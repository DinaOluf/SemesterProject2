export function splitStringToArray(oneStringTags) {
  if (oneStringTags) {
    const tagsArray = [];

    const splitTags = oneStringTags.split(",");
    splitTags.forEach((tag) => {
      tagsArray.push(tag.trim());
    });

    return tagsArray;
  }
}
