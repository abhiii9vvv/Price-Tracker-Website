# X-Price Tracker

A modern, production-ready price tracking application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Product Search & Discovery** - Find and track products across multiple platforms
- 📊 **Price History Tracking** - Visual charts showing price trends over time
- 🔔 **Smart Price Alerts** - Get notified when prices drop to your target
- 👤 **User Authentication** - Secure login with NextAuth.js
- 📱 **Responsive Design** - Works perfectly on all devices
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- ⚡ **Performance Optimized** - Fast loading with Next.js 14 and caching
- 🔒 **Security First** - Protected routes and secure data handling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/x-price-tracker.git
cd x-price-tracker
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configure your environment variables in `.env.local`

5. Set up the database:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
DATABASE_URL="postgresql://username:password@localhost:5432/pricetracker"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
\`\`\`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js:

- **Railway**: Connect GitHub repo and deploy
- **Render**: Use the web service option
- **DigitalOcean App Platform**: Deploy from GitHub
- **AWS/GCP/Azure**: Use container deployment

## API Routes

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get specific product
- `POST /api/products` - Create new product (authenticated)
- `GET /api/alerts` - Get user's price alerts (authenticated)
- `POST /api/alerts` - Create price alert (authenticated)

## Database Schema

The application uses the following main entities:

- **Users** - User accounts and authentication
- **Products** - Product information and current prices
- **PriceHistory** - Historical price data
- **PriceAlerts** - User-defined price alerts

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@xpricetracker.com or join our Discord community.
