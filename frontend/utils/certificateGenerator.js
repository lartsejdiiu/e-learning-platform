import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generates a modern-themed PDF certificate and triggers a download.
 *
 * @param {object} details - The details for the certificate.
 * @param {string} details.name - The full name of the recipient.
 * @param {string} details.courseTitle - The title of the course completed.
 * @param {string} details.date - The date the certificate was awarded.
 */
export async function generateCertificate({ name, courseTitle, date }) {
  console.log('--- Starting PDF Generation with Modern Geometric Theme ---');
  console.log('Name:', name, 'Course:', courseTitle, 'Date:', date);

  try {
    const pdfDoc = await PDFDocument.create();
    console.log('PDF Document created.');

    // A4 landscape dimensions (842 x 595 points)
    const pageWidth = 842;
    const pageHeight = 595;
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    console.log('Page added.');

    // --- Embed Fonts ---
    // Using a mix of serif and sans-serif for a classic but modern feel.
    const fontSerifRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSerifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontSerifItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    const fontSansRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    console.log('Fonts embedded.');

    // --- Define Colors (Unchanged as requested) ---
    const blue900 = rgb(0.12, 0.23, 0.44); // Dark Blue
    const blue600 = rgb(0.25, 0.44, 0.88); // Bright Blue
    const yellow500 = rgb(0.96, 0.76, 0.16); // Gold/Yellow
    const gray800 = rgb(0.25, 0.25, 0.25); // Dark Gray
    const gray100 = rgb(0.96, 0.96, 0.96); // Light Gray
    const gray400 = rgb(0.6, 0.6, 0.6);   // Medium Gray
    const gray600 = rgb(0.4, 0.4, 0.4);   // Darker Medium Gray
    const white = rgb(1, 1, 1);
    console.log('Colors defined.');

    // --- Background ---
    // A clean, two-tone background with a colored sidebar.
    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: gray100, // Light gray for the main area
    });

    // --- Left Sidebar ---
    // This dark blue sidebar creates a strong asymmetrical layout.
    const sidebarWidth = 240;
    page.drawRectangle({
      x: 0,
      y: 0,
      width: sidebarWidth,
      height: pageHeight,
      color: blue900,
    });
    console.log('Sidebar and background drawn.');
    
    // --- Decorative Geometric Elements ---
    // A subtle, large circle in the background adds a modern touch.
    page.drawCircle({
        x: sidebarWidth - 30,
        y: pageHeight / 2,
        size: 180,
        borderColor: yellow500,
        borderWidth: 1.5,
        opacity: 0.5,
        borderOpacity: 0.8,
    });
    console.log('Decorative elements drawn.');


    // --- Header Section (in Sidebar) ---
    const sidebarPadding = 30;
    page.drawText('ELA', {
        x: sidebarPadding,
        y: pageHeight - 60,
        font: fontSerifBold,
        size: 48,
        color: white,
    });
     page.drawText('ELITE LEARNING ACADEMY', {
        x: sidebarPadding,
        y: pageHeight - 90,
        font: fontSansRegular,
        size: 14,
        color: white,
        letterSpacing: 1,
    });
    console.log('Sidebar header drawn.');


    // --- Main Content Area ---
    const mainContentX = sidebarWidth + 60;
    const mainContentWidth = pageWidth - mainContentX - 60;

    // "Certificate of Completion"
    page.drawText('Certificate of Completion', {
      x: mainContentX,
      y: pageHeight - 120,
      font: fontSerifBold,
      size: 42,
      color: gray800,
    });
    
    // Decorative line
     page.drawLine({
        start: { x: mainContentX, y: pageHeight - 135 },
        end: { x: mainContentX + 150, y: pageHeight - 135 },
        thickness: 4,
        color: yellow500,
    });

    // "This certifies that"
    page.drawText('This certifies that', {
      x: mainContentX,
      y: pageHeight - 200,
      font: fontSansRegular,
      size: 18,
      color: gray600,
    });

    // Student Name
    page.drawText(name.toUpperCase(), {
      x: mainContentX,
      y: pageHeight - 260,
      font: fontSerifBold,
      size: 40,
      color: blue900,
    });

    // "has successfully completed"
    page.drawText('has successfully completed the course', {
      x: mainContentX,
      y: pageHeight - 310,
      font: fontSansRegular,
      size: 18,
      color: gray600,
    });

    // Course Title
    const courseTextWidth = fontSerifItalic.widthOfTextAtSize(`"${courseTitle}"`, 26);
    page.drawText(`"${courseTitle}"`, {
      x: mainContentX,
      y: pageHeight - 360,
      font: fontSerifItalic,
      size: 26,
      color: gray800,
    });
    console.log('Main text content drawn.');

    // --- Footer Section ---
    const footerY = 140;
    const signatureLineX = mainContentX + mainContentWidth - 250;

    // Date
    page.drawText('Date Awarded', {
        x: mainContentX,
        y: footerY,
        font: fontSansBold,
        size: 12,
        color: gray600,
    });
    page.drawLine({
        start: { x: mainContentX, y: footerY - 10 },
        end: { x: mainContentX + 200, y: footerY - 10 },
        thickness: 1,
        color: gray400,
    });
    page.drawText(date, {
        x: mainContentX,
        y: footerY - 35,
        font: fontSansRegular,
        size: 16,
        color: gray800,
    });

    // Signature
    page.drawText('Authorized Signature', {
        x: signatureLineX,
        y: footerY,
        font: fontSansBold,
        size: 12,
        color: gray600,
    });
    page.drawLine({
        start: { x: signatureLineX, y: footerY - 10 },
        end: { x: signatureLineX + 200, y: footerY - 10 },
        thickness: 1,
        color: gray400,
    });
    console.log('Footer and signature lines drawn.');

    // --- Certificate ID (in Sidebar) ---
    const certId = `ELA-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    page.drawText(`Certificate ID: ${certId}`, {
      x: sidebarPadding,
      y: 40,
      font: fontSansRegular,
      size: 9,
      color: gray400,
    });
    console.log('Certificate ID drawn.');

    // --- Generate PDF and Trigger Download ---
    const pdfBytes = await pdfDoc.save();
    console.log('PDF bytes saved.');

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(/\s+/g, '_')}_certificate_modern.pdf`;
    
    console.log('Download link created:', link.href);
    
    // Trigger the download automatically.
    link.click();
    console.log('Download initiated.');

    // Clean up the object URL.
    setTimeout(() => URL.revokeObjectURL(link.href), 100);

  } catch (error) {
    console.error('Error generating modern certificate:', error);
    // NOTE: An alert has been removed as per best practice.
    // Display this error in a UI element instead.
  }
}
