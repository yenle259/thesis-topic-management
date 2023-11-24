const emailMessageHtml = (topicName,topicSlug,lecturerName, moduleName, semester, status) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="und">
    <head>
     <meta charset="UTF-8">
     <meta content="width=device-width, initial-scale=1" name="viewport">
     <meta name="x-apple-disable-message-reformatting">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta content="telephone=no" name="format-detection">
     <title>New email template 2023-11-23</title><!--[if (mso 16)]>
       <style type="text/css">
       a {text-decoration: none;}
       </style>
       <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
   <xml>
       <o:OfficeDocumentSettings>
       <o:AllowPNG></o:AllowPNG>
       <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
   </xml>
   <![endif]--><!--[if !mso]><!-- -->
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"><!--<![endif]-->
     <style type="text/css">
   .rollover:hover .rollover-first {
     max-height:0px!important;
     display:none!important;
     }
     .rollover:hover .rollover-second {
     max-height:none!important;
     display:block!important;
     }
     .rollover div {
     font-size:0px;
     }
     u + .body img ~ div div {
     display:none;
     }
     #outlook a {
     padding:0;
     }
     span.MsoHyperlink,
   span.MsoHyperlinkFollowed {
     color:inherit;
     mso-style-priority:99;
     }
     a.es-button {
     mso-style-priority:100!important;
     text-decoration:none!important;
     }
     a[x-apple-data-detectors] {
     color:inherit!important;
     text-decoration:none!important;
     font-size:inherit!important;
     font-family:inherit!important;
     font-weight:inherit!important;
     line-height:inherit!important;
     }
     .es-desk-hidden {
     display:none;
     float:left;
     overflow:hidden;
     width:0;
     max-height:0;
     line-height:0;
     mso-hide:all;
     }
     .es-button-border:hover {
     border-color:#42d159 #42d159 #42d159 #42d159!important;
     background:#0b317e!important;
     }
     .es-button-border:hover a.es-button,
   .es-button-border:hover button.es-button {
     background:#0b317e!important;
     color:#ffffff!important;
     }
   @media only screen and (max-width:600px) {.es-m-p15t { padding-top:15px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0b { padding-bottom:0px!important } .es-m-p0l { padding-left:0px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:16px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .st-br { padding-left:10px!important; padding-right:10px!important } h1 a { text-align:center } h2 a { text-align:center } h3 a { text-align:center } .es-text-3270, .es-text-3270 p, .es-text-3270 a, .es-text-3270 h1, .es-text-3270 h2, .es-text-3270 h3, .es-text-3270 h4, .es-text-3270 h5, .es-text-3270 h6, .es-text-3270 ul, .es-text-3270 ol, .es-text-3270 li, .es-text-3270 span, .es-text-3270 sup, .es-text-3270 sub, .es-text-3270 u, .es-text-3270 b, .es-text-3270 strong, .es-text-3270 em, .es-text-3270 i { font-size:14px!important } }
   </style>
    </head>
    <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
     <div dir="ltr" class="es-wrapper-color" lang="und" style="background-color:#F8F9FD"><!--[if gte mso 9]>
               <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                   <v:fill type="tile" color="#f8f9fd"></v:fill>
               </v:background>
           <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F8F9FD">
        <tr>
         <td valign="top" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr>
             <td align="center" bgcolor="#f8f9fd" style="padding:0;Margin:0;background-color:#f8f9fd">
              <table bgcolor="transparent" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px;border-width:0">
                <tr>
                 <td align="left" style="Margin:0;padding-top:20px;padding-right:20px;padding-bottom:10px;padding-left:20px">
                  <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                     <td align="center" valign="top" style="padding:0;Margin:0;width:556px">
                      <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="center" style="padding:0;Margin:0"><h2 style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:bold;line-height:48px !important;color:#016cc5;white-space:nowrap"><strong>HỆ THỐNG QUẢN LÝ ĐỀ TÀI</strong></h2></td>
                        </tr>
                        <tr>
                         <td align="center" style="padding:5px;Margin:0;font-size:0">
                          <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="es-spacer" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tr>
                             <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0"></td>
                            </tr>
                          </table></td>
                        </tr>
                        <tr>
                         <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px"><h6 style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333">Bạn đã đăng ký thành công đề tài với các thông tin bên dưới:</h6></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:5px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:130px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:130px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><h6 style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333;margin-left:40px"><strong>Tên đề tài</strong></h6></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td><td style="width:20px"></td><td style="width:406px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:406px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px"><a target="_blank" href="http://localhost:8080/user/topic/${topicSlug}" style="mso-line-height-rule:exactly;text-decoration:underline;color:#0b5394;font-size:16px">${topicName}</a></p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td></tr></table><![endif]--></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:5px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:130px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:130px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px;margin-left:40px"><strong>Giảng viên</strong></p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td><td style="width:20px"></td><td style="width:406px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:406px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px">${lecturerName}</p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td></tr></table><![endif]--></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:5px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:130px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:130px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px;margin-left:40px"><strong>Học phần</strong></p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td><td style="width:20px"></td><td style="width:406px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:406px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px">${moduleName}</p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td></tr></table><![endif]--></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:5px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:130px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:130px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px;margin-left:40px"><strong>Thời điểm</strong></p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td><td style="width:20px"></td><td style="width:406px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:406px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px">${semester}</p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td></tr></table><![endif]--></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:5px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:130px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:130px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#131313;font-size:16px;margin-left:40px"><strong>Trạng thái</strong></p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td><td style="width:20px"></td><td style="width:406px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:406px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#f6b26b;font-size:16px"><em>${status}</em></p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td></tr></table><![endif]--></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                  <table cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:556px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0;padding-bottom:8px"><h6 style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333">Truy cập vào hệ thống để xem thêm thông tin chi tiết.</h6></td>
                        </tr>
                        <tr>
                         <td align="center" style="padding:5px;Margin:0;font-size:0">
                          <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="es-spacer" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tr>
                             <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td>
                            </tr>
                          </table></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                 <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:10px;padding-bottom:30px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:340px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:340px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px !important;letter-spacing:0;color:#131313;font-size:16px"><b><i>​</i><i>Trường Công nghệ Thông tin &amp; Truyền thông&nbsp;</i></b></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px !important;letter-spacing:0;color:#131313;font-size:16px"><b><i>&nbsp;Đại học Cần Thơ</i></b></p></td>
                        </tr>
                      </table></td>
                    </tr>
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:340px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="left" class="es-text-3270" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:17px !important;letter-spacing:0;color:#131313;font-size:14px"><i><em>Khu 2, đường 3/2, Phường Xuân Khánh,<br>Quận Ninh Kiều, Thành phố Cần Thơ, Việt Nam</em></i></p></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td><td style="width:20px"></td><td style="width:200px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                     <td align="left" style="padding:0;Margin:0;width:200px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table><!--[if mso]></td></tr></table><![endif]--></td>
                </tr>
                <tr>
                 <td class="es-m-p15t es-m-p0b es-m-p0r es-m-p0l" align="left" style="padding:0;Margin:0;padding-top:15px">
                  <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                     <td align="center" valign="top" style="padding:0;Margin:0;width:596px">
                      <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                         <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table>
     </div>
    </body>
   </html>`
}

module.exports = { emailMessageHtml }