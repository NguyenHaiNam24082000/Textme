const nodemailer = require("nodemailer");
const config = require("../configs/config");

// const transport = nodemailer.createTransport(config.email.smtp);
// /* istanbul ignore next */
// if (config.env !== "test") {
//   transport
//     .verify()
//     .then(() => console.log("Connected to email server"))
//     .catch(() =>
//       console.log(
//         "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
//       )
//     );
// }

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USERNAME,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

//emailOptions - who sends what to whom
const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
      console.log(success);
    }
  });
  await emailTransporter.sendMail(emailOptions);
};

// sendEmail({
//   subject: "Test",
//   to: process.env.SMTP_USERNAME,
//   from: process.env.SMTP_USERNAME,
//   html: `<!DOCTYPE html>
//   <html xml:lang="en" lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

//   <head>
//     <!--Help character display properly.-->
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <!--Set the initial scale of the email.-->
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <!--Force Outlook clients to render with a better MS engine.-->
//     <meta http-equiv="X-UA-Compatible" content="IE=Edge">
//     <!--Help prevent blue links and autolinking-->
//     <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
//     <!--prevent Apple from reformatting and zooming messages.-->
//     <meta name="x-apple-disable-message-reformatting">

//     <!--target dark mode-->
//     <meta name="color-scheme" content="light dark">
//     <meta name="supported-color-schemes" content="light dark only">

//     <!-- Allow for better image rendering on Windows hi-DPI displays. -->
//     <!--[if mso]>
//   <noscript>
//       <xml>
//         <o:OfficeDocumentSettings>
//           <o:AllowPNG/>
//           <o:PixelsPerInch>96</o:PixelsPerInch>
//         </o:OfficeDocumentSettings>
//       </xml>
//   </noscript>
//   <![endif]-->

//     <!--to support dark mode meta tags-->
//     <style type="text/css">
//       :root {
//         color-scheme: light dark;
//         supported-color-schemes: light dark;
//       }
//     </style>

//     <!--webfont code goes here-->
//     <!--[if (gte mso 9)|(IE)]><!-->
//     <!--webfont <link /> goes here-->
//     <style>
//       /*Web font over ride goes here
//        h1, h2, h3, h4, h5, p, a, img, span, ul, ol, li { font-family: 'webfont name', Arial, Helvetica, sans-serif !important; } */
//     </style>
//     <!--<![endif]-->

//     <style type="text/css">
//       .body-fix {
//         height: 100% !important;
//         margin: 0 auto !important;
//         padding: 0 !important;
//         width: 100% !important;
//         -webkit-text-size-adjust: 100%;
//         -ms-text-size-adjust: 100%;
//         -webkit-font-smoothing: antialiased;
//           word-spacing: normal;
//       }

//       div[style*="margin:16px 0"] {
//         margin: 0 !important;
//       }

//       table,
//       td {
//         border-collapse: collapse !important;
//         mso-table-lspace: 0pt;
//         mso-table-rspace: 0pt;
//         -webkit-text-size-adjust: 100%;
//         -ms-text-size-adjust: 100%;
//       }

//       img {
//         border: 0;
//         line-height: 100%;
//         outline: none;
//         text-decoration: none;
//         display: block;
//       }

//       p,
//       h1,
//       h2,
//       h3 {
//         padding: 0;
//         margin: 0;
//       }

//       a[x-apple-data-detectors] {
//         color: inherit !important;
//         text-decoration: none !important;
//         font-size: inherit !important;
//         font-family: inherit !important;
//         font-weight: inherit !important;
//         line-height: inherit !important;
//       }

//       u+#body a {
//         color: inherit;
//         text-decoration: none;
//         font-size: inherit;
//         font-family: inherit;
//         font-weight: inherit;
//         line-height: inherit;
//       }

//       #MessageViewBody a {
//         color: inherit;
//         text-decoration: none;
//         font-size: inherit;
//         font-family: inherit;
//         font-weight: inherit;
//         line-height: inherit;
//       }

//       .link:hover {
//         text-decoration: none !important;
//       }

//       .fadeimg {
//         transition: 0.3s !important;
//         opacity: 1 !important;
//       }

