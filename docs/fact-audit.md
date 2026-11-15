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
