# Fredex: Visualize FRED Data for Rapid Economic Trends ✨💫

Fredex offers a customizable economic chart dashboard, empowering users to effortlessly analyze current economic indices.

Drawing data from the FRED API Series Observation and Series Tags, Fredex allows for tailored chart creation based on various data sources.

Users can personalize their charts by selecting chart types, colors, title labels, label colors, and different unit segments. Additionally, Fredex offers a secure and persistent chart configuration state, with all settings data stored directly in the user's browser. This level of customization ensures that users can create charts precisely tailored to their analytical requirements and personal preferences.

## Preview

[![Preview](https://github.com/hengleeyi/fredex/blob/main/preview.png?raw=true)](http://github.com/hengleeyi/fredex/)

## Features

- Select different data sources
- Responsive charts for various screen sizes
- Customize chart types, colors, title labels, label colors, and unit segments
- Independent toolbar for each chart, allowing for editing, deleting charts, and triggering expand view
- Persistently store configuration for each chart

## Website

https://fredex.vercel.app/

## Stacks & Tools

- NextJS v14 (Server components, app router)
- Typescript
- Zod
- LocalStorage
- ReactQuery v5
- React hook form
- Rechart
- TailwindCSS
- Shacn ui/Radix-ui

## Setup APIKey for development

Please utilize the FRED APIKEY from https://fredaccount.stlouisfed.org/apikeys , add your APIKey in .env.local

```
NEXT_PUBLIC_API_KEY=YOUR_APIKEY
```

## Installing Dependencies

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```