//       .fadeimg:hover {
//         transition: 0.3s !important;
//         opacity: 0.5 !important;
//       }

//       /* start CTA HOVER EFFECTS */
//       .cta { transition: 0.3s !important; }
//       .cta span{ transition: 0.3s !important; }
//       .cta:hover { transition: 0.5s !important; background-color: #004265 !important; transform: scale(1.05);}
//       .cta:hover span { transition: 0.3s !important; }
//       .cta-border:hover { border-bottom: 3px solid transparent !important; }
//       /* end CTA HOVER EFFECTS */

//       .mobile {
//         display: none;
//       }

//     </style>

//     <!--mobile styles-->
//     <style>
//       @media screen and (max-width:600px) {
//           .wMobile { width: 95% !important; }
//           .wInner {  width: 90% !important; }
//           .wFull { width: 100% !important; }
//           .imgFull { width: 100% !important; height: auto !important; }
//           .desktop { width: 0 !important; display: none !important; }
//           .mobile { display: block !important; }
//           .std { font-size: 18px !important; line-height: 28px !important; }
//           .tPad-0 { padding-top: 0 !important; }
//       }
//     </style>

//     <!--dark mode styles-->
//     <!--these are just example classes that can be used.-->
//     <style>
//       @media (prefers-color-scheme: dark) {

//         /* Shows Dark Mode-Only Content, Like Images */
//         .dark-img {
//           display: block !important;
//           width: auto !important;
//           overflow: visible !important;
//           float: none !important;
//           max-height: inherit !important;
//           max-width: inherit !important;
//           line-height: auto !important;
//           margin-top: 0px !important;
//           visibility: inherit !important;
//         }

//         /* Hides Light Mode-Only Content, Like Images */
//         .light-img {
//           display: none;
//           display: none !important;
//         }

//         /* Custom Dark Mode Background Color */
//         .darkmode {
//           background-color: #100E11 !important;
//         }
//         .darkmode2 {
//           background-color: #020203 !important;
//         }
//         .darkmode3 {
//           background-color: #1b181d !important;
//         }

//         /* Custom Dark Mode Font Colors */
//         h1, h3, p, span, a, li {
//           color: #fdfdfd !important;
//         }
//           h2, h2 a { color: #028383 !important; }

//         /* Custom Dark Mode Text Link Color */
//         .link { color: #028383 !important; }
//         .footer a.link{ color: #fdfdfd !important; }
//       }

//       /* Copy dark mode styles for android support */
//       /* Shows Dark Mode-Only Content, Like Images */
//       [data-ogsc] .dark-img {
//         display: block !important;
//         width: auto !important;
//         overflow: visible !important;
//         float: none !important;
//         max-height: inherit !important;
//         max-width: inherit !important;
//         line-height: auto !important;
//         margin-top: 0px !important;
//         visibility: inherit !important;
//       }

//       /* Hides Light Mode-Only Content, Like Images */
//       [data-ogsc] .light-img {
//         display: none;
//         display: none !important;
//       }

//       /* Custom Dark Mode Background Color */
//       [data-ogsc] .darkmode {
//         background-color: #100E11 !important;
//       }
//       [data-ogsc] .darkmode2 {
//         background-color: #020203 !important;
//       }
//       [data-ogsc] .darkmode3 {
//         background-color: #1b181d !important;
//       }

//       /* Custom Dark Mode Font Colors */
//       [data-ogsc] h1, [data-ogsc] h3, [data-ogsc] p, [data-ogsc] span, [data-ogsc] a, [data-ogsc] li {
//         color: #fdfdfd !important;
//       }
//         [data-ogsc] h2, [data-ogsc] h2 a { color: #028383 !important; }

//       /* Custom Dark Mode Text Link Color */
//       [data-ogsc] .link { color: #028383 !important; }

//       [data-ogsc] .footer a.link { color: #fdfdfd !important; }
//     </style>

//     <!--correct superscripts in Outlook-->
//     <!--[if (gte mso 9)|(IE)]>
//           <style>
//             sup{font-size:100% !important;}
//           </style>
//           <![endif]-->
//     <title></title>

//   </head>

