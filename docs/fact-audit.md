# Fact audit — English postcard content

Checked on November 15, 2026. Each factual claim in `src/content/locales/en/items.json`, with the source
that backs it and a short quote from that page. All pages were opened and read in full (saved copies,
not search snippets). Every source URL returned HTTP 200 in `npm run check-links` on November 15, 2026.

Source keys used below:

| Key | Source |
|-----|--------|
| NSSDCA-x | NSSDCA Master Catalog page for that item (ID in items.json) |
| SN-x | science.nasa.gov mission page for that item |
| HRP | nasa.gov/hrp/hazard-distance-from-earth |
| MOON | science.nasa.gov/moon/facts |
| USGS | usgs.gov "The USGS in Space Exploration…" |
| ASU-LROC | news.asu.edu 2022-07-22 "Capturing the moon" |

Distances shared by several items:
- Mars, about 225 million km / 140 million miles (Phoenix, Opportunity, Spirit, Ingenuity): HRP, "Mars is, on average, 140 million miles from Earth."
- Moon, 384,400 km / 238,855 miles (Apollo items): MOON, "The Moon is an average of 238,855 miles (384,400 kilometers) away."

## Fixed during this audit
- **Voyager 1, "today":** said "NASA lists my mission as active". SN-voyager-1 says "Status: Extended Mission", so the line now
  says "NASA calls this my extended mission, and I still collect science data" ("continues to collect data").

## Claims checked only through a tool summary
None. The 2026 LPSC abstract (PDF) was first read through a summary. It was then text-extracted locally and the
wording confirmed (see Apollo 11 reflector).

---

## phoenix
| Claim | Source | Quote |
|---|---|---|
| Touched down May 25, 2008 on the arctic plains | NSSDCA-phoenix; SN-phoenix | "landing on Mars on 25 May 2008"; "Green Valley of Vastitas Borealis" |
| HiRISE photographed it under its parachute; first spacecraft to photograph another landing | SN-phoenix | "the first time one spacecraft photographed another during a planetary landing" |
| Team led by Peter Smith, University of Arizona, Tucson | NSSDCA-phoenix; JPL 2010 release | "Peter Smith, Phoenix principal investigator at the University of Arizona in Tucson" |
| Dug trenches with robotic arm; found water ice under the soil | SN-phoenix | "Phoenix dug into an ice-rich layer near the surface" |
| Bright clumps vanished after about four days | SN-phoenix | "the material had vaporized four days after the scoop" |
| Frost/ice damaged solar panels | JPL 2010; HiRISE ESP_017716_2485 | "a new orbiter image shows signs of ice damage"; "forms a frost on the surface" |
| Odyssey flew over 61 times in 2010; NASA ended mission that May | JPL 2010 (dated May 24, 2010) | "flew over the Phoenix landing site 61 times" |
| Last signal November 2, 2008 | NSSDCA-phoenix | "its last signal was received on 02 November 2008" |
| HiRISE image of May 7, 2010: dusty, panel appears collapsed | HiRISE ESP_017716_2485 | "Acquisition date 07 May 2010"; "a solar panel… has collapsed" |
| HiRISE run by the University of Arizona | HiRISE page postscript | "is operated by the University of Arizona" |

## voyager-1
| Claim | Source | Quote |
|---|---|---|
| Launched September 5, 1977 | NSSDCA-voyager-1; SN-voyager-1 | "Launch Date: 1977-09-05"; "launch Sept. 5, 1977" |
| Flew past Jupiter and Saturn | SN-voyager-1 | "to fly by Jupiter and Saturn" |
| Entered interstellar space August 2012; first human-made object there | SN-voyager-1 | "crossed into interstellar space in August 2012"; "first human-made object to venture into interstellar space" |
| Magnetometer and plasma wave instrument on, others off | Where are Voyager 1 and 2 now | "Magnetometer (MAG) On"; "Plasma Wave Subsystem (PWS) On" |
| One light-day on November 18, 2026; 16.094 billion miles (25.902 billion km); first to reach it | Where are Voyager 1 and 2 now | "Voyager 1 will be the first human-made object to reach this distance" |
| Extended mission, still collecting data | SN-voyager-1 | "Status Extended Mission"; "continues to collect data" |

## apollo-11-eagle
| Claim | Source | Quote |
|---|---|---|
| Landed July 20, 1969 with Armstrong and Aldrin; first crewed vehicle on the Moon | NSSDCA-1969-059C | "was the first crewed vehicle to land on the Moon" |
| Four legs with round footpads; ladder | NSSDCA-1969-059C | "Four landing legs with round footpads" |
| Collected 21.55 kg of rock and soil | NSSDCA-1969-059C | "collected 21.55 kg of lunar rock and soil" |
| 21 hours 36 minutes on the surface; descent stage was the launch platform, left behind | NSSDCA-1969-059C | "after 21 hours, 36 minutes on the lunar surface"; "served as a platform for launching the ascent stage" |
| Plaque behind ladder: "We came in peace for all mankind" | NSSDCA-1969-059C | "plaque mounted on a strut behind the ladder" |
| Samples showed lava once flowed there | LROC image 484 | "was once the site of volcanic activity" |
| Seismometer sent first lunar seismic data | LROC image 484 | "provided the first lunar seismic data" |
| LRO photographed it from 24 km (15 miles); dark paths of footsteps | LROC image 484; SN Apollo 11 landing site | "captured from just 24 km (15 miles) above the surface"; "seen as dark paths" |
| Arizona: Flagstaff training; LROC SOC in Tempe | USGS; ASU-LROC | "Every astronaut who ever set foot on the Moon trained with the USGS"; "located on ASU's Tempe campus" |

