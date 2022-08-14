export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <script key='gtag-report-conversion' dangerouslySetInnerHTML={{
      __html: `
        function gtag_report_conversion(url) { var callback = function () { if (typeof(url) != 'undefined') { window.location = url; } }; gtag('event', 'conversion', { 'send_to': 'AW-1013442100/qVtDCImV8O0BELTMn-MD', 'event_callback': callback }); return false; }
      `
    }}/>
  ])
}
