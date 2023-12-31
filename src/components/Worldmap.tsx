import { useState } from 'react'
import '../App.css'
import { Chart } from "react-google-charts";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type CountryNamesType = Array<[string, string]>;
type CountryDataType = Array<[string, string, number]>;

const visitedHeader = ["Country Code", "Country Name", "Level"]
const countryNames: CountryNamesType = [
  ["AF", "Afghanistan"],
  ["AX", "Åland Islands"],
  ["AL", "Albania"],
  ["DZ", "Algeria"],
  ["AS", "American Samoa"],
  ["AD", "Andorra"],
  ["AO", "Angola"],
  ["AI", "Anguilla"],
  ["AQ", "Antarctica"],
  ["AG", "Antigua and Barbuda"],
  ["AR", "Argentina"],
  ["AM", "Armenia"],
  ["AW", "Aruba"],
  ["AU", "Australia"],
  ["AT", "Austria"],
  ["AZ", "Azerbaijan"],
  ["BS", "Bahamas"],
  ["BH", "Bahrain"],
  ["BD", "Bangladesh"],
  ["BB", "Barbados"],
  ["BY", "Belarus"],
  ["BE", "Belgium"],
  ["BZ", "Belize"],
  ["BJ", "Benin"],
  ["BM", "Bermuda"],
  ["BT", "Bhutan"],
  ["BO", "Bolivia (Plurinational State of)"],
  ["BQ", "Bonaire, Sint Eustatius and Saba"],
  ["BA", "Bosnia and Herzegovina"],
  ["BW", "Botswana"],
  ["BV", "Bouvet Island"],
  ["BR", "Brazil"],
  ["IO", "British Indian Ocean Territory"],
  ["BN", "Brunei Darussalam"],
  ["BG", "Bulgaria"],
  ["BF", "Burkina Faso"],
  ["BI", "Burundi"],
  ["CV", "Cabo Verde"],
  ["KH", "Cambodia"],
  ["CM", "Cameroon"],
  ["CA", "Canada"],
  ["KY", "Cayman Islands"],
  ["CF", "Central African Republic"],
  ["TD", "Chad"],
  ["CL", "Chile"],
  ["CN", "China"],
  ["CX", "Christmas Island"],
  ["CC", "Cocos (Keeling) Islands"],
  ["CO", "Colombia"],
  ["KM", "Comoros"],
  ["CG", "Congo"],
  ["CD", "Congo (Democratic Republic of the)"],
  ["CK", "Cook Islands"],
  ["CR", "Costa Rica"],
  ["CI", "Côte d\'Ivoire"],
  ["HR", "Croatia"],
  ["CU", "Cuba"],
  ["CW", "Curaçao"],
  ["CY", "Cyprus"],
  ["CZ", "Czechia"],
  ["DK", "Denmark"],
  ["DJ", "Djibouti"],
  ["DM", "Dominica"],
  ["DO", "Dominican Republic"],
  ["EC", "Ecuador"],
  ["EG", "Egypt"],
  ["SV", "El Salvador"],
  ["GQ", "Equatorial Guinea"],
  ["ER", "Eritrea"],
  ["EE", "Estonia"],
  ["ET", "Ethiopia"],
  ["FK", "Falkland Islands (Malvinas)"],
  ["FO", "Faroe Islands"],
  ["FJ", "Fiji"],
  ["FI", "Finland"],
  ["FR", "France"],
  ["GF", "French Guiana"],
  ["PF", "French Polynesia"],
  ["TF", "French Southern Territories"],
  ["GA", "Gabon"],
  ["GM", "Gambia"],
  ["GE", "Georgia"],
  ["DE", "Germany"],
  ["GH", "Ghana"],
  ["GI", "Gibraltar"],
  ["GR", "Greece"],
  ["GL", "Greenland"],
  ["GD", "Grenada"],
  ["GP", "Guadeloupe"],
  ["GU", "Guam"],
  ["GT", "Guatemala"],
  ["GG", "Guernsey"],
  ["GN", "Guinea"],
  ["GW", "Guinea-Bissau"],
  ["GY", "Guyana"],
  ["HT", "Haiti"],
  ["HM", "Heard Island and McDonald Islands"],
  ["VA", "Holy See"],
  ["HN", "Honduras"],
  ["HK", "Hong Kong"],
  ["HU", "Hungary"],
  ["IS", "Iceland"],
  ["IN", "India"],
  ["ID", "Indonesia"],
  ["IR", "Iran (Islamic Republic of)"],
  ["IQ", "Iraq"],
  ["IE", "Ireland"],
  ["IM", "Isle of Man"],
  ["IL", "Israel"],
  ["IT", "Italy"],
  ["JM", "Jamaica"],
  ["JP", "Japan"],
  ["JE", "Jersey"],
  ["JO", "Jordan"],
  ["KZ", "Kazakhstan"],
  ["KE", "Kenya"],
  ["KI", "Kiribati"],
  ["KP", "Korea (Democratic People\'s Republic of)"],
  ["KR", "Korea (Republic of)"],
  ["KW", "Kuwait"],
  ["KG", "Kyrgyzstan"],
  ["LA", "Lao People\'s Democratic Republic"],
  ["LV", "Latvia"],
  ["LB", "Lebanon"],
  ["LS", "Lesotho"],
  ["LR", "Liberia"],
  ["LY", "Libya"],
  ["LI", "Liechtenstein"],
  ["LT", "Lithuania"],
  ["LU", "Luxembourg"],
  ["MO", "Macao"],
  ["MK", "Macedonia (the former Yugoslav Republic of)"],
  ["MG", "Madagascar"],
  ["MW", "Malawi"],
  ["MY", "Malaysia"],
  ["MV", "Maldives"],
  ["ML", "Mali"],
  ["MT", "Malta"],
  ["MH", "Marshall Islands"],
  ["MQ", "Martinique"],
  ["MR", "Mauritania"],
  ["MU", "Mauritius"],
  ["YT", "Mayotte"],
  ["MX", "Mexico"],
  ["FM", "Micronesia (Federated States of)"],
  ["MD", "Moldova (Republic of)"],
  ["MC", "Monaco"],
  ["MN", "Mongolia"],
  ["ME", "Montenegro"],
  ["MS", "Montserrat"],
  ["MA", "Morocco"],
  ["MZ", "Mozambique"],
  ["MM", "Myanmar"],
  ["NA", "Namibia"],
  ["NR", "Nauru"],
  ["NP", "Nepal"],
  ["NL", "Netherlands"],
  ["NC", "New Caledonia"],
  ["NZ", "New Zealand"],
  ["NI", "Nicaragua"],
  ["NE", "Niger"],
  ["NG", "Nigeria"],
  ["NU", "Niue"],
  ["NF", "Norfolk Island"],
  ["MP", "Northern Mariana Islands"],
  ["NO", "Norway"],
  ["OM", "Oman"],
  ["PK", "Pakistan"],
  ["PW", "Palau"],
  ["PS", "Palestine, State of"],
  ["PA", "Panama"],
  ["PG", "Papua New Guinea"],
  ["PY", "Paraguay"],
  ["PE", "Peru"],
  ["PH", "Philippines"],
  ["PN", "Pitcairn"],
  ["PL", "Poland"],
  ["PT", "Portugal"],
  ["PR", "Puerto Rico"],
  ["QA", "Qatar"],
  ["RE", "Réunion"],
  ["RO", "Romania"],
  ["RU", "Russian Federation"],
  ["RW", "Rwanda"],
  ["BL", "Saint Barthélemy"],
  ["SH", "Saint Helena, Ascension and Tristan da Cunha"],
  ["KN", "Saint Kitts and Nevis"],
  ["LC", "Saint Lucia"],
  ["MF", "Saint Martin (French part)"],
  ["PM", "Saint Pierre and Miquelon"],
  ["VC", "Saint Vincent and the Grenadines"],
  ["WS", "Samoa"],
  ["SM", "San Marino"],
  ["ST", "Sao Tome and Principe"],
  ["SA", "Saudi Arabia"],
  ["SN", "Senegal"],
  ["RS", "Serbia"],
  ["SC", "Seychelles"],
  ["SL", "Sierra Leone"],
  ["SG", "Singapore"],
  ["SX", "Sint Maarten (Dutch part)"],
  ["SK", "Slovakia"],
  ["SI", "Slovenia"],
  ["SB", "Solomon Islands"],
  ["SO", "Somalia"],
  ["ZA", "South Africa"],
  ["GS", "South Georgia and the South Sandwich Islands"],
  ["SS", "South Sudan"],
  ["ES", "Spain"],
  ["LK", "Sri Lanka"],
  ["SD", "Sudan"],
  ["SR", "Suriname"],
  ["SJ", "Svalbard and Jan Mayen"],
  ["SZ", "Swaziland"],
  ["SE", "Sweden"],
  ["CH", "Switzerland"],
  ["SY", "Syrian Arab Republic"],
  ["TW", "Taiwan, Province of China[a]"],
  ["TJ", "Tajikistan"],
  ["TZ", "Tanzania, United Republic of"],
  ["TH", "Thailand"],
  ["TL", "Timor-Leste"],
  ["TG", "Togo"],
  ["TK", "Tokelau"],
  ["TO", "Tonga"],
  ["TT", "Trinidad and Tobago"],
  ["TN", "Tunisia"],
  ["TR", "Turkey"],
  ["TM", "Turkmenistan"],
  ["TC", "Turks and Caicos Islands"],
  ["TV", "Tuvalu"],
  ["UG", "Uganda"],
  ["UA", "Ukraine"],
  ["AE", "United Arab Emirates"],
  ["GB", "United Kingdom of Great Britain and Northern Ireland"],
  ["US", "United States of America"],
  ["UM", "United States Minor Outlying Islands"],
  ["UY", "Uruguay"],
  ["UZ", "Uzbekistan"],
  ["VU", "Vanuatu"],
  ["VE", "Venezuela (Bolivarian Republic of)"],
  ["VN", "Viet Nam"],
  ["VG", "Virgin Islands (British)"],
  ["VI", "Virgin Islands (U.S.)"],
  ["WF", "Wallis and Futuna"],
  ["EH", "Western Sahara"],
  ["YE", "Yemen"],
  ["ZM", "Zambia"],
  ["ZW", "Zimbabwe"],
  ["MaxValData", "MaxValData"]
]

