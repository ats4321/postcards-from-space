# Postcards from Space

**Live site:** <https://postcards-from-space.vercel.app/>

## Project summary

NASA hardware left on the Moon, Mars and beyond can feel like a list of old
machines. Postcards from Space turns 16 of those objects into short,
first-person postcards for children ages 8–12, families and classrooms. Each
postcard combines a real NASA image, credited source links, a simple science
story, its present location and one question. A correct answer earns a stamp
in a Mission Passport. Readers can filter the collection, follow a
distance ladder from Earth to Voyager 1, hear the letters read aloud and
switch between English and Spanish. It is a static, privacy-respecting site:
no account, analytics or cookie banner is needed.

## NASA data used

The app uses NASA NSSDCA catalog records and NASA mission pages as its primary
factual sources. It also credits and links NASA LROC imagery, University of
Arizona HiRISE imagery, NASA Photojournal, NASA Images and JPL Horizons for
where applicable. Source URLs and image credits are shown in the app and are
listed below.

## Other space-agency data used

None. The app uses NASA data; non-NASA institutions appear only where they
operate or host a cited NASA instrument or mission resource.

## Tools and languages

Vite, React 18, TypeScript (strict), Zod, CSS, Playwright, axe-core,
Lighthouse, Node.js scripts, Vercel and self-hosted WebP/PNG assets.

## 30-second demo video script

| Time | Shot | Narration/action |
| --- | --- | --- |
| 0–4 s | Home screen; Voyager countdown | “These are postcards from NASA hardware that is still out there.” |
| 4–10 s | Open Phoenix | “Phoenix writes from Mars. Meet the Phoenix team and the Phoenix lander.” |
| 10–16 s | Answer Phoenix quiz | Select the right answer; show the Passport stamp appearing. “Every answer earns a stamp.” |
| 16–21 s | Switch language | Switch to Spanish. “The full experience is available in Spanish, too.” |
| 21–30 s | Distance ladder | Move from the Moon and Mars outward to Voyager 1. “Follow the ladder all the way to Voyager 1—nearly a light-day from Earth.” |

## Performance (Lighthouse mobile, deployed URL, 15 Nov 2026)

Performance 100, Accessibility 100 (three runs). First-load transfer 390 KiB,
LCP 0.8 s, CLS 0, TBT 0 ms.

## Known limitations

- Image alt text, distance notes and item names are English-only.
- Three challenge-listed items are not covered: Apollo 12 ALSEP, Pioneer 11 and Kepler.
- The Spanish has not yet been reviewed by a native speaker.

## Full References

This list is generated from the same content records used by the app. It
includes every factual source, official mission page and image credit.

<!-- references:start -->
### Phoenix Mars Lander

Official page: <https://science.nasa.gov/mission/phoenix/>

