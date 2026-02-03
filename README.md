# Mayank Rai Portfolio

A modern, creative portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- **Neural Network Background** - Animated particle system with connections
- **Framer Motion Animations** - Smooth scroll reveals, hover effects, and transitions
- **TypeWriter Effect** - Dynamic role text animation
- **3D Tilt Cards** - Interactive card hover effects with perspective
- **Animated Counters** - Numbers that count up when scrolled into view
- **Responsive Design** - Mobile-first, works on all screen sizes
- **Dark Theme** - Modern cyberpunk/neon aesthetic
- **SEO Optimized** - Meta tags and semantic HTML

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Fonts**: Space Grotesk, JetBrains Mono (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vomayank/vomayank.github.io.git

# Navigate to the project
cd vomayank.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Create optimized production build
npm run build

# The static files will be in the 'out' directory
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout with fonts and metadata
│   └── page.tsx         # Main portfolio page
├── components/
│   ├── AnimatedCounter.tsx   # Counting animation component
│   ├── AnimatedText.tsx      # Letter-by-letter text animation
│   ├── MagneticButton.tsx    # Button with shimmer effect
│   ├── NeuralBackground.tsx  # Particle network animation
│   ├── TiltCard.tsx          # 3D tilt hover effect
│   └── TypeWriter.tsx        # Typing animation effect
public/
└── profile.jpg          # Profile image
```

## Customization

### Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --neon-cyan: #00f0ff;
  --neon-purple: #b026ff;
  --neon-green: #0aff0a;
  --dark-bg: #0a0a0f;
}
```

### Content

Update the data arrays in `src/app/page.tsx`:
- `experiences` - Work experience timeline
- `skills` - Tech stack categories
- `stats` - Key metrics
- `socials` - Social media links

## Deployment

This project is configured for static export and can be deployed to:

- **GitHub Pages** - Automatic deployment via GitHub Actions
- **Vercel** - One-click deployment
- **Netlify** - Drag and drop the `out` folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Mayank Rai** - Senior Software Engineer

- LinkedIn: [@vomayank](https://linkedin.com/in/vomayank)
- GitHub: [@vomayank](https://github.com/vomayank)
- Twitter: [@vomayank](https://x.com/vomayank)
- YouTube: [@vomayank](https://youtube.com/@vomayank)

---

If you found this helpful, please give it a star!
