import generatePdf from "./pdf.generator"; // Adjust the path to the file

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Read POST body
    const { htmlContent } = body;
    const isHaveTable = htmlContent.includes("<table");

    if (!htmlContent) {
      throw new Error("HTML content is required");
    }

    const pdfBuffer = await generatePdf(htmlContent, isHaveTable);

    // Return the PDF as a binary response
    return send(event, pdfBuffer, "application/pdf");
  } catch (error) {
    return { error: error.message };
  }
});