## apollo-11-reflector
| Claim | Source | Quote |
|---|---|---|
| 100 glass prisms called corner cubes | NASA 2019 "Keeps on Giving" | "100 quartz glass prisms (called corner cubes)" |
| Placed July 1969 by Buzz Aldrin | ILRS Apollo 11; NASA 2019 | "Neil Armstrong and Buzz Aldrin deployed a variety of scientific experiments" |
| Needs no power | NSSDCA-1969-059C; NASA 2019 | "required no power"; "The arrays themselves require no power" |
| Light returns to where it came from | NSSDCA 1969-059C-04 | "reflected back to their point of origin" |
| Distance to within a few millimeters | NASA 2019 | "within a fraction of an inch (a few millimeters)" |
| Moon moves away 3.8 cm (1.5 in) a year | NASA 2019 | "increases by 1.5 inches (3.8 centimeters) a year" |
| Moon has a liquid (fluid) core | NASA 2019 | "the Moon has a fluid core" |
| Still working, 50+ years on | ILRS Apollo 11 | "more than 50 years later, still yields fundamental scientific data" |
| 2026: NASA scientists ranged to it from LRO | Mao et al., 57th LPSC (2026) #1707, NASA Goddard | "Successful ranging to the Apollo 11 and 14 LRAs" |
| Laser distance 357,000–407,000 km (distanceNote) | ILRS Apollo 11 | "(∼357,000 to 407,000 km)" |
| LROC image shows reflector and its cover | LROC image 484 | "Lunar Ranging RetroReflector (LRRR)" |
| worldNote: New Mexico, France, Italy, Germany | NASA 2019 | "observatories in New Mexico, France, Italy and Germany" |
| Laser experiment: light travels about 186,000 miles (300,000 km) a second | NASA "What is a light-day?" | "Moving through space about 186,000 miles every second" |
| Laser experiment: about {distance} away (item distanceKm, 384,400 km); echo time 2 × 384,400 ÷ 299,792.458 = 2.56 s, computed in code | NASA "What is a light-day?"; MOON | "238,855 miles (384,400 kilometers) from Earth"; "light can traverse that distance in 1.3 seconds" |

## opportunity
| Claim | Source | Quote |
|---|---|---|
| About the size of a golf cart | SN-opportunity | "about the size of a golf cart" |
| Landed January 2004 in airbags | NSSDCA-2003-032A | "airbags inflated to cushion the impact"; entry "25 January 2004" |
| Bounced at least 26 times; stopped in Eagle crater | SN-opportunity | "bounced at least 26 times"; "an impact crater known as Eagle" |
| Built for 90 Martian days; explored 14+ years | SN-opportunity; NSSDCA | "primary 90-sol mission"; "for over 14 years" |
| Found water once flowed | NASA release 2004-074 | "was soaking wet in the past" |
| First past a marathon, 26.219 mi (42.195 km), 2015 | SN-opportunity | "On March 25, 2015, NASA announced that having traveled 26.219 miles" |
| 2018 dust storm; last signal June 10, 2018 | SN-opportunity; NSSDCA | "severe Mars-wide dust storm"; "final communication… 10 June 2018" |
| Drove 28.06 mi (45.16 km); passed by Perseverance Oct 11, 2026 | SN-opportunity; NASA blog 2026-10-12 | "28.06 miles (45.16 kilometers)"; "Oct. 11, 2026 — the day it broke the off-world driving record" |
| Iron-nickel meteorite, basketball size | SN-opportunity | "basketball-sized rock… turned out to be an iron-nickel meteorite" |
| Resting in Perseverance Valley; mission complete Feb 13, 2019 | SN-opportunity | "Feb. 13, 2019: NASA declares End of Mission" |
| Arizona: HiRISE pictured it; team used images to plan drives | HiRISE ESP_011765_1780 | "routinely used by the Opportunity operations team" |

