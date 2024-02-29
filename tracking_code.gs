/**
 * Sends the euivalent result depending upon the pre-determined Marketing channel
 * 
 * @param sou A string of characters(Source)
 * @param med A string of characters(Medium)
 * @param cam A string of characters(Campaign)
 * @param cta A string of characters(CTA)
 * @customfunction
 */

function EvaluateMKChannelWithDSA(sou,med,cam,cta) {  

  const s = sou.toLowerCase();
  const m = med.toLowerCase();
  const c = cam.toLowerCase();

  console.log("Source: "+s+" Medium: "+m+" Campaign: "+c);
  let result = s+m; 

  let dsa = c.includes("dsa_")?"DSA":"";

  if (dsa == "DSA"){
    return "Google Ads - DSA";    
  }    

  switch(s){
    case "youtube":
    return "YouTube";
    break;
    
    case "www.youtube.com":
    return "YouTube";
    break;

    case "linkedingroup":
    return "LinkedIn";
    break;
  }

  

  switch(m){
    case "organic":
    return "SEO";
    break;

    case "organic_social":
    return "SEO";
    break;

    case "telegram":
    return "Telegram";
    break;

    case "referral":
    return (cta.includes("amp")?"SEO":"Other");
    break;

    case "-":
    return (cta.includes("amp")?"SEO":"");
    break;

    case "email":
    return "Email Broadcast";
    break;

    case "jv-email":
    return "Joint Venture";
    break;
    
  }

  switch(result){
    case "googlecpc":
    return "Google Ads";
    break;

    case "facebookcpc":
    return "Facebook Ads";
    break;

    case "facebookppc":
    return "Facebook Ads";
    break;

    case "bingcpc":
    return "Bing Ads";
    break;

    case "bingppc":
    return "Bing Ads";
    break;

    case "linkedincpc":
    return "LinkedIn Ads";
    break;

    case "linkedinppc":
    return "LinkedIn Ads";
    break;

    case "duckduckgo.comreferral":
    return "SEO";
    break;

    case "quoracpc":
    return "Quora Ads";
    break;

    case "quorappc":
    return "Quora Ads";
    break;

    case "directnone":
    return "Others";
    break;

    case "coachfoundation-com.cdn.ampproject.orgreferral":
    return "SEO";
    break;

    case "coachfoundation.comreferral":
    return (cta.includes("amp")?"SEO":"Other");
    break;

    default:
    return "";
    break;
  }
}