//   <body id="body" class="darkmode body body-fix" bgcolor="#ffffff" style="background-color:#ffffff;">
//   <div role="article" aria-roledescription="email" aria-label="Email from Wonderblum" xml:lang="en" lang="en" >
//     <!--hidden preheader with preh-header spacer hack-->
//     <div class="litmus-builder-preview-text" style="display:none;">
//       &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
//     </div>
//     <!--start of email-->
//     <table class="darkmode" bgcolor="#eeeeee" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">

//       <!--main content area-->
//       <tr>
//         <td class="tPad-0" align="center" valign="top" style="padding-top: 20px;">
//           <table class="wFull" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:600px;">
//               <!--header-->
//             <tr>
//               <td class="darkmode3" align="center" valign="top" style="padding:50px 0 20px; background-color: #ffffff;">
//                   <!--light mode logo-->
//                   <a href="https://www.example.com/***utm***" target="_blank"><img class="light-img" src="logo-light.png" width="168" height="78" alt="wonderblum" style="color: #4a4a4a; font-family: 'Trebuchet MS', Arial, sans-serif; text-align:center; font-weight:bold; font-size:24px; line-height:28x; text-decoration: none; padding: 0;">

//                   <!--dark mode logo-->
//                   <!--[if !mso]><! -->
//                   <div class="dark-img" style="display:none; overflow:hidden; width:0px; max-height:0px; max-width:0px; line-height:0px; visibility:hidden;" align="center">
//                       <img src="logo-dark.png" width="168" height="78" alt="wonderblum" style="color: #4a4a4a; font-family: 'Trebuchet MS', Arial, sans-serif; text-align:center; font-weight:bold; font-size:24px; line-height:28px; text-decoration: none; padding: 0;" border="0" />
//                   </div>
//                       <!--<![endif]--></a>
//                 </td>
//               </tr>

//               <!-- Start Main Article -->
//               <tr>
//                   <td class="darkmode3" align="center" valign="top" style="padding:30px 0 50px;background-color: #ffffff;">

//                       <!--headline-->
//                       <h1 style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0 20px 30px;font-size: 50px; line-height: 60px; text-align: center; color: #0a080b; font-weight: normal;"><a href="https://www.example.com/***utm***" target="_blank" style="color: #0a080b; text-decoration: none;">Thank you for 3 blissful years together</a></h1>

//                       <!--subhead-->
//                       <p class="std" style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0 20px 30px; font-size: 30px; line-height: 40px; color: #0A080B;">It&rsquo;s great to call out your customer&rsquo;s loyalty;&nbsp;it makes them feel valued. You&nbsp;could reward them with a gift.</p>

//                       <!--CTA-->
//                       <a href="https://example.com/***utm***" class="cta" style="background-color: #028383; font-size: 18px; font-family: 'Trebuchet MS', Arial, sans-serif; font-weight:bold; text-decoration: none; padding: 14px 20px; color: #ffffff; display:inline-block; mso-padding-alt:0;"><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:30pt">&nbsp;</i><![endif]--><span style="mso-text-raise:15pt;">Claim your reward*</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a>

//                       <!--disclaimer-->
//                       <p style="font-family:'Trebuchet MS', Arial, sans-serif; font-size:14px; line-height:24px; color:#0A080B; margin: 20px 20px 0; padding:0;">
//                           *Add in a brief legal disclaimer if you need to here.
//                       </p>
//                   </td>
//               </tr>

//               <!--hero image-->
//               <tr>
//                   <td align="center" valign="top">
//                       <a href="https://www.example.com/***utm***" target="_blank"><img src="loyalty-image.jpg" class="fadeimg" width="600" height="400" alt="Image of woman with flowers in her hair" style="width: 100%; max-width: 600px; height: auto; max-height: 400px;" /></a>
//                   </td>
//               </tr>
//           </table>
//         </td>
//       </tr>

