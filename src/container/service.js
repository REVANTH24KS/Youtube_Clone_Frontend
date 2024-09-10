function Views({ views }) {
  // Format views
  let formattedViews = "";
  if (views >= 1000000) {
    formattedViews = (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    formattedViews = (views / 1000).toFixed(1) + "K";
  } else {
    formattedViews = views.toString();
  }
  return formattedViews;
}

function Days({ date }) {
  // Calculate days ago
  // Split the original date string into day, month, and year
  const [day, month, year] = date.split("/");

  const today = new Date();
  const creationDate = new Date(`${year}-${month}-${day}`);
  const differenceInTime = today.getTime() - creationDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else {
    return `${differenceInDays} days ago`;
  }
}

//Calculate words length
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
}

export { Views, Days, truncateText };