## spirit
| Claim | Source | Quote |
|---|---|---|
| Six wheels | NSSDCA-2003-027A | "a box-like chassis mounted on six wheels" |
| Landed January 2004, 20 days before twin Opportunity | NSSDCA; SN-opportunity | "landing on Mars… just 20 days after its twin rover, Spirit" |
| Built for 90 Martian days; worked 6+ years | SN-opportunity; SN-spirit | "primary 90-sol mission"; "operated for 6 years, 2 months, and 19 days" |
| Climbed Husband Hill, panoramas | SN-spirit | "making its way to the apex of Husband Hill" |
| Stuck wheel uncovered nearly pure silica; hot springs/steam vents; wetter Mars | SN-spirit | "Unearthed a patch of nearly pure silica"; "Mars was once much wetter" |
| First to grind into a rock on Mars | SN-spirit | "a feat performed for the very first time" |
| Dust devils cleaned solar panels | SN-spirit | "dust devils that swept dust from the top of the solar panels" |
| Stuck in soft soil beside Home Plate, 2009 | SN-spirit; NSSDCA | "beside the western edge of a low plateau called Home Plate" |
| Last message March 22, 2010 | NSSDCA-2003-027A | "last transmission from Spirit occurred on 22 March 2010" |
| Drove 4.8 mi (7.73 km) | SN-spirit; NSSDCA | "traveled 4.8 miles (7.73 kilometers)" |
| NASA ended recovery May 25, 2011 | SN-spirit | "officially concluded its recovery efforts May 25, 2011" |
| Seen from orbit; tracks erased by wind; HiRISE (UArizona) | HiRISE ESP_025815_1655 | "no obvious sign of rover tracks--erased by the wind" |

## ingenuity
| Claim | Source | Quote |
|---|---|---|
| About 4 lb (1.8 kg) | NSSDCA-2020-052A; SN-ingenuity | "has a mass of roughly 1.8 kg" |
| Rode under Perseverance's belly; landed Jezero, Feb 18, 2021 | NSSDCA-2020-052A | "mounted on the belly of the rover"; "landing took place on 18 February 2021" |
| Thin air; two counter-rotating rotors at almost 3,000 rpm | NSSDCA-2020-052A | "tenuous martian atmosphere"; "rotate at almost 3000 rpm" |
| April 19, 2021: hovered at 3 m; first powered, controlled flight on another planet | NSSDCA; SN-ingenuity | "hovering at 3 meters altitude"; "first aircraft to achieve powered, controlled flight" |
| Planned ≤5 flights; made 72; scout for Perseverance | SN-ingenuity | "no more than five test flights"; "serving as an aerial scout" |
| Last flight Jan 18, 2024; blade damaged landing | JPL 2024 | "one or more of its rotor blades sustained damage during landing" |
| 128.8 min, 10.5 mi (17.0 km), 78.7 ft (24.0 m) | SN-ingenuity | "Completed 128.8 flying minutes, covering 10.5 miles (17.0 kilometers)" |
| Mission ended Jan 25, 2024 | SN-ingenuity | "Mission completed on Jan. 25, 2024" |
| Valinor Hills, among sand | Mastcam-Z sol 1067 | "final resting spot is colloquially named Valinor Hills" |
| Arizona: Mastcam-Z credit includes ASU; page hosted at mastcamz.asu.edu | JPL 2024 | "Credit: NASA/JPL-Caltech/ASU/MSSS" |

## apollo-17-lrv
| Claim | Source | Quote |
|---|---|---|
| Electric car; folded inside the lunar module | NSSDCA LRV page | "an electric vehicle"; "hinged in the center so it could be folded up" |
| Landed December 11, 1972, Taurus-Littrow | NSSDCA-1972-096C | "landed at 19:54:57 UT… on 11 December 1972" |
| Driven by Cernan and Schmitt; two seats | NSSDCA LRV page | "one on Apollo 17 by Gene Cernan and Harrison Schmitt"; "two side-by-side foldable seats" |
| Each wheel its own electric motor; woven steel tires | NSSDCA LRV page | "Each wheel had its own electric drive"; "woven… steel strands" |
| Three drives; up to 7.6 km (4.7 mi) from lander | NSSDCA LRV page; LROC post 1278 | "used on three traverses"; "the greatest range from the LM was 7.6 km" |
| About 36 km (22 mi) total | NSSDCA LRV page (35.9 km) | "the rover went 35.9 km" |
| Parked so its camera could film liftoff | LROC post 1278 | "parked it facing west so the video camera could capture their liftoff" |
| 110.52 kg of samples; orange soil | NSSDCA-1972-096C | "collected 110.52 kg of lunar samples"; "Schmitt discovered a patch of orange soil" |
| Schmitt: discoveries not possible without the rover | NSSDCA LRV page | "would not have been possible" |
| Record until Opportunity passed it (announced 2013) | SN-opportunity | "a record set by the Apollo 17 Lunar Roving Vehicle" |
| Arizona: Flagstaff training; LROC in Tempe still imaging sites | USGS; ASU-LROC; LROC post 1278 | "LROC continues to image the Apollo sites" |

---

# Round 2 (added November 15, 2026)

Same method: every page opened and read in full from a saved copy (`curl`, then text-extracted), not search snippets.

