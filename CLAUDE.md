# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Anti Histamine Diet" website - a static website focused on low-histamine recipes, meal planning, and nutrition guidance for people with histamine intolerance. The site was recently converted from a tech blog to a food/health-focused site.

## Development Commands

### Local Development
```bash
npm start
# Starts live-server for local development with auto-reload
```

### File Structure
- `index.html` - Main homepage with hero section, featured recipes, and newsletter signup
- `pages/` - Additional static pages (about.html, contact.html, meals.html)
- `data/` - JSON data files for meal database
- `css/styles.css` - Complete styling with responsive design and food-themed color scheme
- `js/main.js` - Interactive JavaScript features including meal database functionality

## Architecture & Key Components

### Styling System
- **Color Scheme**: Green-based theme (#38a169 primary) for natural/health feel
- **Typography**: Inter font family throughout
- **Layout**: CSS Grid and Flexbox for responsive design
- **Components**: Modular CSS with clear class naming conventions

### JavaScript Architecture
The `main.js` file contains several independent modules:

1. **Mobile Navigation**: Hamburger menu with click-outside-to-close functionality
2. **Form Handling**: Newsletter and contact form validation with custom notifications
3. **Scroll Effects**: 
   - Dynamic navbar background/hiding on scroll
   - Reading progress indicator
   - Intersection Observer for performance-optimized animations
4. **Blog Card Interactions**: Click handlers and hover effects
5. **Notification System**: Toast-style notifications with auto-dismiss
6. **Meal Database System**: 
   - JSON-based recipe storage and loading
   - Real-time search and filtering functionality
   - Modal-based recipe detail views
   - Responsive recipe cards with nutrition information

### Content Structure
- **Hero Section**: Main value proposition with call-to-action buttons linking to recipe database
- **Featured Recipes Grid**: CSS Grid layout with featured article spanning 2 columns
- **Meal Database Page**: Dedicated recipes page with search/filter functionality
- **Newsletter Signup**: Dual placement (main section + footer)
- **Responsive Design**: Mobile-first approach with hamburger navigation

### Notable Implementation Details
- Uses Intersection Observer API for performance optimization
- Implements smooth scrolling for internal navigation
- Custom notification system without external dependencies  
- Progressive enhancement approach - works without JavaScript
- Semantic HTML structure with proper accessibility considerations

### Content Theme Consistency
When updating content, maintain the low-histamine diet focus:
- Recipe categories: Breakfast, Lunch/Dinner, Snacks, Shopping Guides, Meal Planning
- Author personas: Nutritionists, chefs, wellness coaches
- Visual assets: Food photography from Unsplash with consistent sizing (600x600 for cards, 800x800 for hero)

## Meal Database System

### Database Structure
- **Storage**: JSON file-based database in `data/meals.json`
- **Fields**: Each recipe includes title, category, prep/cook time, servings, histamine level, ingredients, instructions, nutrition facts, tags, author, and image
- **Categories**: Breakfast, Lunch, Dinner, Snacks
- **Histamine Levels**: Low, Moderate (designed for histamine intolerance)

### Functionality
- **Search**: Real-time text search across titles, ingredients, and tags
- **Filtering**: Category and histamine level filters with live results count
- **Recipe Display**: Responsive card layout with hover effects
- **Detail Modals**: Full recipe view with step-by-step instructions and nutrition information
- **Mobile Responsive**: Optimized for all screen sizes

### Adding New Recipes
To add recipes to the database:
1. Open `data/meals.json`
2. Add new recipe objects following the existing structure
3. Include all required fields (title, category, ingredients, instructions, etc.)
4. Use consistent image sizing (600x600px recommended)
5. Maintain low-histamine focus for content

### Technical Implementation
- **Path Resolution**: Automatic path detection for pages in subdirectories
- **Performance**: Debounced search with intersection observer animations  
- **Accessibility**: Semantic HTML with proper focus management
- **Progressive Enhancement**: Works without JavaScript for basic recipe viewing

## Browser Compatibility
- Modern browsers (ES6+ features used)
- Mobile-responsive design
- Uses CSS Grid and Flexbox (IE11+ support)
- Fetch API for data loading (IE11+ with polyfill)