function Worldmap() {
  const navigate = useNavigate();
  const { params } = useParams();

  // URL パラメータの取得
  const paramsDict = params
  ? params.split(",").reduce((acc: { [key: string]: string }, keyValue) => {
    const [key, value] = keyValue.split("=");
    acc[key] = value;
    return acc;}, {})
  : {};

  // ここから行った国の状態の定義部分
  const [visitedCountries, setVisitedCountries] = useState<CountryDataType>(
    countryNames.map(item => item[0] !== "MaxValData" ? [...item, paramsDict[item[0]] ? parseInt(paramsDict[item[0]]): 0] : [...item, 5])
  )
  const [level, setLevel] = useState<number>(
    visitedCountries.reduce((acc, item) => acc + item[2], 0) - 5
  )
  // クリック時の処理
  const handleChartSelect = ({ chartWrapper }: any) => {
    const selection = chartWrapper.getChart().getSelection();
    if (selection.length === 0) return;
    const index = selection[0].row;
    const newVisitedCountries = [...visitedCountries];
    newVisitedCountries[index][2] = newVisitedCountries[index][2] + 1;
    if (newVisitedCountries[index][2] > 5) {
      newVisitedCountries[index][2] = 0;
    }
    paramsDict[newVisitedCountries[index][0]] = newVisitedCountries[index][2].toString();
    setVisitedCountries(newVisitedCountries); // Update the state with the new array
    const newLevel = newVisitedCountries.reduce((acc, item) => acc + item[2], 0) - 5
    setLevel(newLevel);
    const updatedParams = Object.entries(paramsDict).map(([key, value]) => `${key}=${value}`).join(',');
    navigate(`/${updatedParams}`);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: 'green' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 11 }}>
              Count-Ries
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Level {level}
            </Typography>
          </Toolbar>
        </AppBar> 
      </Box>
      <Box marginTop="10vh" />      
     
      {/* <h1>&ensp;&ensp;&ensp;Count-Ries</h1>
      <h1>&ensp;&ensp;&ensp;Level {level}</h1> */}
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: handleChartSelect,
          },
        ]}
        chartType="GeoChart"
        width="100vw"
        height="70vh"
        data={[visitedHeader, ...visitedCountries]}
        options={{
          legend: "none",
        }}
      />
    </>
  )
}

export default Worldmap
