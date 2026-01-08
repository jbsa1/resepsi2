# Wedding Invitation - React + TypeScript + Vite

Wedding invitation website built with modern React stack, TypeScript, and Vite. This is a recreation of the elegant Victoria theme wedding invitation from Tibra Digital.

## 🎯 Features

- **Modern Stack**: React 18 + TypeScript + Vite for optimal performance
- **Elegant Design**: Matches the original Victoria theme with beautiful typography and animations
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive Components**:
  - Animated hero section with invitation reveal
  - Couple profiles with photos and social links
  - Real-time countdown timer to wedding day
  - Photo gallery with lightbox functionality
  - Event details with Google Maps integration
  - RSVP form with validation
  - Background music player
- **Smooth Animations**: Using Framer Motion for beautiful transitions
- **Component Architecture**: Clean, reusable TypeScript components

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wedding-invitation
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser to:
```
http://localhost:5173
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Hero.tsx        # Hero section with invitation reveal
│   ├── CoupleSection.tsx # Groom and bride information
│   ├── Countdown.tsx     # Countdown timer
│   ├── EventSection.tsx  # Event details and maps
│   ├── Gallery.tsx      # Photo gallery with lightbox
│   ├── RSVPForm.tsx     # RSVP form
│   └── Footer.tsx       # Footer with audio player
├── data/               # Static data
│   └── weddingData.ts   # Wedding information
├── types/              # TypeScript type definitions
│   └── index.ts        # Component interfaces
├── App.tsx             # Main application component
├── App.css             # Application styles
└── main.tsx           # Application entry point
```

## 🎨 Design System

### Color Palette
- Primary: `#AC8711` (Gold)
- Background: `#F9F6EF` (Cream)
- Text: `#333333` (Dark gray)
- White: `#FFFFFF`

### Typography
- **Primary Font**: Gilda Display (serif for headings)
- **Secondary Font**: Crimson Pro (serif for quotes and special text)
- **Body Font**: Poppins (sans-serif for content)

### Components Overview

#### Hero Component
- Animated invitation cover
- Guest name personalization
- Smooth reveal animation
- Background pattern matching original

#### Couple Section
- Animated cards for groom and bride
- Photo galleries
- Parent information
- Social media links
- Responsive grid layout

#### Countdown Timer
- Real-time countdown to wedding day
- Animated number transitions
- Days, hours, minutes, seconds display
- Responsive grid layout

#### Event Details
- Holy matrimony and reception information
- Maps integration
- Time and location details
- Beautiful card design

#### Photo Gallery
- Grid layout for wedding photos
- Lightbox functionality
- Hover effects and transitions
- Responsive image display

#### RSVP Form
- Form validation
- Guest count selection
- Attendance confirmation
- Success state handling

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📱 Responsive Design

The application is fully responsive and optimized for all devices with extensive mobile support:

### Breakpoints
- **Mobile**: 320px - 480px (Small phones)
- **Mobile Large**: 481px - 768px (Large phones)
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Mobile Features
- **Touch-Optimized**: Smooth touch interactions and gestures
- **Improved Gallery**: Swipe-friendly lightbox with navigation buttons
- **Keyboard Navigation**: Arrow keys and ESC support in gallery
- **Performance Optimized**: Reduced animations for better performance
- **Landscape Support**: Special handling for landscape orientation
- **Small Phone Support**: Optimized for iPhone SE and similar devices

### Mobile Experience
- Fluid typography that scales perfectly
- Touch-friendly buttons with proper sizing
- Responsive grids that adapt to screen size
- Optimized image loading with lazy loading
- Smooth scrolling and transitions
- Mobile-first design approach

## 🎬 Animations

Using Framer Motion for:
- Page transitions
- Component reveal animations
- Hover effects
- Interactive feedback
- Scroll-triggered animations

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📸 Assets

Images and videos are loaded from the original Tibra Digital CDN to maintain high quality and reduce bundle size.

## 🔧 Customization

### Changing Wedding Data

Edit `src/data/weddingData.ts` to update:
- Couple information
- Event details
- Wedding date
- Photo gallery
- Gift information

### Styling

All styles are in `src/App.css`. Key customization points:
- Color variables are at the top
- Font imports are included
- Component-specific styles are sectioned
- Responsive breakpoints at the bottom

## 🚀 Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider.

## 📄 License

This project is a recreation of an existing design for educational purposes. Please ensure you have proper licenses for any images or assets used in production.

## 🙏 Acknowledgments

- Original design inspiration: Tibra Digital
- Icons: Font Awesome
- Animations: Framer Motion
- Build tool: Vite

---

Made with ❤️ for the happy couple!