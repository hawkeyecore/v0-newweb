# newweb

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/wol20192-gmailcoms-projects/v0-newweb)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/zEBXb8mTkRF)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/wol20192-gmailcoms-projects/v0-newweb](https://vercel.com/wol20192-gmailcoms-projects/v0-newweb)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/zEBXb8mTkRF](https://v0.dev/chat/projects/zEBXb8mTkRF)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository


## Detailed Guide to Running and Developing the Web Template Designer

Since you'd like more details, here's a comprehensive breakdown of running and working with the Web Template Designer locally:

### Project Structure in Detail

```plaintext
web-template-designer/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout component
│   ├── page.tsx              # Homepage
│   ├── templates/            # Templates section
│   │   ├── page.tsx          # Templates listing page
│   │   ├── create/           # Create template page
│   │   ├── [id]/             # Dynamic routes for templates
│   │   │   ├── edit/         # Template editor
│   │   │   └── use/          # Template usage
│   │   └── light-pole-design/ # Light pole design template
├── components/               # React components
│   ├── ui/                   # UI components from shadcn/ui
│   ├── canvas-editor.tsx     # Canvas editing component
│   ├── modern-template-designer.tsx # Main designer component
│   ├── template-form.tsx     # Form component for templates
│   └── templates/            # Template-specific components
│       └── light-pole-calculator.tsx # Light pole calculator
├── lib/                      # Utility functions
│   ├── editor-store.ts       # Zustand store for editor state
│   ├── use-templates.ts      # Hook for template management
│   └── calculation-engine.ts # Template calculation logic
├── public/                   # Static assets
│   ├── light-pole-diagram.png      # Light pole diagram
│   └── light-pole-performance-chart.png # Performance chart
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Project dependencies and scripts
```

### Setting Up Your Development Environment

#### Customizing the Port

If you need to run on a different port:

```shellscript
# Using npm
npm run dev -- -p 3001

# Using yarn
yarn dev -p 3001
```

#### Environment Variables

Create a `.env.local` file in the root directory to set environment variables:

```plaintext
NEXT_PUBLIC_APP_NAME=Web Template Designer
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

#### Editor Setup

For the best development experience:

- Use VS Code with the following extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript support





### How Data Persistence Works

The application uses browser localStorage for data persistence:

1. Templates are stored as JSON in the `templates` key in localStorage
2. When you create or edit a template, it's saved to localStorage
3. The `useTemplates` hook in `lib/use-templates.ts` handles CRUD operations


To inspect stored data:

1. Open browser DevTools (F12 or right-click > Inspect)
2. Go to the "Application" tab
3. Select "Local Storage" in the sidebar
4. Click on your localhost domain
5. Look for the `templates` key


To reset all data:

```javascript
// Run this in the browser console
localStorage.removeItem('templates');
// Then refresh the page
```

### Working with Templates

#### Creating a New Template

1. Navigate to `/templates/create`
2. Fill in the template name and category
3. Click "Create Template"
4. Use the editor to design your template


#### Modifying the Light Pole Template

The Light Pole Calculator template is defined in `components/templates/light-pole-calculator.tsx`. To modify it:

1. Open this file in your editor
2. Make changes to the component
3. Save the file - Next.js hot reloading will update the browser


#### Adding New Template Types

To add a new template type:

1. Create a new component in `components/templates/`
2. Add a route for it in `app/templates/[your-template-name]/page.tsx`
3. Add it to the templates list in `components/client-templates-list.tsx`


### Debugging Common Issues

#### Images Not Loading

If images don't load:

1. Check that the image files exist in the `public` directory
2. Ensure the paths in your code match exactly (case-sensitive)
3. Try using absolute URLs: `src="/light-pole-diagram.png"`


#### State Management Issues

If template data isn't saving or loading correctly:

1. Check browser console for errors
2. Inspect localStorage content in DevTools
3. Try clearing localStorage and restarting


#### TypeScript Errors

If you encounter TypeScript errors:

1. Run `npm run type-check` or `yarn type-check` to see all errors
2. Add proper type definitions for components and functions
3. Use `any` type temporarily if needed, but replace with proper types later


### Advanced Development

#### Adding Custom Components

To add custom UI components:

1. Create a new component in `components/ui/`
2. Import and use it in your templates


#### Extending the Calculation Engine

The calculation engine in `lib/calculation-engine.ts` can be extended:

1. Add new calculation functions
2. Update the `calculateTemplate` function to handle new calculations
3. Use these calculations in your templates


#### Styling with Tailwind CSS

The project uses Tailwind CSS for styling:

1. Customize the theme in `tailwind.config.js`
2. Use Tailwind classes directly in your components
3. For complex components, consider using the `cn` utility from `lib/utils.ts`


=====




### How to Run the Web Template Designer Locally

Here's a step-by-step guide to get the Web Template Designer running on your local machine:

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)
- Git (optional, for cloning the repository)


## Setup Instructions

### 1. Get the Code

**Option A: Clone the repository (if you have Git installed):**

```shellscript
git clone <repository-url>
cd web-template-designer
```

**Option B: Download the code:**

- Download the code as a ZIP file
- Extract it to a folder of your choice
- Open a terminal/command prompt and navigate to that folder


### 2. Install Dependencies

Using npm:

```shellscript
npm install
```

Or using yarn:

```shellscript
yarn install
```

### 3. Start the Development Server

Using npm:

```shellscript
npm run dev
```

Or using yarn:

```shellscript
yarn dev
```

### 4. Access the Application

Open your browser and navigate to:

```plaintext
http://localhost:3000
```

You should now see the Web Template Designer application running locally.

## Project Structure

The main components of the application are:

- `/app` - Next.js app router pages
- `/components` - React components including the template designer
- `/lib` - Utility functions and state management
- `/public` - Static assets like images


## Using the Light Pole Design Template

1. Navigate to the Templates page at `http://localhost:3000/templates`
2. Click on the "Light Pole Design Calculator" template
3. You can now use and edit the template as described in the previous instructions


## Troubleshooting

If you encounter any issues:

1. **Port already in use**: If port 3000 is already in use, the development server will typically suggest an alternative port. You can also modify the port in the `package.json` file.
2. **Dependencies issues**: Make sure you have the correct Node.js version. If you encounter dependency errors, try deleting the `node_modules` folder and the `package-lock.json` (or `yarn.lock`) file, then run the install command again.
3. **Image loading issues**: If images don't load properly, check that the paths in the `public` directory match the references in the code.


## Development Notes

- The application uses localStorage to persist templates, so your changes will be saved in your browser
- To reset all data, you can clear the localStorage for the site in your browser's developer tools
- The application is built with Next.js, React, and Tailwind CSS