//         <!--footer-->
//         <tr>
//           <td class="footer" align="center" valign="top" style="padding:50px 0;">
//             <p style="font-family: 'Trebuchet MS', Arial, sans-serif;font-size:14px;line-height:24px;mso-line-height-rule:exactly;color:#0a080b;margin-bottom:20px;">Any address information, legal, terms etc to be added here<br><br>
//                 <a href="https://example.com/***utm***" class="link" target="_blank" style="color: #0a080b; text-decoration: underline;">Email Preferences</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://example.com/***utm***" class="link" target="_blank" style="color: #0a080b; text-decoration: underline;">Unsubscribe</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://example.com/***utm***" class="link" target="_blank" style="color: #0a080b; text-decoration: underline;">View Online</a></p>
//               <table border="0" cellpadding="0" cellspacing="0" role="presentation">
//                   <tr>
//                       <td align="center" valign="top">
//                           <a href="https://www.twitter.com" target="_blank"><img src="icon-twitter.png" class="fadeimg" alt="Twitter" width="50" height="50" style="font-size: 12px; line-height: 14px; font-family: 'Trebuchet MS', Arial, sans-serif; color: #028383;"></a>
//                       </td>
//                       <td align="center" valign="top" style="padding: 0 30px;">
//                           <a href="https://www.facebook.com" target="_blank"><img src="icon-facebook.png" class="fadeimg" alt="Facebook" width="50" height="50" style="font-size: 12px; line-height: 14px; font-family: 'Trebuchet MS', Arial, sans-serif; color: #028383;"></a>
//                       </td>
//                       <td align="center" valign="top">
//                           <a href="https://www.instagram.com" target="_blank"><img src="icon-instagram.png" class="fadeimg" alt="Instagram" width="50" height="50" style="font-size: 12px; line-height: 14px; font-family: 'Trebuchet MS', Arial, sans-serif; color: #028383;"></a>
//                       </td>
//                   </tr>
//               </table>
//           </td>
//         </tr>
//     </table>
//   </div>

//       <!--analytics-->

//   </body>

//   </html>
//   `,
// });

