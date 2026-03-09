# Amelia Kim - Contemporary Artist Portfolio

A modern, creative, and fully responsive artist portfolio website built with HTML, CSS, and JavaScript. Features a gallery, e-commerce shop for selling artwork directly, and professional artist showcasing.

## 🎨 Features

- **Beautiful Hero Section** - Eye-catching landing page with animated blob backgrounds
- **Gallery with Filtering** - Display artwork organized by category (Painting, Digital, Installation, Mixed Media)
- **E-commerce Shop** - Sell artwork, prints, and digital products directly on your website
- **Shopping Cart** - Fully functional cart with local storage persistence
- **About Section** - Artist biography, experience, and recognition
- **Contact Form** - Professional contact page with FAQ section
- **Responsive Design** - Mobile-optimized for all screen sizes
- **Modern Styling** - Creative & playful design with gradient elements and smooth animations
- **Navigation** - Mobile hamburger menu and fixed navigation

## 📁 Project Structure

```
amelia_kim_portfolio/
├── index.html           # Homepage
├── gallery.html         # Gallery with filter functionality
├── shop.html            # E-commerce shop
├── about.html           # Artist bio and recognition
├── contact.html         # Contact form and FAQ
├── css/
│   └── style.css        # All styling (4000+ lines)
├── js/
│   ├── script.js        # Main JavaScript (navigation, gallery filter, contact)
│   └── shop.js          # Shopping cart functionality
└── README.md            # This file
```

## 🚀 Quick Start

1. **Open the website** - Simply open `index.html` in a web browser
2. **No build process required** - This is a pure HTML/CSS/JS project
3. **All features work offline** - The shopping cart uses browser localStorage

## 🛒 Shopping Cart Features

- Add/remove items
- Update quantities
- Persistent storage (saves cart even after closing browser)
- Real-time cart count in navigation
- Cart summary with subtotal and shipping calculation
- Checkout process ready for payment integration

### Product Data

Edit the `products` array in `js/shop.js` to add your own artwork:

```javascript
{
    id: 1,
    title: 'Your Artwork Title',
    type: 'Medium (e.g., Original Painting)',
    price: 2500,
    description: 'Description of your work',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}
```

## 🎯 Customization

### Colors & Theme
Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f5576c;
    /* ... more colors */
}
```

### Artist Information
Update the following in each HTML file:
- Artist name (header/footer)
- Bio text in `about.html`
- Contact information in `contact.html`
- Email addresses and phone numbers
- Social media links

### Gallery Content
Edit gallery items in `gallery.html`:
```html
<div class="gallery-item" data-category="painting">
    <div class="gallery-image" style="background: linear-gradient(...)"></div>
    <div class="gallery-info">
        <h3>Your Artwork Title</h3>
        <p>Medium | Year</p>
    </div>
</div>
```

### Contact Form Integration
To actually send emails, you'll need to:
1. Set up a backend service (Node.js, PHP, etc.)
2. Or use a service like Formspree, Netlify Forms, or EmailJS
3. Update the form submission handler in `js/script.js`

## 💳 Payment Integration

Currently, the checkout button shows a placeholder alert. To accept real payments:

1. **Stripe Integration** - Popular for e-commerce
   - Sign up at stripe.com
   - Add Stripe.js library
   - Create payment intent in checkout

2. **PayPal Integration** - Alternative option
   - Use PayPal's standard integration
   - Or PayPal Commerce Platform

3. **Shopify Integration** - Full e-commerce solution
   - Migrate products to Shopify
   - Embed on your site

Update the `checkout()` function in `js/shop.js` with your payment processor.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch as source
4. Site will be live at `https://yourusername.github.io/amelia_kim_portfolio`

### Netlify
1. Drag and drop folder to netlify.com
2. Or connect GitHub repo
3. Automatic deploys on push

### Traditional Hosting
1. Upload all files via FTP
2. Ensure index.html is in root directory
3. No special server requirements

## 🎓 What's Included

### CSS Features
- Flexbox & CSS Grid layouts
- CSS animations and transitions
- Gradient backgrounds
- Box shadows and effects
- Mobile-first responsive design
- CSS variables for theming

### JavaScript Features
- DOM manipulation
- Event handling
- LocalStorage API for cart persistence
- Intersection Observer for animations
- Form validation
- Filter functionality

## 📝 License

This template is free to use and modify for your personal portfolio.

## 🔧 Troubleshooting

**Cart not persisting?**
- Check if localStorage is enabled in browser
- Clear cache and reload

**Images not showing?**
- The gallery uses gradient backgrounds as placeholders
- Replace `style="background: linear-gradient(...)"` with `style="background-image: url('path/to/image')"`

**Contact form not working?**
- Currently logs to console only
- Implement backend email service (see Contact Form Integration above)

**Mobile menu not appearing?**
- Ensure viewport meta tag is in HTML: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

## 💡 Enhancement Ideas

- Add image carousel to homepage
- Implement search functionality for gallery
- Add testimonials/reviews section
- Create blog for art process posts
- Add social media feed integration
- Implement dark mode toggle
- Add video background to hero section
- Create artist newsletter signup
- Add artwork view counter
- Implement wishlist feature

## 📧 Support

For questions or issues, check the template documentation or common customization patterns above.

---

**Happy creating! 🎨** Share your beautiful portfolio with the world!
