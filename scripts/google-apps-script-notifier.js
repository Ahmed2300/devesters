/**
 * ============================================================
 * Devesters Email Notification Service — Google Apps Script
 * ============================================================
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete all existing code and paste this entire file
 * 4. Click "Deploy" → "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me" (your Google account)
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL
 * 10. Add it to your .env file as:
 *     GOOGLE_SCRIPT_NOTIFY_URL="https://script.google.com/macros/s/YOUR_ID/exec"
 *     GOOGLE_SCRIPT_SECRET="devesters-notify-2026"
 * 
 * NOTE: The first time you deploy, Google will ask you to authorize
 *       the script to send emails on your behalf. Click "Allow".
 * 
 * ============================================================
 */

// Secret key to prevent unauthorized access
var SECRET_KEY = "devesters-notify-2026";

/**
 * Handles POST requests from the Devesters Admin Panel.
 * Expects JSON body with:
 *   - secret: string (must match SECRET_KEY)
 *   - to: string (recipient email)
 *   - subject: string (email subject)
 *   - body: string (HTML email body)
 *   - memberName: string (optional, recipient name)
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Verify secret key
    if (data.secret !== SECRET_KEY) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var recipientEmail = data.to;
    var subject = data.subject;
    var htmlBody = data.body;
    var memberName = data.memberName || "";
    
    // Validate required fields
    if (!recipientEmail || !subject || !htmlBody) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Missing required fields: to, subject, body" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Build the premium HTML email template
    var fullHtml = buildEmailTemplate(subject, htmlBody, memberName);
    
    // Send the email
    MailApp.sendEmail({
      to: recipientEmail,
      subject: "🔴 Devesters | " + subject,
      htmlBody: fullHtml,
      name: "Devesters Team"
    });
    
    // Log for debugging
    Logger.log("Email sent to: " + recipientEmail + " | Subject: " + subject);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Email sent to " + recipientEmail }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing the deployment).
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "ok", 
      service: "Devesters Email Notification Service",
      version: "1.0",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Builds a premium dark-themed HTML email template.
 */
function buildEmailTemplate(subject, bodyContent, memberName) {
  var greeting = memberName ? ("Hey " + memberName + ",") : "Hey there,";
  
  return '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
      '<meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<style>' +
        'body { background-color: #050509; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }' +
      '</style>' +
    '</head>' +
    '<body style="margin:0;padding:0;background-color:#050509;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050509;padding:40px 20px;">' +
    '<tr><td align="center">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#111116;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden;box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-top: 3px solid #FF1C1C;">' +
    
    // Header
    '<tr><td>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.05);">' +
        '<tr>' +
          '<td align="left" style="vertical-align:middle;">' +
            '<table role="presentation" cellpadding="0" cellspacing="0">' +
              '<tr>' +
                '<td style="vertical-align:middle;padding-right:6px;">' +
                  '<img src="https://i.ibb.co/3Y0bCFgM/devesters-icon.png" alt="D" width="22" height="22" style="display:block;border-radius:3px;" />' +
                '</td>' +
                '<td style="vertical-align:middle;color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:-0.5px;line-height:22px;">' +
                  'EVesters' +
                '</td>' +
              '</tr>' +
            '</table>' +
          '</td>' +
          '<td align="right" style="vertical-align:middle;color:#71717a;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;">' +
            'Notification' +
          '</td>' +
        '</tr>' +
      '</table>' +
    '</td></tr>' +
    
    // Body Content
    '<tr><td style="padding:32px 32px 24px 32px;">' +
      '<p style="color:#a1a1aa;font-size:14px;margin:0 0 8px 0;font-weight:500;">' + greeting + '</p>' +
      '<h2 style="color:#ffffff;font-size:20px;margin:0 0 20px 0;font-weight:700;line-height:1.4;letter-spacing:-0.3px;">' + subject + '</h2>' +
      '<div style="color:#d4d4d8;font-size:14px;line-height:1.6;">' + bodyContent + '</div>' +
    '</td></tr>' +
    
    // Divider
    '<tr><td style="padding:0 32px;"><div style="border-top:1px solid rgba(255,255,255,0.05);"></div></td></tr>' +
    
    // Footer
    '<tr><td style="padding:20px 32px 24px 32px;">' +
      '<p style="color:#71717a;font-size:11px;margin:0;line-height:1.6;">' +
        'This email was sent automatically by the Devesters Admin Panel.<br>' +
        'If you believe this was sent in error, please contact the Team Lead.' +
      '</p>' +
    '</td></tr>' +
    
    '</table>' +
    '</td></tr></table>' +
    '</body></html>';
}