// /**
//  * Send an email
//  * @param {string} to
//  * @param {string} subject
//  * @param {string} text
//  * @returns {Promise}
//  */
// const sendEmail = async (to, subject, text) => {
//   const msg = { from: config.email.from, to, subject, text };
//   await transport.sendMail(msg);
// };

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  sendEmail({ to, subject, text });
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://localhost:3000/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  const html = `<div style="background: #f9f9f9">
    <div>
      <div dir="ltr">
        <table
          style="
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            max-width: 580px;
            display: table;
            margin-left: auto;
            margin-right: auto;
            padding: 0;
            vertical-align: top;
          "
        >
          <tbody>
            <tr style="margin: 0px !important;">
              <td>
                <div
                  style="
                    padding: 48px;
                    border: 1px solid #dddddd;
                    border-radius: 12px;
                    overflow: hidden;
                    color: #333231;
                    font-size: 16px;
                    line-height: 28px;
                    font-family: 'Inter', 'Segoe UI', 'SanFrancisco Display',
                      Helvetica, Helvetica Neue, Arial, sans-serif;
                    color: #333231;
                    background: #ffffff;
                    margin-top: 24px;
                    margin-bottom: 24px;
                  "
                >
                  <a
                    href="https://www.fintelgaseluce.it"
                    style="text-decoration: none;"
                    target="_blank"
                  >
                    <img
                      alt="Textme's logo"
                      src="https://raw.githubusercontent.com/NguyenHaiNam24082000/Textme/main/client/public/logo192.png"
                      style="height: auto; width: 224px;"
                    />
                  </a>
                  <p style="padding-top: 32px;">
                    Hello ${to},
                  </p>
                  <You>Congratulation! 🥳🥳🥳<br/>You are successfully registered to our website.</p>
                  <p>Click the button below to verify the email.</p>
                  <div style="text-align: center;">
                          <a
                            href="${verificationEmailUrl}"
                            style="
                              background-color: #1f8feb;
                              border: none;
                              border-radius: 4px;
                              color: #fff;
                              display: inline-block;
                              font-size: 16px;
                              font-weight: 400;
                              min-height: 20px;
                              padding: 9px 15px;
                              text-decoration: none;
                            "
                            target="_blank"
                            data-saferedirecturl="https://www.google.com/url?q=${verificationEmailUrl}"
                            >Verify Email</a
                          >
                        </div>
                  <p>
                    If the button do not work click <a
                    style="color: #222222; font-weight: 700;"
                    href="${verificationEmailUrl}"
                    >here</a> to
                    verify your email
                  </p>
                  <p style="line-height: 19px; color: #56585a; font-size: 12px;">
                    ${new Date().toLocaleString()}
                  </p>
                  <p>
                  You are receiving this email because you are registering the customer
                    {{codice_cliente}} in our app or website.
                  </p>
                  <p>
                    The verification code will remain active for
                    <b>10</b> minutes. If you don't enter it in
                    time, you can generate a new one inside by repeating the
                    procedure.
                  </p>
                  <p>
                  We remind you that if you decide to communicate the code to third parties authorizing them to view your data relating to one or more users, this process is totally independent of Textme and is carried out exclusively on the basis of your decision. You can always consult
                    <a
                      style="color: #222222; font-weight: 700;"
                      href="https://www.fintelgaseluce.it/privacy-app"
                      >complete information</a
                    >
                    and know how to change your choices and revoke your authorizations.
                  </p>
                  <p>
                    <b
                      ><mark
                        >Further never share this code with anyone</mark
                      ></b
                    >, not even the employees of Textme will ask you.
                  </p>
                  <p>
                  If it was not you who made the request, please let us know writing to
                    <a
                      href="mailto:nghainam2000@gmail.com"
                      style="
                        color: #222222;
                        font-family: 'Inter', 'Segoe UI', 'SanFrancisco Display',
                          Helvetica, Helvetica Neue, Arial, sans-serif;
                        font-weight: 700;
                      "
                      target="_blank"
                      >nghainam2000@gmail.com</a
                    >
                  </p>
                  <p>
                  Happy surfing!<br />
                    The Textme team
                  </p>
                  <p>
                    <img
                      src="https://fintel-public-resources.s3.eu-south-1.amazonaws.com/fwa/img/FGEL_walking_woman.png"
                      style="margin: 0;"
                      width="166px"
                    />
                  </p>
  
                  <hr size="1px" color="#ddd" style="margin-top: 50px;" />
                  <table
                    cellpadding="0"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      width: 100%;
                      margin: 32px 0 0 0;
                    "
                  >
                    <tbody>
                      <tr>
                        <td align="left" width="100%">
                          <img
                            alt="Textme's logo"
                            src="https://raw.githubusercontent.com/NguyenHaiNam24082000/Textme/main/client/public/logo512.png"
                            style="width: 32px; height: 32px; border: 0;"
                          />
                        </td>
                        <td>
                          <a href="https://www.facebook.com/nguyennam2000">
                            <img
                              alt="Facebook"
                              src="https://fintel-public-resources.s3.eu-south-1.amazonaws.com/fwa/img/FGEL_utilities_icon_grey_Facebook.png"
                              style="width: 20px; border: 0;"
                            />
                          </a>
                        </td>
                        <td style="padding-left: 10px;">
                          <a
                            href="https://www.instagram.com/nhnammm/"
                            target="_blank"
                          >
                            <img
                              alt="Instagram"
                              src="https://fintel-public-resources.s3.eu-south-1.amazonaws.com/fwa/img/FGEL_utilities_icon_grey_Instagram.png"
                              style="width: 20px; border: 0;"
                            />
                          </a>
                        </td>
                        <td style="padding-left: 10px;">
                          <a
                            href="https://www.linkedin.com/company/fintelgaseluce"
                            target="_blank"
                          >
                            <img
                              alt="Linkedin"
                              src="https://fintel-public-resources.s3.eu-south-1.amazonaws.com/fwa/img/FGEL_utilities_icon_grey_Linkedin.png"
                              style="width: 20px; border: 0 !important;"
                            />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4">
                          <p
                            style="
                              padding-top: 24px;
                              font-size: 14px;
                              line-height: 18px;
                            "
                          >
                            Textme<br />
                            Long Bien<br />
                            Ha Noi, Viet Nam
                          </p>
                          <p style="font-size: 14px; line-height: 18px;">
                          For further reports or communications contact<a
                              style="font-weight: 500; color: #222222;"
                              href="mailto:nghainam2000@gmail.com"
                              >Customer service</a
                            >.
                          </p>
                        </td>
  
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>  `;
  sendEmail({ to, subject, html });
};

module.exports = {
  //   transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
