# Harry Potter Characters List


## Features

- ✅ List of Harry Potter characters with photo, name and species
- ✅ Filter by name (case-insensitive)
- ✅ Filter by house (Gryffindor by default)
- ✅ Character detail page with React Router
- ✅ Responsive and semantic design
- ✅ Placeholder images for characters without photo
- ✅ Informative messages when there are no results
- ✅ Filter persistence when navigating (localStorage)


The application will automatically open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/          # React components
│   ├── FilterByName.js      # Name search filter
│   ├── HouseFilter.js       # House filter
│   ├── CharacterList.js     # Character list
│   ├── CharacterCard.js     # Individual character card
│   └── CharacterDetail.js   # Character detail page
├── App.js              # Main component (manages state and routes)
├── index.js            # Application entry point
└── *.css               # Styles for each component
```

## Components

### App.js

- Main component that manages global state
- Handles routes with React Router
- Makes API requests
- Saves and retrieves filters in localStorage

### FilterByName.js

- Text field to search characters by name
- Wrapped in a `<form>` to maintain semantics
- Prevents default behavior when pressing Enter

### HouseFilter.js

- Dropdown menu to select the house
- Options: Gryffindor, Slytherin, Ravenclaw, Hufflepuff

### CharacterList.js

- Displays the filtered character list
- Handles loading states and error messages
- Filters characters according to search text

### CharacterCard.js

- Individual card for each character
- Shows photo, name and species
- On click, navigates to the detail page

### CharacterDetail.js

- Full page with all character information
- Shows: photo, name, house, status, gender, species, alternate names
- Button to go back to the list

## API Used

- **Base URL:** https://hp-api.onrender.com/
- **Endpoint:** `/api/characters/house/{house}`
- **Available houses:** gryffindor, slytherin, ravenclaw, hufflepuff

## Key Concepts Used

- **React Hooks:** useState, useEffect
- **React Router:** Routes, Route, useNavigate, useParams
- **Fetch API:** To make HTTP requests
- **localStorage:** To persist user data
- **Event Handlers:** To handle user interactions
- **Conditional Rendering:** To show different states
- **Array Methods:** map(), filter(), find()
