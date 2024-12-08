chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getJobDetails") {
    const jobDetails = extractJobDetails();
    sendResponse({ jobDetails: jobDetails });
  }
});

function extractJobDetails() {
  // This is a basic example. You may need to adjust this based on the structure of the job posting websites you're targeting.
  const jobTitle = document.querySelector("h1")?.textContent || "";
  const jobDescription =
    document.querySelector(".job-description")?.textContent || "";
  return `Job Title: ${jobTitle}\n\nJob Description: ${jobDescription}`;
}