## voyager-2
| Claim | Source | Quote |
|---|---|---|
| Launched August 20, 1977, 16 days before Voyager 1 | NSSDCA-1977-076A; SN-voyager-2 | "liftoff occurring 20 Aug. 1977"; "launched sixteen days after Voyager 2" |
| Golden record with sounds and pictures of Earth, greetings in 55 languages | NSSDCA-1977-076A | "sounds and images of Earth"; "greetings in 55 languages" |
| Jupiter 1979, Saturn 1981, Uranus 1986, Neptune 1989 | NSSDCA-1977-076A; SN-voyager-2 | "Jupiter (closest approach on 09 July 1979) and Saturn (26 August 1981)"; "Uranus (24 January 1986) and Neptune (25 August 1989)" |
| Only spacecraft to visit Uranus and Neptune; only one to study all four giants up close | SN-voyager-2 | "the only spacecraft to visit Uranus and Neptune"; "the only spacecraft to study all four of the solar system's giant planets at close range" |
| At Uranus: 10 new moons, two new rings | SN-voyager-2 | "At Uranus, Voyager 2 discovered 10 new moons and two new rings." |
| Entered interstellar space in 2018; second spacecraft to do so | SN-voyager-2; NASA advisory Nov. 10, 2026 | "the second spacecraft to enter interstellar space"; "Voyager 2 entered in 2018" |
| Three instruments on: magnetometer, plasma wave, cosmic ray; others off | Where are Voyager 1 and 2 now (updated April 17, 2026); Voyager blog Aug. 4, 2026 | "Cosmic Ray Subsystem (CRS) … On"; "keep its three instruments operating" |
| Off "to save power or because they wore out" | Where are Voyager 1 and 2 now | "Off to save power"; "Off because of degraded performance" |
| Extended mission (NASA's exact status wording) | SN-voyager-2 (modified Sept. 28, 2026) | "Status Extended Mission" |
| On pace for one light-day in November 2035 | What Is a Light-Day? (Nov. 12, 2026) | "on pace to be one light-day away from Earth in nine more years, in November 2035" |
| About 13.5 billion miles (21.7 billion km) from Earth | JPL Horizons, target -32, observer Earth, 2026-11-15 | "delta 144.876864912917" (AU); 1 AU = 149,597,870.7 km |

Conflicts (also in editorNote): interstellar entry Nov. 25 vs Dec. 10, 2018 on the same NASA page; Saturn flyby Aug. 25 vs 26, 1981; Neptune "five moons" vs "six new moons" on the same page, so no Neptune moon count is used.

## insight
| Claim | Source | Quote |
|---|---|---|
| Landed November 26, 2018 in Elysium Planitia, a flat, smooth plain near the equator | NSSDCA-2018-042A; SN-insight | "landed in the western Elysium Planitia region on 26 November 2018"; "landed near Mars' equator on the western side of a flat, smooth plain called Elysium Planitia" |
| Came to study the inside of Mars, not the surface; "like a doctor checking a heartbeat" | SN-insight | "InSight's purpose was to study the interior of Mars, not the surface"; "take the planet's vital signs: its pulse, temperature, and reflexes" |
| Robotic arm set the seismometer on the ground | SN-insight; NSSDCA | "It lifted a seismometer and heat flow probe from the deck and placed them on the surface" |
| First to detect marsquakes; more than 1,300 | SN-insight highlights; JPL Dec. 21, 2022 | "InSight made the first-ever detection of quakes on the Red Planet"; "over 1,300 seismic events"; "detected 1,319 marsquakes" |
| Some quakes caused by space rocks (meteoroid impacts) | JPL Dec. 21, 2022 | "including quakes caused by meteoroid impacts" |
| Dust on two round solar panels cut its power; arm sprinkled dirt on windy days | JPL Dec. 21, 2022; NSSDCA | "dust accumulating on the lander's solar panels gradually reduced its energy"; "sprinkle dirt from the scoop onto the panels during windy days"; "two disc-shaped solar panel arrays" |
| Last message December 15, 2022 | NSSDCA; SN-insight; JPL | "The last transmission from InSight was received on 15 December 2022" |
| Core is molten and bigger than expected | SN-insight highlights | "Mars' core is molten and considerably larger than expected" |
| Most weather data of any surface mission; thousands of dust devils | SN-insight highlights | "the most comprehensive weather data of any mission sent to the surface of Mars"; "detected thousands of passing dust devils" |
| Retired December 2022 after running out of power | NASA Dec. 16, 2024; JPL | "NASA retired InSight in December 2022, after the lander ran out of power" |
| Photographed from orbit October 23, 2024; panels now reddish-brown | NASA Dec. 16, 2024 | "on Oct. 23, 2024"; "acquired the same reddish-brown hue as the rest of the planet" |
| NASA said in December 2024 it would stop listening at the end of that year | NASA Dec. 16, 2024 | "NASA will stop listening for InSight at the end of this year" |
| HiRISE operated by the University of Arizona in Tucson | NASA Dec. 16, 2024; HiRISE ESP_061684_1845 | "The University of Arizona, in Tucson, operates HiRISE" |

Conflicts (also in editorNote): last signal Dec. 15 vs mission declared over Dec. 21, 2022; 1,319 marsquakes (JPL) vs "over 1,300 seismic events" (highlights).

## viking-1
| Claim | Source | Quote |
|---|---|---|
| Chryse Planitia, the Golden Plain | SN-viking-1; NSSDCA-1975-075C | "the western slopes of Chryse Planitia (Golden Plain)"; "touched down in western Chryse Planitia" |
| Touched down July 20, 1976 | SN-viking-1; HiRISE PSP_001521_2025 | "July 20, 1976: Lander touched down"; "touched down in western Chryse Planitia on 20 July 1976" |
| First truly successful landing on Mars; first pictures from the surface | SN-viking-1 | "NASA's Viking 1 made the first truly successful landing on Mars"; "began transmitting the first images from the surface of the Red Planet" |
| First picture began 25 seconds after landing | NSSDCA-1975-075C | "Transmission of the first surface image began 25 seconds after landing." |
| Job: look for signs of life | SN-viking-1 | "designed to reach Mars and collect evidence on the possibility on life on Mars" |
| July 28, 1976: arm scooped soil into a biology lab | SN-viking-1 | "On July 28, 1976, the lander's robot arm scooped up the first soil samples and deposited them into a special biological laboratory" |
| Some results looked a little like life; organics test negative | SN-viking-1 | "could have been construed as indicating the presence of life (weak positive), but the major test for organic compounds … gave negative results" |
| Temperatures −123 °F (−86 °C) to −27 °F (−33 °C) | SN-viking-1 | "minus 123 degrees Fahrenheit (minus 86 degrees Celsius) before dawn to minus 27 degrees Fahrenheit (minus 33 degrees Celsius) in the afternoon" |
| Weather reports for years | SN-viking-1 | "continued to return daily (and then eventually weekly) weather reports" |
| Renamed Thomas Mutch Memorial Station after the imaging team leader | NSSDCA; SN-viking-1 | "named the Thomas Mutch Memorial Station … in honor of the original leader of the Viking imaging team" |
| November 1982, a faulty command cut off contact | SN-viking-1; NSSDCA | "a faulty command sent from Earth resulted in an interruption of communications"; "operated until 13 November 1982 when contact was lost" |
| HiRISE found it in 2006, with likely heat shield, backshell and parachute | HiRISE PSP_001521_2025 | "Acquisition date 22 November 2006"; "likely locations have been found for the heat shield, backshell, and parachute" |
| HiRISE operated by the University of Arizona | HiRISE page | "is operated by the University of Arizona" |

Conflicts (also in editorNote): last contact 13 Nov. 1982 (NSSDCA, used) vs Nov. 11, 1982 (science.nasa.gov); renaming January 1981 (NSSDCA) vs January 1982 (science.nasa.gov), so no year is given.

## sojourner
| Claim | Source | Quote |
|---|---|---|
| Ares Vallis, an ancient flood plain | SN-mars-pathfinder; NSSDCA-1996-068A | "Ares Vallis … is an ancient flood plain in Mars' northern hemisphere"; "a large outwash plain" |
| 23 pounds (10.6 kg), 1 foot (30 cm) tall | SN-mars-pathfinder | "the 23-pound (10.6 kilogram) rover, Sojourner"; "its full height of 1 foot (30 centimeters)" |
| First-ever robotic rover on the surface of Mars | SN-mars-pathfinder | "deliver the first-ever robotic rover, Sojourner, to the Martian surface" |
| Named after Sojourner Truth, civil-rights crusader | SN-mars-pathfinder | "named Sojourner after American civil-rights crusader Sojourner Truth" |
| Landed July 4, 1997 in giant airbags; bounced about 15 times | SN-mars-pathfinder; NSSDCA | "bounced like a giant beach ball about 15 times"; "impacted at 16:56:55 UT … on 4 July 1997" |
| Rolled down a ramp on the second Martian day | SN-mars-pathfinder | "late in the second Martian day, or sol 2, Sojourner … rolled down the lander's rear ramp" |
| Studied rocks and soil; X-ray instrument measured their makeup | SN-mars-pathfinder | "Alpha Proton X-ray Spectrometer: Determined the elemental composition of rocks and soils"; "the Mars Pathfinder rover deploying its Alpha Proton X-Ray Spectrometer" |
| 550 pictures | SN-mars-pathfinder | "550 images from the rover" |
| Clues suggest Mars was once warm and wet | SN-mars-pathfinder | "Findings from … both the lander and the rover suggest that Mars was at one time in its past warm and wet" |
| Last message September 27, 1997 | SN-mars-pathfinder; NSSDCA | "the final data transmission on Sept. 27, 1997"; "until 27 September 1997 when communications were lost" |
| Lander now the Carl Sagan Memorial Station | SN-mars-pathfinder | "The lander, named the Carl Sagan Memorial Station" |
| December 2006 HiRISE image; a feature about its size, not in older pictures, may be Sojourner | HiRISE PSP_001890_1995 | "Acquisition date 21 December 2006"; "a feature at this location that is about the right size for Sojourner and that wasn't present when the Gallery Panorama was taken" |
| HiRISE Operations Center, University of Arizona, Tucson | HiRISE page footer | "HiRISE Operations Center 1541 E. University Blvd Tucson, Arizona"; "University of Arizona" |

Conflicts (also in editorNote): rover roll-off July 5 (US time, science.nasa.gov) vs 6 July UT (NSSDCA), so the letter says "my second Martian day"; "about 15" bounces (science.nasa.gov) vs a first bounce "and at least another 15" (NSSDCA).

---

# Round 3 (added November 15, 2026)

Same method: every page opened and read in full from a saved copy (`curl`, then text-extracted), not search snippets.

## surveyor-3
| Claim | Source | Quote |
|---|---|---|
| Robot lander with three legs | NSSDCA-1967-035A | "Three hinged landing legs were attached to the lower corners of the structure" |
| Landed April 20, 1967 | NSSDCA-1967-035A; SN-surveyor-3 | "final touchdown at 00:04:53 UT on 20 April 1967"; "April 20, 1967: Landed on the Moon" |
| Shiny rocks confused the radar; engines did not shut off; bounced twice | SN-surveyor-3; NSSDCA | "highly reflective rocks confused the lander's descent radar, and the main engine failed to cut off"; "bounced off the lunar surface twice"; "Touchdown on the lunar surface occurred three times" |
| Came to help the astronauts; was the ground strong enough | NSSDCA; SN-surveyor-3 | "to support the coming crewed Apollo landings"; "the lunar surface was solid enough to hold the weight of an Apollo lunar module" |
| Scoop on a long arm; trenches up to 18 cm (7 in) | NSSDCA; SN-surveyor-3 | "a 12 cm long by 5 cm wide scoop mounted on a 1.5 meter pantograph arm"; "dig up to 7 inches (18 centimeters) deep" |
| 6,326 pictures | NSSDCA; SN-surveyor-3 | "the television camera returned 6326 pictures"; "the first of 6,326 TV pictures" |
| Last message May 4, 1967; did not wake after the two-week night | NSSDCA | "The last data were returned on 04 May 1967 at 00:04 UT and Surveyor 3 failed to come back to life following the two week lunar night" |
| Two and a half years later, Conrad and Bean landed nearby, walked over, took the camera home | SN-surveyor-3; NSSDCA | "nearly two-and-a-half years of exposure on the Moon's surface"; "Pete Conrad and Alan Bean visited the spacecraft"; "removing about 10 kg of parts from the spacecraft, including the TV camera" |
| First Surveyor with a scoop | SN-surveyor-3 | "for the first time carried a surface-sampling instrument" |
| Pictures of an eclipse of the Sun by the Earth | NSSDCA | "Images of an eclipse of the Sun by the Earth and related thermal measurements were recorded" |
| On a slope inside a small crater; about 180 m (197 yd) from Apollo 12 | NSSDCA; SN-surveyor-3 | "came to rest on a 14 degree slope inside a subdued 200 meter crater"; "approximately 197 yards (180 meters) from the inactive Surveyor 3 lander" |
| Parts taken home so scientists could see how they changed | SN-surveyor-3 | "to allow scientists to evaluate the effects of nearly two-and-a-half years of exposure" |
| LROC photographed it, the Apollo 12 lander and tracks | LROC image 1135 | "The Lunar Module descent stage, Apollo Lunar Science Experiment Package (ALSEP), and Surveyor III spacecraft are all visible along with astronaut tracks" |
| Arizona: Flagstaff training; LROC SOC at ASU | USGS; ASU-LROC; LROC image 1135 | "Every astronaut who ever set foot on the Moon trained with the USGS in Flagstaff, Arizona"; "[NASA/GSFC/Arizona State University]" |

Conflicts (also in editorNote): touchdown time 00:04:17 vs 00:04:53 UT; Apollo 12 landing Nov. 19 (NSSDCA, LROC) vs Nov. 18 (science.nasa.gov) and visit Nov. 20 vs Nov. 19, so no Apollo 12 dates are used; last data May 4 (NSSDCA, used) vs "operated … to 3 May" (LROC). Cut: the camera's current display location (no 2026 source) and the disputed bacteria story.

## pioneer-10
| Claim | Source | Quote |
|---|---|---|
| Left Earth in March 1972 | NSSDCA-1972-012A; SN-pioneer-10 | "Launch Date: 1972-03-03"; "March 2, 1972 / 01:49:04 UT" |
| NASA's first mission to the outer planets | SN-pioneer-10 | "Pioneer 10 was NASA's first mission to the outer planets" |
| Entered the asteroid belt July 1972; first through it; fewer hits than expected | SN-pioneer-10 | "On July 15, 1972, the spacecraft entered the asteroid belt"; "First spacecraft to fly through the main asteroid belt"; "some asteroid hits, although fewer than expected" |
| December 1973, first to fly past Jupiter | SN-pioneer-10; NSSDCA | "Dec. 4, 1973: Pioneer 10's closest approach to Jupiter"; "First spacecraft to fly past Jupiter"; "the first to investigate the planet Jupiter" |
| About 500 pictures, including the Great Red Spot | SN-pioneer-10 | "took about 500 pictures of Jupiter's atmosphere … clearly showing such landmarks as the Great Red Spot" |
| First close-up pictures of Ganymede | SN-pioneer-10 | "It was the first spacecraft to obtain close-up images of Ganymede" |
| 1983, crossed Neptune's orbit; first beyond the farthest planet | SN-pioneer-10 | "crossed the orbit of Neptune (then the outermost planet) on June 13, 1983, thus becoming the first human-made object to go beyond the furthest planet" |
| Planned 21 months; more than 30 years | SN-pioneer-10 | "Originally designed for a 21-month mission to fly by Jupiter, Pioneer 10 lasted more than 30 years" |
| Last signal Jan. 23, 2003; took 11 h 20 min | SN-pioneer-10; NSSDCA | "on Jan. 23, 2003, it sent its last signal"; "That signal took 11 hours and 20 minutes to reach Earth"; "signal was last detected on 23 January 2003" |
| Jupiter's magnetic tail almost 800 million km, reaching Saturn's orbit | SN-pioneer-10 | "Jupiter's enormous magnetic tail, almost 800 million kilometers long, covered the whole distance between the two planets" |
| First to run on nuclear power alone | SN-pioneer-10 | "First spacecraft to use all-nuclear electrical power" |
| Heading toward red star Aldebaran; about two million years | NSSDCA; SN-pioneer-10 | "heading generally towards the red star Aldebaran"; "expected to pass by Aldebaran in about two million years" |
| Plaque: man, woman, where the Sun is | SN-pioneer-10; NSSDCA | "an aluminum plaque with diagrams of a man and a woman, the solar system, and its location relative to 14 pulsars"; "determine the position of the Sun" |
| About 13.1 billion miles (21.1 billion km), calculated | JPL Horizons, target -23, observer Earth, 2026-11-15 | "Target body name: Pioneer 10 (spacecraft) (-23) {source: pioneer_10_merged}"; "2026-Nov-15 00:00 141.358656970320" (AU) |

Conflicts (also in editorNote): launch 1972-03-03 (NSSDCA, used) vs March 2, 1972 01:49 UT (science.nasa.gov), so the letter says "March 1972"; four RTGs (NSSDCA) vs two (science.nasa.gov), so no number; Jupiter closest-approach distance 200,000 km vs 130,354 km, not used.

## dawn
| Claim | Source | Quote |
|---|---|---|
| Left Earth September 27, 2007 | NSSDCA-2007-043A; SN-dawn | "Launch Date: 2007-09-27"; "Launch Sept. 27, 2007" |
| Ion engines use electricity to shoot out xenon | SN-dawn ion propulsion; NSSDCA | "using an electrical charge to accelerate ions from xenon fuel"; "xenon which is ionized and accelerated by electrodes" |
| Each push about as strong as holding a sheet of paper; kept pushing for years | SN-dawn ion propulsion | "about the amount of force involved in holding a single piece of notebook paper in your hand"; "the ion propulsion system will operate for thousands of days" |
| 2011, reached Vesta, second-biggest world in the belt | NASA 2018-11-01; SN-dawn Vesta | "In 2011, when Dawn arrived at Vesta, the second largest world in the main asteroid belt" |
| First to orbit anything between Mars and Jupiter | NASA 2018-11-01 | "the spacecraft became the first to orbit a body in the region between Mars and Jupiter" |
| Mapped Vesta's craters and measured its gravity | SN-dawn Vesta | "Dawn mapped Vesta's geology, composition, cratering record and more. It determined Vesta's interior structure by measuring its gravity field" |
| Left Vesta in 2012 | NSSDCA | "Dawn departed Vesta on 5 September 2012" |
| 2015, orbit around Ceres, a dwarf planet; first to orbit two worlds beyond Earth; first to visit a dwarf planet | NASA 2018-11-01; NSSDCA | "In 2015, when Dawn went into orbit around Ceres, a dwarf planet … the mission became the first to visit a dwarf planet and go into orbit around two destinations beyond Earth"; "entered initial orbit around Ceres on 6 March 2015" |
| Oct. 31, 2018, used up the fuel that kept it pointed at Earth | SN-dawn mission status; NASA 2018-11-01 | "Dawn depleted its hydrazine propellant on Oct. 31"; "hydrazine, which keeps it oriented and in communication with Earth" |
| NASA announced the end Nov. 1, 2018 | NASA 2018-11-01 (dated "Nov 01, 2018") | "Dawn spacecraft has gone silent, ending a historic mission" |
| Still circling Ceres; at least 20 years, likely at least 50 | NASA 2018-11-01 | "Dawn will remain in orbit for at least 20 years, and engineers have more than 99 percent confidence the orbit will last for at least 50 years" |
| A group of meteorites on Earth came from Vesta | SN-dawn Vesta | "confirmed that Vesta is the parent body of the howardite-eucrite-diogenite (HED) meteorites" |
| Bright spots on Ceres are salts | SN-dawn Ceres | "'bright spots' and are deposits of carbonates and other salts" |
| One of the last pictures shows the bright spots of Occator Crater | NASA 2018-11-01 | "This photo of Ceres and the bright regions of Occator Crater was one of the last views NASA's Dawn spacecraft transmitted" |
| Ceres about 301.7 million km (distanceNote) | JPL Horizons, target 1 Ceres, observer Earth, 2026-11-15 | "2026-Nov-15 00:00 2.01671571762595" (AU) |

Conflicts (also in editorNote): no source gives the time of the last signal received (NSSDCA "communications ended on 31 October 2018"; NASA release: missed sessions Oct. 31 and Nov. 1), so lastContact is left out; NSSDCA mass 725 kg vs 747.1 kg dry; ion thrust 92 mN (NSSDCA) vs 91 mN (science.nasa.gov); neither number used.

## near-shoemaker
| Claim | Source | Quote |
|---|---|---|
| Left Earth February 17, 1996 | NSSDCA-1996-008A; SN-near-shoemaker | "Launch Date: 1996-02-17"; "Feb. 17, 1996: Launch" |
| Flew past Mathilde; covered with craters, less dense than thought | SN-near-shoemaker; NSSDCA | "the 4.5 billion-year-old asteroid is covered with craters and is less dense than previously believed"; "flyby of the 61 km diameter asteroid 253 Mathilde on June 27, 1997" |
| Feb. 14, 2000 orbit around Eros; first to orbit an asteroid | SN-near-shoemaker; NSSDCA | "Feb. 14, 2000: NEAR entered orbit around Eros becoming the first human-made object to orbit an asteroid"; "The mission was the first-ever to orbit an asteroid" |
| A month later renamed for geologist Eugene Shoemaker | SN-near-shoemaker | "on March 14, 2000, a month after entering asteroid orbit, NASA renamed the NEAR spacecraft NEAR Shoemaker in honor of Eugene M. Shoemaker (1928–1997), the renowned geologist" |
| Circled Eros for a year | NSSDCA | "designed to study the near Earth asteroid Eros from close orbit over a period of a year" |
| 160,000 pictures | SN-near-shoemaker | "The spacecraft returned about 10 times more data than originally planned, including 160,000 images" |
| Not built to land; slow descent; touched down Feb. 12, 2001 at 6.4 km/h (4 mph) | SN-near-shoemaker | "which was not designed as a lander"; "Following a slow, controlled descent"; "touched down on Eros at a gentle 4 miles per hour (6.4 kilometers per hour)" |
| First to land on an asteroid | SN-near-shoemaker; NSSDCA | "First spacecraft to land on an asteroid"; "This was the first spacecraft touchdown on an asteroid" |
| Data for about two more weeks; succumbed to the cold | SN-near-shoemaker | "returned valuable data, especially from its gamma-ray spectrometer, for about two weeks"; "the spacecraft having succumbed to the extreme cold" |
| Eros has no magnetic field | SN-near-shoemaker | "NEAR data showed that Eros had no magnetic field" |
| Eros smaller than expected; about 33 km (21 miles) long | SN-near-shoemaker; NSSDCA | "discovered that the minor planet was smaller than expected"; "the 21-mile long asteroid Eros"; "approximately 13 x 13 x 33 km in size" |
| South of a saddle-shaped area called Himeros | SN-near-shoemaker | "just south of a saddle-shaped feature named Himeros" |
| Last contact Feb. 28, 2001; Dec. 10, 2002 attempt failed | SN-near-shoemaker; NSSDCA | "The last contact with NEAR was Feb. 28, 2001"; "NASA's attempt to contact the probe nearly two years later on Dec. 10, 2002, was unsuccessful" |
| Arizona: Gene Shoemaker, USGS; founded Astrogeology Science Center in Flagstaff; led much Apollo training | USGS | "Much of the Apollo astronaut training was led by USGS scientist, Dr. Gene Shoemaker"; "founder of the USGS Astrogeology Science Center"; "the USGS Astrogeology Science Center is located in Flagstaff, Arizona" |
| Eros about 371.8 million km (distanceNote) | JPL Horizons, target 433 Eros, observer Earth, 2026-11-15 | "2026-Nov-15 00:00 2.48512906451361" (AU) |

Conflicts (also in editorNote): touchdown 19:44 UT (science.nasa.gov) vs 20:01:52 UT (NSSDCA), only the date is used; mass 805 kg vs 487 kg, not used; undated "355 million kilometers from Earth" (science.nasa.gov) not used, Horizons used instead.
