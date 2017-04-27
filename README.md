# litter-app
Facilitating the planning and organisation of fly-tip cleanups.

[Link to prototype](https://github.com/JWLD/litter-locator)

#### User Journeys
- People can document litter sites (i.e. fly-tipping, build-ups of illegal litter, or undesirable waste located in public areas), and report details of its size, location, and type.

- Volunteers and concerned citizens can then browse documented litter sites by location using map UIs, and view the litter sites' details in order to plan cleanups to remove the waste.

#### User Stories
- [ ] As someone visiting the page I want to be presented with a brief description of the app's purpose, so I can determine whether it's of use to me.

- [ ] As a user of the app, I want to be able to navigate  between the various pages so I can easily access the feature that is of most use to me.

- As a user who has noticed waste in a public space, I want to be able to report details of said waste so that other users can be made aware of the litter, and view information.

  - [ ] Share the location of the litter site.
  - [ ] Upload an image of the litter site.
  - [ ] Detail the size and type of the litter site.

- [ ] As a cleanup volunteer, concerned by the cleanliness of my area, I want to see waste sites mapped out, so that see how many there are, and where they are.

- [ ] As a cleanup volunteer who has identified a waste site in a map of my area, I can click on the waste site marker so I can review further details pertaining thereto.


#### Inspirational Overview
- [Trashout.ngo](http://trashout.ngo/)
- [Litter Action](http://litteraction.org.uk)

#### Tech Stack
###### Server-side rendering

- Node.js  
  - hapi.js
  - handlebars


###### Maps
  - Leaflets.js  

###### Data Storage
  - PostgreSQL

###### Image storage
  - Amazon D3


#### Stretch Goals
- OAuth (Gmail)
  - Comments section under each litter post
  - Event planning system (i.e. date picker)
- Filtering on browse map (database queries)
- Image compression within browser before uploading to database
