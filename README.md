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

## 🚀 Despliegue en GitHub Pages

### Configuración Inicial

1. **Asegúrate de tener el repositorio en GitHub** y que el nombre del repositorio sea `modulo-3-evaluacion-final-jennyalvarez`

2. **Actualiza el `homepage` en `package.json`** con la URL correcta de tu GitHub Pages:

   - Si tu repositorio está en tu cuenta personal: `https://[tu-usuario].github.io/modulo-3-evaluacion-final-jennyalvarez`
   - Si está en una organización: `https://[organizacion].github.io/modulo-3-evaluacion-final-jennyalvarez`
   - Si usas un dominio personalizado como Adalab: `https://beta.adalab.es/modulo-3-evaluacion-final-jennyalvarez`

   Ejemplo:

   ```json
   "homepage": "https://tu-usuario.github.io/modulo-3-evaluacion-final-jennyalvarez"
   ```

3. **El archivo `404.html` ya está configurado** en `public/404.html` para que React Router funcione correctamente en GitHub Pages.

### Desplegar la aplicación

Solo necesitas ejecutar un comando:

```bash
npm run deploy
```

Este comando:

- ✅ Compila la aplicación (`npm run build`)
- ✅ Despliega automáticamente a GitHub Pages usando la rama `gh-pages`
- ✅ El archivo `404.html` se copia automáticamente para que las rutas funcionen

### Configurar GitHub Pages (solo la primera vez)

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona la rama `gh-pages` y la carpeta `/ (root)`
4. Guarda los cambios

### Verificar el despliegue

Después de ejecutar `npm run deploy`, espera unos minutos y visita tu URL de GitHub Pages. La aplicación debería estar disponible y todas las rutas (como `/character/:id`) deberían funcionar correctamente.

### Notas importantes

- El archivo `404.html` es **necesario** para que React Router funcione en GitHub Pages
- No modifiques la carpeta `build/` manualmente, se genera automáticamente
- Cada vez que quieras actualizar el sitio, simplemente ejecuta `npm run deploy` de nuevo