- [NSSDCA Master Catalog: Phoenix Mars Lander](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-034A): NSSDCA ID 2007-034A; launch August 4, 2007; landing May 25, 2008; Peter H. Smith of the University of Arizona as mission principal investigator; last signal received November 2, 2008.
- [NASA Science: Phoenix](https://science.nasa.gov/mission/phoenix/): Landing May 25, 2008 on Vastitas Borealis, the arctic plains of Mars; dug into an ice-rich layer near the surface; bright clumps in a trench were water ice that vaporized after about four days; HiRISE photographed Phoenix under its parachute, the first time one spacecraft photographed another during a planetary landing.
- [NASA: Aeronautics and Astronautics: A Chronology, 2010](https://www.nasa.gov/wp-content/uploads/2023/04/sp4037.pdf): Mars Odyssey flew over the landing site 61 times in a final attempt to hear from Phoenix; NASA said operations ended in May 2010; HiRISE images showed the solar arrays had broken off under the weight of carbon dioxide ice.
- [HiRISE (University of Arizona): Phoenix Lander after One Mars Year](https://www.uahirise.org/ESP_017716_2485): HiRISE image taken May 7, 2010 shows the lander covered in dust with a solar panel that appears to have collapsed; winter carbon dioxide frost weighed the panels down; HiRISE is operated at the University of Arizona.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Voyager 1

Official page: <https://science.nasa.gov/mission/voyager/voyager-1/>

- [NSSDCA Master Catalog: Voyager 1](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A): NSSDCA ID 1977-084A; launch September 5, 1977.
- [NASA Science: Where Are Voyager 1 and Voyager 2 Now? (page updated Nov. 12, 2026)](https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/): Voyager 1 reaches one light-day, 16.094 billion miles (25.902 billion km), on Nov. 18, 2026 at 2:16:07 a.m. PST and is the first human-made object to reach that distance; a light-day is the distance light travels in 24 hours; the magnetometer and plasma wave subsystem are on and the other instruments are off; it flew past Jupiter and Saturn.
- [NASA Science: Voyager 1 (page updated Nov. 12, 2026)](https://science.nasa.gov/mission/voyager/voyager-1/): Launch September 5, 1977; entered interstellar space in August 2012; first human-made object to venture into interstellar space; status 'Extended Mission'; continues to collect data.

### Apollo 11 Lunar Module Eagle (descent stage)

Official page: <https://www.nasa.gov/mission/apollo-11/>

- [NSSDCA Master Catalog: Apollo 11 Lunar Module / EASEP](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C): NSSDCA ID 1969-059C; launch July 16, 1969; landing July 20, 1969 in the Sea of Tranquility; first crewed vehicle to land on the Moon; carried Neil Armstrong and Buzz Aldrin; four landing legs with round footpads and a ladder; plaque wording 'We came in peace for all mankind' on a strut behind the ladder; 21.55 kg of rock and soil collected; liftoff after 21 hours 36 minutes on the surface; the descent stage served as the launch platform and was left behind; the EASEP included a passive seismometer.
- [LROC (Arizona State University): A Stark Beauty All Its Own](https://www.lroc.asu.edu/images/484): Lunar Reconnaissance Orbiter image of the Apollo 11 site taken from 24 km (15 miles) above the surface, credited NASA/GSFC/Arizona State University; the Lunar Module and the dark paths of the astronauts' footsteps are visible; the seismic package provided the first lunar seismic data; the samples showed the site was once the site of volcanic activity and lava flows.
- [NASA Science: Apollo 11 Landing Site](https://science.nasa.gov/resource/apollo-11-landing-site/): The Apollo 11 descent stage, which the astronauts left behind, is visible in the LROC image along with the trails of the astronauts' footprints.
- [U.S. Geological Survey: The USGS in Space Exploration, Mission Operations, and Training](https://www.usgs.gov/science/science-explorer/planetary-science/usgs-in-space): arizonaNote: every astronaut who ever set foot on the Moon trained with the USGS in Flagstaff, Arizona.
- [ASU News, July 22, 2022: Capturing the moon](https://news.asu.edu/20220722-discoveries-capturing-moon): arizonaNote: the LROC Science Operations Center is on Arizona State University's Tempe campus.
- [NASA Science: Moon Facts](https://science.nasa.gov/moon/facts/): distanceKm: the Moon is an average of 238,855 miles (384,400 kilometers) away.

### Apollo 11 Laser Ranging Retroreflector

Official page: <https://www.nasa.gov/solar-system/the-apollo-experiment-that-keeps-on-giving/>

- [NSSDCA Master Catalog: Laser Ranging Retroreflector (Apollo 11)](https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04): Experiment ID 1969-059C-04; left on the lunar surface by the Apollo 11 crew; an array of fused silica cubes; laser beams from Earth are reflected back to their point of origin to measure the Earth-Moon distance precisely.
- [NSSDCA Master Catalog: Apollo 11 Lunar Module / EASEP](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C): Launch July 16, 1969; landing July 20, 1969 in the Sea of Tranquility; the laser ranging retroreflector required no power.
- [NASA, July 24, 2019: The Apollo Experiment That Keeps on Giving](https://www.nasa.gov/solar-system/the-apollo-experiment-that-keeps-on-giving/): Buzz Aldrin carried the reflector to its spot; the Apollo 11 array has 100 quartz glass prisms called corner cubes; the arrays need no power; observatories in New Mexico, France, Italy and Germany fire lasers at them and time the round trip; distance measured to within a few millimeters; the Moon moves away from Earth by 1.5 inches (3.8 centimeters) a year; laser data show the Moon has a fluid core.
- [NASA International Laser Ranging Service: Apollo 11 retroreflector](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html): Deployed in July 1969 by Neil Armstrong and Buzz Aldrin in Mare Tranquillitatis; more than 50 years later it still yields scientific data; the laser ranging distance is about 357,000 to 407,000 km.
- [Mao et al. (NASA Goddard), 57th Lunar and Planetary Science Conference (2026), abstract 1707: Laser Ranging from LRO-LOLA to Retro-Reflector Arrays on the Lunar Surface](https://www.hou.usra.edu/meetings/lpsc2026/pdf/1707.pdf): 2026 status: the laser altimeter on NASA's Lunar Reconnaissance Orbiter successfully ranges to the Apollo 11 reflector array from lunar orbit.
- [LROC (Arizona State University): A Stark Beauty All Its Own](https://www.lroc.asu.edu/images/484): arizonaNote: the LROC image, credited NASA/GSFC/Arizona State University, shows the reflector (LRRR) and its discarded cover; the reflector allows precise measurements to this day.
- [ASU News, July 22, 2022: Capturing the moon](https://news.asu.edu/20220722-discoveries-capturing-moon): arizonaNote: the LROC Science Operations Center is on Arizona State University's Tempe campus.
- [NASA Science: Moon Facts](https://science.nasa.gov/moon/facts/): distanceKm: the Moon is an average of 238,855 miles (384,400 kilometers) away.

### Opportunity rover

Official page: <https://science.nasa.gov/mission/mer-opportunity/>

- [NSSDCA Master Catalog: Opportunity](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A): NSSDCA ID 2003-032A; launch July 8, 2003 (UT); landing January 25, 2004 (UT) cushioned by airbags, stopping in a small crater; explored for over 14 years; final communication received June 10, 2018; six wheels, solar arrays and an instrument arm.
- [NASA Science: Opportunity](https://science.nasa.gov/mission/mer-opportunity/): About the size of a golf cart; bounced at least 26 times before stopping in Eagle crater in Meridiani Planum; designed to last 90 Martian days; found a basketball-sized iron-nickel meteorite near its heat shield in January 2005; first to exceed a marathon distance, 26.219 miles (42.195 km), announced March 25, 2015; went quiet in the Mars-wide dust storm of 2018, last signal June 10, 2018; final odometry 28.06 miles (45.16 km); record stood until Perseverance passed it on Oct. 11, 2026; resting spot is Perseverance Valley; NASA declared the mission complete on Feb. 13, 2019.
- [NASA news release 2004-074, March 2, 2004: Opportunity Rover Finds Strong Evidence Meridiani Planum Was Wet](https://nssdc.gsfc.nasa.gov/planetary/text/mer_pr_20040302.txt): Scientists concluded the part of Mars that Opportunity explored was soaking wet in the past; 'Liquid water once flowed through these rocks'.
- [NASA Science, Oct. 12, 2026: NASA's Perseverance Sets Off-World Record for Total Distance Driven](https://science.nasa.gov/blogs/perseverance-mars-rover/2026/10/12/nasas-perseverance-sets-off-world-record-for-total-distance-driven/): On Oct. 11, 2026, a drive pushed Perseverance's total past Opportunity's 28.06-mile (45.16-kilometer) record.
- [HiRISE (University of Arizona): Opportunity Imaged by HiRISE](https://www.uahirise.org/ESP_011765_1780): arizonaNote: HiRISE photographed Opportunity and its wheel tracks from orbit; HiRISE images were routinely used by the Opportunity team to plan drives; HiRISE is operated by the University of Arizona.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Spirit rover

Official page: <https://science.nasa.gov/mission/mer-spirit/>

- [NSSDCA Master Catalog: Spirit](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A): NSSDCA ID 2003-027A; launch June 10, 2003; landing January 4, 2004 (UT) in Gusev Crater; six wheels; lost the use of one wheel; stuck in sand in 2009; last transmission March 22, 2010; travelled a total of 7.73 km.
- [NASA Science: Spirit](https://science.nasa.gov/mission/mer-spirit/): Opportunity is its twin; first grinding of a rock on Mars with the rock abrasion tool (rock Adirondack); reached the summit of Husband Hill on Sept. 29, 2005 and took 360-degree panoramas; a front wheel stopped working and scraped up bright silica-rich soil, nearly pure silica, likely made by hot springs or steam vents, strong evidence ancient Mars was much wetter; dust devils and wind cleaned the solar panels and raised power; stuck in soft soil beside Home Plate in 2009; no contact after March 22, 2010; NASA ended recovery efforts May 25, 2011; traveled 4.8 miles (7.73 kilometers); operated 6 years, 2 months and 19 days, more than 25 times its intended lifetime.
- [NASA Science: Opportunity](https://science.nasa.gov/mission/mer-opportunity/): Opportunity landed 20 days after Spirit; both rovers were designed to last 90 Martian days.
- [HiRISE (University of Arizona): Spirit Lander and Bonneville Crater in Color](https://www.uahirise.org/ESP_025815_1655): today and arizonaNote: the rover can still be seen from orbit near Home Plate in the Columbia Hills; its tracks have been erased by the wind; HiRISE is operated by the University of Arizona.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Ingenuity Mars Helicopter

Official page: <https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/>

- [NSSDCA Master Catalog: Mars 2020 (Perseverance, with the Ingenuity helicopter)](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2020-052A): NSSDCA ID 2020-052A; launch July 30, 2020; landing February 18, 2021 in Jezero Crater; mass of roughly 1.8 kg; twin counter-rotating blades turning at almost 3000 rpm; mounted on the belly of the rover; flies in the thin Martian atmosphere; first flight April 19, 2021, hovering at 3 meters altitude.
- [NASA Science: Ingenuity Mars Helicopter](https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/): First powered, controlled flight on another planet on April 19, 2021; designed for no more than five test flights; completed 72 flights across nearly three years; last flight Jan. 18, 2024; mission completed Jan. 25, 2024; 128.8 flying minutes, 10.5 miles (17.0 kilometers), altitudes as high as 78.7 feet (24.0 meters); 3.97 pounds (1.8 kilograms); served as an aerial scout previewing areas for the Perseverance rover.
- [NASA news release, Jan. 25, 2024: After Three Years on Mars, NASA's Ingenuity Helicopter Mission Ends](https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/): A rotor blade was damaged during the landing of the Jan. 18, 2024 flight and the helicopter can no longer fly; end of mission announced Jan. 25, 2024.
- [Mastcam-Z (Arizona State University): Sol 1067, Valinor Hills, Ingenuity's Final Resting Place](https://mastcamz.asu.edu/galleries/sol-1067-ingenuity-pdi-mastcam-z-mosaic/): locationName, today and arizonaNote: the final resting spot is informally named Valinor Hills and is surrounded by sand; Perseverance's Mastcam-Z photographed Ingenuity there; the Mastcam-Z team page is hosted at Arizona State University.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Apollo 17 Lunar Roving Vehicle

Official page: <https://www.nasa.gov/mission/apollo-17/>

- [NSSDCA: The Apollo Lunar Roving Vehicle](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html): An electric vehicle; driven on Apollo 17 by Gene Cernan and Harrison Schmitt on three traverses; went 35.9 km; greatest range from the lunar module 7.6 km; folded and stored in the lunar module; two side-by-side seats; tires of woven steel strands; each wheel had its own electric drive motor; TV camera; Harrison Schmitt's statement that the major discoveries of Apollo 15, 16 and 17 would not have been possible without the rover.
- [NSSDCA Master Catalog: Apollo 17 Lunar Module / ALSEP](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096C): NSSDCA ID 1972-096C; launch December 7, 1972; landing December 11, 1972 in the Taurus-Littrow area; the lunar module carried the Lunar Roving Vehicle; 110.52 kg of lunar samples collected; Schmitt discovered a patch of orange soil on the second moonwalk.
- [LROC (Arizona State University): Apollo 17 Remains Unchallenged After Fifty Years](https://www.lroc.asu.edu/posts/1278): Cernan parked the rover so its video camera could capture the liftoff; the farthest drive reached about 4.7 miles (7.6 kilometers) from the lunar module; the landing site hardware remains preserved on the surface; LROC continues to image the Apollo sites.
- [NASA Science: Opportunity](https://science.nasa.gov/mission/mer-opportunity/): today: on May 16, 2013 NASA announced Opportunity had passed the record for the farthest distance traveled by any NASA vehicle on another celestial body, set by the Apollo 17 Lunar Roving Vehicle in December 1972 (22.21 miles).
- [U.S. Geological Survey: The USGS in Space Exploration, Mission Operations, and Training](https://www.usgs.gov/science/science-explorer/planetary-science/usgs-in-space): arizonaNote: every astronaut who ever set foot on the Moon trained with the USGS in Flagstaff, Arizona.
- [ASU News, July 22, 2022: Capturing the moon](https://news.asu.edu/20220722-discoveries-capturing-moon): arizonaNote: the LROC Science Operations Center is on Arizona State University's Tempe campus.
- [NASA Science: Moon Facts](https://science.nasa.gov/moon/facts/): distanceKm: the Moon is an average of 238,855 miles (384,400 kilometers) away.

### Voyager 2

Official page: <https://science.nasa.gov/mission/voyager/voyager-2/>

- [NSSDCA Master Catalog: Voyager 2](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-076A): NSSDCA ID 1977-076A; launch 20 Aug. 1977; first of the two Voyagers to launch, sixteen days before Voyager 1; flybys of Jupiter (9 July 1979), Saturn (26 August 1981), Uranus (24 January 1986) and Neptune (25 August 1989); 12-inch gold-plated copper disk with sounds and images of Earth, including greetings in 55 languages.
- [NASA Science: Voyager 2 (page modified Sept. 28, 2026)](https://science.nasa.gov/mission/voyager/voyager-2/): Status: Extended Mission; launch Aug. 20, 1977; only spacecraft to visit Uranus and Neptune; only spacecraft to study all four giant planets at close range; first human-made object to fly past Uranus and to fly by Neptune; at Uranus discovered 10 new moons and two new rings; entered interstellar space in 2018, the second spacecraft to do so; the Neptune flyby capped a 12-year tour of the giant planets.
- [NASA Science: Where Are Voyager 1 and Voyager 2 Now? (instrument table updated April 17, 2026)](https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/): Voyager 2 instrument status: Cosmic Ray Subsystem On, Magnetometer On, Plasma Wave Subsystem On; all other instruments off; Voyager 1 and Voyager 2 are the only spacecraft to ever operate outside the heliosphere.
- [NASA Voyager blog, Aug. 4, 2026: NASA Engineers Help Prolong Voyager 2's Science Mission](https://science.nasa.gov/blogs/voyager/2026/08/04/nasa-engineers-help-prolong-voyager-2s-science-mission/): Voyager 2 is operating three science instruments in interstellar space; engineers freed up power to keep them on for at least an extra year.
- [NASA Science: Voyager 1: What Is a Light-Day? (Nov. 12, 2026)](https://science.nasa.gov/mission/voyager/voyager-1/voyager-1-what-is-a-light-day/): Voyager 2 took a different path to visit Uranus and Neptune and is on pace to be one light-day from Earth in November 2035.
- [NASA JPL Horizons: Voyager 2 (-32) range from Earth, Nov. 15, 2026](https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='-32'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2026-11-15'&STOP_TIME='2026-11-16'&STEP_SIZE='1d'&QUANTITIES='20'): distanceKm and today: on Nov. 15, 2026 Voyager 2 was 144.88 AU from Earth (about 21.67 billion km, 13.47 billion miles).

### InSight Mars Lander

Official page: <https://science.nasa.gov/mission/insight/>

- [NSSDCA Master Catalog: InSight](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A): NSSDCA ID 2018-042A; launch 5 May 2018; landed in western Elysium Planitia on 26 November 2018; two disc-shaped solar panels and three legs; robotic arm placed the seismometer and heat flow probe on the ground; the mole only reached about 40 cm deep; last transmission 15 December 2022; mission declared over on 21 December 2022.
- [NASA Science: InSight Lander (page modified June 23, 2026)](https://science.nasa.gov/mission/insight/): Launched May 5, 2018; landed Nov. 26, 2018 in Elysium Planitia, a flat, smooth plain near Mars' equator; end of mission Dec. 15, 2022; studied the deep interior of Mars and took its 'vital signs'; built on the design of the Phoenix lander; robotic arm over 5 feet 9 inches (1.8 meters) long.
- [NASA Science: InSight Science Highlights (page modified June 23, 2026)](https://science.nasa.gov/mission/insight/science-highlights/): First-ever detection of quakes on Mars; over 1,300 seismic events; Mars' core is molten and larger than expected, about 1,800 km in radius; crust about 25 to 40 km thick under InSight; most comprehensive weather data of any Mars surface mission; detected thousands of passing dust devils with its pressure sensor.
- [NASA, Dec. 21, 2022: NASA Retires InSight Mars Lander Mission After Years of Science](https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/?site=insight): The mission ended after more than four years on Mars; last contact Dec. 15; detected 1,319 marsquakes, including quakes caused by meteoroid impacts; dust on the solar panels reduced its power; the arm's scoop sprinkled dirt on the panels on windy days to sweep dust off; the mole could not dig deep in the clumpy soil.
- [NASA, Dec. 16, 2024: NASA Mars Orbiter Spots Retired InSight Lander to Study Dust Movement](https://www.nasa.gov/missions/insight/nasa-mars-orbiter-spots-retired-insight-lander-to-study-dust-movement/): today and arizonaNote: HiRISE photographed the retired lander on Oct. 23, 2024; its solar panels have the same reddish-brown hue as the ground; NASA will stop listening for InSight at the end of 2024; InSight was the first to detect marsquakes, revealing details of the crust, mantle and core; the University of Arizona in Tucson operates HiRISE.
- [HiRISE (University of Arizona): The Best HiRISE Image of the InSight Lander](https://www.uahirise.org/ESP_061684_1845): arizonaNote: HiRISE image of Sept. 23, 2019 clearly shows the two circular solar panels and the bright seismometer cover.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Viking 1 Lander

Official page: <https://science.nasa.gov/mission/viking-1/>

- [NSSDCA Master Catalog: Viking 1 Lander](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C): NSSDCA ID 1975-075C; launch 20 August 1975; landed in western Chryse Planitia; transmission of the first surface image began 25 seconds after landing; studied biology, chemistry, weather and the surface; sampler arm; biology experiment and gas chromatograph mass spectrometer; seismometer failed to uncage; named the Thomas Mutch Memorial Station after the original leader of the Viking imaging team; operated until 13 November 1982 when contact was lost.
- [NASA Science: Viking 1 (page modified July 20, 2026)](https://science.nasa.gov/mission/viking-1/): Touched down July 20, 1976 and began transmitting the first images from the surface of Mars; first truly successful landing on Mars; landed on the western slopes of Chryse Planitia (Golden Plain); designed to collect evidence on the possibility of life; robot arm scooped soil samples on July 28, 1976 into a biological laboratory; results could have been read as a weak positive, but the test for organic compounds was negative; temperatures from minus 123 F (minus 86 C) before dawn to minus 27 F (minus 33 C) in the afternoon; daily and later weekly weather reports; a faulty command from Earth interrupted communications in November 1982.
- [HiRISE (University of Arizona): Viking Lander 1 (Thomas Mutch Memorial Station)](https://www.uahirise.org/PSP_001521_2025): today and arizonaNote: HiRISE image acquired 22 November 2006 precisely locates the lander, about 3 meters across, in western Chryse Planitia, with likely locations for the heat shield, backshell and parachute; landed 20 July 1976; HiRISE is operated by the University of Arizona.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Sojourner rover

Official page: <https://science.nasa.gov/mission/mars-pathfinder/>

- [NSSDCA Master Catalog: Mars Pathfinder](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A): NSSDCA ID 1996-068A; launch 4 December 1996; landed 4 July 1997 in the Ares Vallis region, an outwash plain carved by a huge flood; air bags formed a protective ball around the lander, which bounced and rolled before stopping; rover rolled onto the surface on 6 July (UT); lander named the Sagan Memorial Station; images and experiments by lander and rover until 27 September 1997 when communications were lost.
- [NASA Science: Mars Pathfinder (page modified Sept. 29, 2026)](https://science.nasa.gov/mission/mars-pathfinder/): Delivered the first-ever robotic rover, Sojourner, to the Martian surface; rover weighs 23 pounds (10.6 kilograms) and stands 1 foot (30 centimeters) tall; named after civil-rights crusader Sojourner Truth; lander named the Carl Sagan Memorial Station; landed July 4, 1997 in Ares Vallis, an ancient flood plain; first use of the airbag landing technique; bounced about 15 times; rover rolled down the lander's ramp on sol 2; 550 images from the rover; Alpha Proton X-ray Spectrometer on the rover determined the elemental composition of rocks and soils; findings from lander and rover suggest Mars was once warm and wet; final data transmission Sept. 27, 1997.
- [HiRISE (University of Arizona): Mars Pathfinder Landing Site](https://www.uahirise.org/PSP_001890_1995): today and arizonaNote: HiRISE image acquired 21 December 2006 shows the Pathfinder lander, ramps and airbags; the proposed current location of Sojourner is a feature about the right size that was not present in the lander's Gallery Panorama; HiRISE Operations Center, University of Arizona, Tucson.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Surveyor 3

Official page: <https://science.nasa.gov/mission/surveyor-3/>

- [NSSDCA Master Catalog: Surveyor 3](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A): NSSDCA ID 1967-035A; launch 17 April 1967; second Surveyor to soft-land; program goal to support the crewed Apollo landings; three landing legs; surface sampler scoop on a 1.5 m arm; touchdown occurred three times because the vernier engines kept firing; landed 20 April 1967 on a 14 degree slope inside a 200 m crater in Oceanus Procellarum; trenches as deep as 18 cm; 6,326 pictures; images of an eclipse of the Sun by the Earth; last data 04 May 1967; did not come back to life after the two-week lunar night; Apollo 12 landed within about 180 m; Pete Conrad and Alan Bean removed about 10 kg of parts including the TV camera.
- [NASA Science: Surveyor 3](https://science.nasa.gov/mission/surveyor-3/): Key dates: launch April 17, 1967, landed April 20, 1967; first Surveyor to carry a surface-sampling instrument, digging up to 7 inches (18 centimeters); reflective rocks confused the descent radar and the lander bounced twice; 6,326 TV pictures; scientists concluded the surface was solid enough to hold an Apollo lunar module; Apollo 12 landed about 197 yards (180 meters) away; the astronauts recovered parts including the scoop and camera to study the effects of nearly two-and-a-half years on the Moon.
- [LROC (Arizona State University): Apollo 12 Fifty-first Anniversary](https://lroc.im-ldi.com/images/1135): today and arizonaNote: LROC low-altitude image shows the Apollo 12 descent stage, the ALSEP and the Surveyor III spacecraft with astronaut tracks; image credit NASA/GSFC/Arizona State University; Intrepid landed within 200 meters of Surveyor III, which operated from 20 April to 3 May 1967.
- [U.S. Geological Survey: The USGS in Space Exploration, Mission Operations, and Training](https://www.usgs.gov/science/science-explorer/planetary-science/usgs-in-space): arizonaNote: every astronaut who ever set foot on the Moon trained with the USGS in Flagstaff, Arizona.
- [ASU News, July 22, 2022: Capturing the moon](https://news.asu.edu/20220722-discoveries-capturing-moon): arizonaNote: the LROC Science Operations Center is at Arizona State University.
- [NASA Science: Moon Facts](https://science.nasa.gov/moon/facts/): distanceKm: the Moon is an average of 238,855 miles (384,400 kilometers) away.

### Pioneer 10

Official page: <https://science.nasa.gov/mission/pioneer-10/>

- [NSSDCA Master Catalog: Pioneer 10](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A): NSSDCA ID 1972-012A; launch date 1972-03-03; first mission to the outer solar system and first to investigate Jupiter; closest approach to Jupiter on 04 December 1973; heading generally towards the red star Aldebaran, a journey of about two million years; signal last detected on 23 January 2003; plaque with drawings of a man, a woman and the location of the Sun and Earth in our galaxy.
- [NASA Science: Pioneer 10](https://science.nasa.gov/mission/pioneer-10/): NASA's first mission to the outer planets; entered the asteroid belt July 15, 1972, first spacecraft to fly through it, with fewer asteroid hits than expected; first to fly past Jupiter, closest approach Dec. 4, 1973; about 500 pictures of Jupiter's atmosphere showing the Great Red Spot; first close-up images of Ganymede; Jupiter's magnetic tail, almost 800 million km long, covers the distance between Jupiter and Saturn; crossed Neptune's orbit June 13, 1983, the first human-made object to go beyond the farthest planet; designed for 21 months, lasted more than 30 years; last signal Jan. 23, 2003, which took 11 hours and 20 minutes to reach Earth; first spacecraft to use all-nuclear electrical power; aluminum plaque with a man, a woman, the solar system and its location relative to 14 pulsars; expected to pass by Aldebaran in about two million years.
- [NASA JPL Horizons: Pioneer 10 (-23) range from Earth, Nov. 15, 2026](https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='-23'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2026-11-15'&STOP_TIME='2026-11-16'&STEP_SIZE='1d'&QUANTITIES='20'): distanceKm and today: on Nov. 15, 2026 Pioneer 10's calculated position was 141.36 AU from Earth (about 21.15 billion km, 13.14 billion miles).

### Dawn

Official page: <https://science.nasa.gov/mission/dawn/>

- [NSSDCA Master Catalog: Dawn](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A): NSSDCA ID 2007-043A; launch 27 September 2007; ion propulsion using xenon that is ionized and accelerated; reached Vesta 16 July 2011; departed Vesta 5 September 2012; entered orbit around Ceres 6 March 2015; communications ended 31 October 2018; remained in orbit around Ceres.
- [NASA Science: Dawn](https://science.nasa.gov/mission/dawn/): Launch Sept. 27, 2007; stays at giant asteroid Vesta and dwarf planet Ceres, both in the main asteroid belt between Mars and Jupiter; type Orbiter; status Successful.
- [NASA news release, Nov. 1, 2018: NASA's Dawn Mission to Asteroid Belt Comes to End](https://www.nasa.gov/news-release/nasas-dawn-mission-to-asteroid-belt-comes-to-end/): Dawn has gone silent, ending its mission; ran out of hydrazine and missed communications on Oct. 31 and Nov. 1, 2018; turned science fiction into science fact with ion propulsion; at Vesta in 2011, the first spacecraft to orbit a body between Mars and Jupiter; at Ceres in 2015, the first to visit a dwarf planet and to orbit two destinations beyond Earth; will stay in orbit at least 20 years, with more than 99 percent confidence of at least 50 years; one of the last views showed the bright regions of Occator Crater.
- [NASA Science: Dawn Mission Status](https://science.nasa.gov/mission/dawn/mission-status/): Dawn depleted its hydrazine propellant on Oct. 31, 2018; without it Dawn cannot point its solar arrays at the Sun or its antenna at Earth; Dawn is now an inert spacecraft in orbit around Ceres.
- [NASA Science: Dawn Ion Propulsion](https://science.nasa.gov/mission/dawn/technology/ion-propulsion/): Ion engines use an electrical charge to accelerate ions from xenon fuel; each engine's push is about the force of holding a single sheet of notebook paper; it would take four days to go from 0 to 60 mph; ion propulsion let Dawn orbit two different solar system bodies, a first.
- [NASA Science: Dawn at Vesta](https://science.nasa.gov/mission/dawn/science/vesta/): Vesta is the second largest object in the asteroid belt; Dawn confirmed Vesta is the parent body of the HED meteorites found on Earth.
- [NASA Science: Dawn at Ceres](https://science.nasa.gov/mission/dawn/science/ceres/): Ceres is a dwarf planet; its bright spots are deposits of carbonates and other salts; Occator Crater is home to the brightest area on Ceres.
- [NASA JPL Horizons: Ceres range from Earth, Nov. 15, 2026](https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='DES=2000001%3B'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2026-11-15'&STOP_TIME='2026-11-16'&STEP_SIZE='1d'&QUANTITIES='20'): distanceKm: on Nov. 15, 2026 Ceres was 2.02 AU from Earth (about 301.7 million km, 187.5 million miles).

### NEAR Shoemaker

Official page: <https://science.nasa.gov/mission/near-shoemaker/>

- [NSSDCA Master Catalog: NEAR Shoemaker](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A): NSSDCA ID 1996-008A; launch 1996-02-17; renamed in honor of Gene Shoemaker; first-ever to orbit an asteroid and to touch down on one; flew within 1,200 km of asteroid 253 Mathilde on June 27, 1997; orbit insertion at Eros 14 February 2000; Eros about 13 x 13 x 33 km; touchdown in the saddle region of Eros on 12 February 2001; final contact 28 February 2001; later contact attempt on 10 December 2002 unsuccessful.
- [NASA Science: NEAR Shoemaker](https://science.nasa.gov/mission/near-shoemaker/): Launch Feb. 17, 1996; Mathilde flyby June 27, 1997 showed it covered with craters and less dense than previously believed; entered orbit around Eros Feb. 14, 2000, the first human-made object to orbit an asteroid; renamed March 14, 2000 in honor of geologist Eugene M. Shoemaker; not designed as a lander, touched down Feb. 12, 2001 at 4 miles per hour (6.4 km/h) just south of a saddle-shaped feature named Himeros; first spacecraft to land on an asteroid; returned data for about two weeks; last contact Feb. 28, 2001 after succumbing to the extreme cold; contact attempt Dec. 10, 2002 failed; Eros has no magnetic field; 21-mile long asteroid; returned 160,000 images.
- [U.S. Geological Survey: The USGS in Space Exploration, Mission Operations, and Training](https://www.usgs.gov/science/science-explorer/planetary-science/usgs-in-space): arizonaNote: the USGS Astrogeology Science Center is in Flagstaff, Arizona; much of the Apollo astronaut training was led by USGS scientist Dr. Gene Shoemaker, founder of the USGS Astrogeology Science Center.
- [NASA JPL Horizons: 433 Eros range from Earth, Nov. 15, 2026](https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='433%3B'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2026-11-15'&STOP_TIME='2026-11-16'&STEP_SIZE='1d'&QUANTITIES='20'): distanceKm: on Nov. 15, 2026 Eros was 2.49 AU from Earth (about 371.8 million km, 231 million miles).

### Images

- `phoenix`: NASA/JPL-Caltech/University of Arizona/Texas A&M University. <https://photojournal.jpl.nasa.gov/catalog/PIA11719> (NASA image, free to use under NASA's media usage guidelines.)
- `phoenix-now`: NASA/JPL-Caltech/University of Arizona. <https://www.uahirise.org/PSP_008591_2485> (NASA image, free to use under NASA's media usage guidelines.)
- `voyager-1`: NASA/JPL-Caltech. <https://photojournal.jpl.nasa.gov/catalog/PIA26353> (NASA image, free to use under NASA's media usage guidelines.)
- `apollo-11-eagle`: NASA. <https://images.nasa.gov/details/as11-40-5915> (NASA image, free to use under NASA's media usage guidelines.)
- `apollo-11-site-now`: NASA/GSFC/Arizona State University. <https://lroc.im-ldi.com/images/484> (NASA image, free to use under NASA's media usage guidelines.)
- `apollo-11-reflector`: NASA. <https://images.nasa.gov/details/as11-40-5948> (NASA image, free to use under NASA's media usage guidelines.)
- `opportunity`: NASA/JPL-Caltech/Cornell Univ./Arizona State Univ.. <https://photojournal.jpl.nasa.gov/catalog/PIA18079> (NASA image, free to use under NASA's media usage guidelines.)
- `opportunity-now`: NASA/JPL-Caltech/University of Arizona. <https://www.uahirise.org/ESP_056955_1775> (NASA image, free to use under NASA's media usage guidelines.)
- `spirit`: NASA/JPL/Cornell. <https://photojournal.jpl.nasa.gov/catalog/PIA07371> (NASA image, free to use under NASA's media usage guidelines.)
- `spirit-now`: NASA/JPL-Caltech/University of Arizona. <https://www.uahirise.org/ESP_021925_1650> (NASA image, free to use under NASA's media usage guidelines.)
- `ingenuity`: NASA/JPL-Caltech/ASU/MSSS. <https://photojournal.jpl.nasa.gov/catalog/PIA25881> (NASA image, free to use under NASA's media usage guidelines.)
- `ingenuity-now`: NASA/JPL-Caltech/ASU/MSSS. <https://photojournal.jpl.nasa.gov/catalog/PIA26236> (NASA image, free to use under NASA's media usage guidelines.)
- `apollo-17-lrv`: NASA. <https://images.nasa.gov/details/as17-147-22527> (NASA image, free to use under NASA's media usage guidelines.)
- `apollo-17-lrv-now`: NASA/GSFC/Arizona State University. <https://lroc.im-ldi.com/images/379> (NASA image, free to use under NASA's media usage guidelines.)
- `insight`: NASA/JPL-Caltech. <https://photojournal.jpl.nasa.gov/catalog/PIA22876> (NASA image, free to use under NASA's media usage guidelines.)
- `insight-now`: NASA/JPL-Caltech/University of Arizona. <https://www.uahirise.org/ESP_061684_1845> (NASA image, free to use under NASA's media usage guidelines.)
- `viking-1`: NASA/JPL. <https://photojournal.jpl.nasa.gov/catalog/PIA00381> (NASA image, free to use under NASA's media usage guidelines.)
- `viking-1-now`: NASA/JPL-Caltech/University of Arizona. <https://www.uahirise.org/PSP_001521_2025> (NASA image, free to use under NASA's media usage guidelines.)
- `sojourner`: NASA/JPL. <https://photojournal.jpl.nasa.gov/catalog/PIA01122> (NASA image, free to use under NASA's media usage guidelines.)
- `sojourner-now`: NASA/JPL-Caltech/University of Arizona. <https://www.uahirise.org/PSP_001890_1995> (NASA image, free to use under NASA's media usage guidelines.)
- `voyager-2`: NASA/JPL-Caltech. <https://photojournal.jpl.nasa.gov/catalog/PIA21736> (NASA image, free to use under NASA's media usage guidelines.)
- `pioneer-10`: NASA Ames Research Center. <https://images.nasa.gov/details/ARC-1972-AC72-2135> (NASA image, free to use under NASA's media usage guidelines.)
- `surveyor-3`: NASA. <https://images.nasa.gov/details/as12-48-7121> (NASA image, free to use under NASA's media usage guidelines.)
- `surveyor-3-now`: NASA/GSFC/Arizona State University. <https://lroc.im-ldi.com/images/1135> (NASA image, free to use under NASA's media usage guidelines.)
- `apollo-12-alsep`: NASA. <https://images.nasa.gov/details/as12-47-6918> (NASA image, free to use under NASA's media usage guidelines.)
- `apollo-12-alsep-now`: NASA/GSFC/Arizona State University. <https://lroc.im-ldi.com/images/401> (NASA image, free to use under NASA's media usage guidelines.)
- `dawn`: NASA/JPL. <https://photojournal.jpl.nasa.gov/catalog/PIA12018> (NASA image, free to use under NASA's media usage guidelines.)
- `near-shoemaker`: NASA. <https://images.nasa.gov/details/9701593> (NASA image, free to use under NASA's media usage guidelines.)
- `pioneer-11`: NASA. <https://images.nasa.gov/details/KSC-73P-0116> (NASA image, free to use under NASA's media usage guidelines.)
- `kepler`: NASA/JPL-Caltech/Ball Aerospace. <https://photojournal.jpl.nasa.gov/catalog/PIA11188> (NASA image, free to use under NASA's media usage guidelines.)
<!-- references:end -->
