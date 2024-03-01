function blogQuiz() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var bodyText, resultsSheet, merge_field_subject, resRow=0, resColumn=0; //Variable by Paul
  var last, height, sheet, sheet2, lock, Avals, looper, resCol, values, doc, htm, mail_text, row_data, counter = 0,
      score, pdfContent,  
      blob, pdf, fileTail, fileName, file, recipient, EMAIL_SUBJECT, EMAIL_BODY, column = 6,
      final_doc_docid, final_doc, final_doc_body, docblob, PDFfile; 
  sheet = ss.getSheets()[2];
  lock = sheet.getRange(2, 2, 1, 1).getValue();
  
  if (lock === 1)
    return;
  else
    sheet.getRange(2, 2, 1, 1).setValue(1);
  
  last = sheet.getRange(1, 2, 1, 1).getValue();
  sheet2 = ss.getSheets()[1];
  
  Avals = sheet2.getRange("A1:A").getValues().filter(String).length;  
  resCol = 7; // number of columns in result
  
  var subject, subject_text;
  
  resultsSheet = ss.getSheets()[3];
  
  looper = last + 1;
  while(looper <= Avals){
    try{
    // for (looper = last + 1; looper <= Avals; looper++) {
    final_doc_docid = DriveApp.getFileById("1Rolop2C4Mh73g7W1QpHgBQTaH71u1KmggXRjG7uI9nc").makeCopy().getId(); //Quiz Template File ID
    final_doc = DocumentApp.openById(final_doc_docid);
    var d = new Date();
    var timeStamp = d.getTime();
    final_doc.setName("Quiz Report"+timeStamp);
    final_doc_body = final_doc.getActiveSection();
    
    values = sheet2.getRange(looper, 1, 1, resCol).getValues();
    row_data = values[0];
    
    merge_field_subject = 0;
    counter = 0;
    for (i = 2; i < column; i++) {
      //Logger.log('Column:' + column + ' current:' + i);                 
      
      score = Math.round(row_data[i]); 
      resRow = i;
      subject = "%SUB" + merge_field_subject + "-SCORE%";
      //Logger.log('Score '+score);
      
      if (score <= 33) {
        resColumn = 2;            
        final_doc_body.replaceText(subject, score);      
       // Logger.log('Subject : '+subject);  
        bodyText = resultsSheet.getRange(resRow, resColumn, 1, 1).getValue();
        //Logger.log('Body text: '+bodyText);
        subject_text = "%SUB" + merge_field_subject + "-TEXT" + 0 + "%";                
       // Logger.log('Subject_Text : '+subject_text);
        final_doc_body.replaceText(subject_text, bodyText);
        
      } else if (score <= 66) {              
        resColumn = 3;            
        final_doc_body.replaceText(subject, score);
        //Logger.log('Subject : '+subject);            
        bodyText = resultsSheet.getRange(resRow, resColumn, 1, 1).getValue();
        //Logger.log('Body text: '+bodyText);
        subject_text = "%SUB" + merge_field_subject + "-TEXT" + 0 + "%";                
        //Logger.log('Subject_Text : '+subject_text);  
        final_doc_body.replaceText(subject_text, bodyText);
        
      } else if (score <= 100) {
        resColumn = 4;            
        final_doc_body.replaceText(subject, score);   
        //Logger.log('Subject : '+subject);  
        bodyText = resultsSheet.getRange(resRow, resColumn, 1, 1).getValue();
        //Logger.log('Body text: '+bodyText);
        subject_text = "%SUB" + merge_field_subject + "-TEXT" + 0 + "%";                
        //Logger.log('Subject_Text : '+subject_text);
        final_doc_body.replaceText(subject_text, bodyText);
        
      } else {
        
      }
      
      merge_field_subject += 1;
      //Logger.log('Merge Field Subject: '+merge_field_subject);
    }
    
    
    // Logger.log("b4");
    
    
    
    
    final_doc.saveAndClose();
    final_doc = DocumentApp.openById(final_doc_docid);
    
    var url_ss = SpreadsheetApp.openById('1sPcYH5JS87sP79koPkgSpCk5MWm3A2EeejKr5fnCPFU'); //  Sheet ID
    var url_ss_sheet1 = ss.getSheets()[3];
    var url, url_tag, url_name, element, url_start, url_text; // = 'http://www.google.com';
    
    var Avals_url = url_ss_sheet1.getRange("A1:A").getValues().filter(String).length;
    for (var looper2 = 1; looper2 <= Avals_url; looper2++) {
      var url_row = (url_ss_sheet1.getRange(looper2, 1, 1, 3).getValues())[0];
      url_tag = url_row[0];
      url = url_row[1];
      url_name = url_row[2];
      
      element = final_doc.getBody().findText(url_tag);
      
      if (element) { // if found a match
        url_start = element.getStartOffset();
        url_text = element.getElement().asText();
        url_text.replaceText(url_tag, url_name);
        url_text.setLinkUrl(url_start, (url_start + url_name.length) - 1, url);
        
      }
      
    }
    
    
    final_doc.saveAndClose();
    
    
         //Logger.log("Doc Name" + final_doc.getName());
    docblob = DocumentApp.openById(final_doc_docid).getAs('application/pdf')
    
    /* Add the PDF extension */
    fileName = row_data[0] + "- Quiz Report.pdf";
    docblob.setName(fileName);
    PDFfile = DriveApp.createFile(docblob);
       //Logger.log("Doc Name" + PDFfile.getId() + "name:" + row_data[0]);
    
    
    //MAIL
    file = DriveApp.getFileById(PDFfile.getId()).getBlob(); //DriveApp.getFilesByName(fileName).next().getBlob();
    
    
    recipient = row_data[1];
    //Logger.log('Recipient: '+recipient);
    //uncomment 167 and comment out 169
    //recipient = "poulav@sai.coach";
    
    EMAIL_SUBJECT = row_data[0] + ' - Your Quiz Results';
    EMAIL_BODY = 'Hello ' + row_data[0] + ',<br/><br/>Congratulations on deciding that you want to turn your coaching into an inspirational business. <br/><br/>It is my pleasure to give you your personal Coach Business assessment results. <br/><br/>I have attached the Assessment Results in this email as a PDF report. <br/><br/>Just know that before you go into it, don’t just skip it. <br/><br/>Set aside time today, sit down and really dig in. <br/><br/>The stuff I talk about in that report is based on data driven research into what it takes to build a 6 figure coaching business. It is not just one man’s opinion. <br/><br/>The coaches we’ve researched as part of the assessment extend from hobbyists, 6 figure coaches, Forbes contributors, best selling authors, international speakers. <br/><br/>Pretty much any niche or achievement level in the coaching space. <br/><br/>You’re going to love it.<br/><br/>In fact ' + row_data[0] + ', it never used to be free, that was only a recent addition to our ‘free line’. We used to bill this report out $95 USD. <br/><br/>So, you may be wondering why we’ve made it free. <br/><br/>I want to wow you with this report, so much so, that when it comes to the next stage of building your business, you’re likely to think immediately of me. If not that’s also alright, but in the meantime, I want to contribute to your journey. <br/><br/>Well… Here it is, your Coach Business Assessment Results :<br/><br/> Your overall score is ' + score + '.';
    REPLY_EMAIL = "sai@coachfoundation.com";
    /*
    MailApp.sendEmail(
    recipient,
    EMAIL_SUBJECT,
    EMAIL_BODY, {
    attachments: [file]
    });
    */
    
     if(recipient == "null" || recipient == null || recipient == ""){
      var emailError = new Error("At Row: "+looper);
      emailError.name = "Email Error";
      emailError.stack = new Date();
      var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
      var errors = activeSheet.getSheets()[6];
      errors.appendRow([emailError.name, emailError.message, emailError.stack]);      
      
    }else{
      MailApp.sendEmail({
        to: recipient,
        replyTo: REPLY_EMAIL,
        subject: EMAIL_SUBJECT,
        htmlBody: EMAIL_BODY,
        attachments:  [file]
      });
      DriveApp.getFileById(PDFfile.getId()).setTrashed(true);
      DriveApp.getFileById(final_doc_docid).setTrashed(true);     
    } 
    }
    catch(err){
      var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
      var errors = activeSheet.getSheets()[6];
      errors.appendRow([err.name, err.message, err.stack]); 
    }
    finally{
      looper++;
    }
    
  }
  
  
  sheet.getRange(1, 2, 1, 1).setValue(Avals);
  sheet.getRange(2, 2, 1, 1).setValue(0);

}
