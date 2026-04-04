# Build Configuration Guide

## Production Build Optimization

The project is configured for optimal production performance:

### Build Output

```bash
npm run build:prod
```

### Optimizations Enabled

1. **Code Splitting**
   - Vendor libraries separated
   - React Query and UI libraries isolated
   - Utilities bundled separately

2. **Minification**
   - Terser for advanced minification
   - Console & debugger statements removed
   - Dead code elimination

3. **Asset Optimization**
   - CSS code splitting enabled
   - Images hashed separately
   - Fonts cached separately
   - Source maps disabled in production

4. **File Naming**
   - Content hash for cache busting
   - Organized into directories (js/, css/, images/)

### Output Structure

```
dist/
├── js/
│   ├── main.[hash].js          (App code)
│   ├── vendor.[hash].js        (React dependencies)
│   ├── query.[hash].js         (React Query)
│   ├── ui.[hash].js            (UI libraries)
│   └── utils.[hash].js         (Utilities)
├── css/
│   └── styles.[hash].css       (Tailwind compiled)
├── images/
│   └── [images]
├── fonts/
│   └── [fonts]
└── index.html
```

### Size Analysis

Check the bundle size:

```bash
# After building, use a tool like:
npm install -g serve
serve -s dist
```

### Environment-Specific Configuration

Create `.env.production` for production settings:

```env
VITE_API_URL=https://api.metrouni.edu.bd/api/v1
VITE_APP_NAME=Metropolitan University Portal
VITE_LOG_LEVEL=error
```

### Performance Targets

- **FCP** (First Contentful Paint): < 1s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **Bundle Size**: < 250KB (main)

### Deployment Checklist

- [ ] Set correct `VITE_API_URL` in `.env.production`
- [ ] Run `npm run build:prod`
- [ ] Verify bundle size
- [ ] Test all routes work
- [ ] Check API endpoints
- [ ] Enable GZIP compression on server
- [ ] Set proper Cache-Control headers
- [ ] Enable HTTPS
