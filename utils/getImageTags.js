const getImageTags = async (url) => {
  url = url.replace(/data:image\/(jpeg|png);base64,/, "");
  /* ^ extract prefix to get base64 */

  /* fetch the data */
  const response = await fetch(`/api/tags`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      base64: url,
    }),
  });
  const tags = await response.json();
  return tags;
};

export default getImageTags;
