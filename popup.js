document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generateBtn");
  const coverLetterDiv = document.getElementById("coverLetter");

  generateBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getJobDetails" },
        function (response) {
          if (response && response.jobDetails) {
            generateCoverLetter(response.jobDetails);
          } else {
            coverLetterDiv.textContent =
              "Unable to extract job details. Please make sure you're on a job posting page.";
          }
        }
      );
    });
  });

  async function generateCoverLetter(jobDetails) {
    const API_KEY = ""; // Replace with your actual Gemini API key
    const API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    const prompt = `Generate a professional cover letter for the following job posting:
    
    ${jobDetails}
    
    The cover letter should be tailored to the job requirements and highlight relevant skills and experiences.`;

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      coverLetterDiv.textContent = generatedText;
    } catch (error) {
      console.error("Error:", error);
      coverLetterDiv.textContent =
        "An error occurred while generating the cover letter. Please try again.";
    }
  }
});
