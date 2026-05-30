# 🏡 Dwello - Real Estate Booking Platform
A modern, full-stack real estate booking application built with the MERN stack, featuring property listings, booking management, and user authentication.

## 🌐 Live Demo
**🚀 [View Live Application](https://dwello-real-estate-mern-stack-web-a-eta.vercel.app/)**

## Images Of Website
<img width="1542" height="760" alt="image" src="https://github.com/user-attachments/assets/87ca03b0-ba69-483a-983c-ab40ab287e65" />
<img width="1574" height="777" alt="image" src="https://github.com/user-attachments/assets/b5103934-37ce-4c98-92af-4d9eb56848ea" />
<img width="954" height="782" alt="image" src="https://github.com/user-attachments/assets/1a0e751e-c2dd-4316-a893-90abb5244ceb" />

## ✨ Features

### 🏠 Property Management

- **Browse Properties**: Explore a wide variety of real estate listings
- **Property Details**: View comprehensive property information including images, facilities, and location
- **Interactive Map**: Visualize property locations with integrated maps
- **Search & Filter**: Find properties by title, city, or country
- **Add Property**: Authenticated users can list their own properties

### 👤 User Features

- **Auth0 Authentication**: Secure login and signup with Auth0
- **Favorite Properties**: Save properties to your favorites list
- **Book Visits**: Schedule property viewings
- **Manage Bookings**: View and cancel your bookings
- **Delete Properties**: Property owners can delete their listings

### 🎨 UI/UX

- **Responsive Design**: Optimized for all devices
- **Smooth Animations**: Enhanced with Framer Motion
- **Modern Interface**: Clean and intuitive design with Mantine UI
- **Interactive Components**: Dynamic carousels with Swiper

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Mantine UI** - Component library
- **Framer Motion** - Animation library
- **Swiper** - Touch slider
- **Leaflet** - Interactive maps
- **Auth0** - Authentication
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM
- **MongoDB** - Database
- **Auth0** - JWT authentication
- **CORS** - Cross-origin resource sharing

### Deployment

- **Vercel** - Frontend & Backend hosting
- **MongoDB Atlas** - Cloud database

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Auth0 account

### Clone Repository

```bash
git clone https://github.com/JainamSavla/Dwello-Real-Estate-Mern-Stack-Web-Application.git
cd Dwello-Real-Estate-Mern-Stack-Web-Application
```

### Backend Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=8000
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"

# Auth0 Configuration
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_ISSUER_BASE_URL=https://your_auth0_domain
CLIENT_URL=http://localhost:5173
```

4. Generate Prisma Client:

```bash
npx prisma generate
```

5. Start the server:

```bash
npm start
```

### Frontend Setup

1. Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_audience
VITE_AUTH0_REDIRECT_URI=http://localhost:5173
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗂️ Project Structure

```
Dwello-Real-Estate-Booking-Website/
├── client/                  # Frontend React application
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── hooks/          # Custom React hooks
│       ├── utils/          # Utility functions
│       └── context/        # React context
│
└── server/                 # Backend Node.js application
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── routes/            # API routes
    ├── prisma/            # Prisma schema
    └── index.js           # Entry point
```

## 🔑 Key Features Implementation

### Authentication Flow

- Integrated Auth0 for secure authentication
- JWT token-based API protection
- User registration and profile management

### Property Operations

- **Create**: Add new property listings with images and details
- **Read**: Browse and search all properties
- **Update**: Favorite properties and book visits
- **Delete**: Property owners can delete their listings

### Booking System

- Schedule property visits
- Manage booking history
- Cancel bookings

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Add environment variables
5. Deploy

### Backend (Vercel)

1. Import same repository
2. Set root directory to `server`
3. Add environment variables
4. Deploy

## 📸 Screenshots

### Home Page

Modern landing page with hero section and property statistics

### Properties Listing

Browse all available properties with search and filter options

### Property Details

Detailed view with images, facilities, location map, and booking options

### User Dashboard

Manage your bookings and favorite properties

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

**Jainam Savla**

- GitHub: [@JainamSavla](https://github.com/JainamSavla)
- Live Demo: [Dwello App](https://dwello-real-estate-mern-stack-web-a-eta.vercel.app/)

## 🙏 Acknowledgments

- Auth0 for authentication services
- MongoDB Atlas for database hosting
- Vercel for deployment platform
- Mantine UI for component library
- All open-source contributors

---

⭐ **If you found this project helpful, please give it a star!** ⭐
