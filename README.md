# DevConnect - Developer Networking Platform

A powerful Node.js backend server for a developer networking platform where tech professionals can connect, collaborate, and grow together.

## 🚀 Features

- **Authentication & Authorization**

  - Secure user registration and login
  - JWT-based authentication with 7-day token expiry
  - Cookie-based session management
  - Strong password validation

- **Developer Profile Management**

  - Comprehensive profile creation with:
    - Professional details (First name, Last name)
    - Skills inventory (up to 10 skills)
    - Profile picture support
    - About section for bio/description
    - Email verification
  - Profile customization and updates
  - Premium membership options

- **Connection System**

  - Smart connection requests
  - Multiple connection states:
    - Interested
    - Accepted
    - Rejected
    - Ignored
  - Connection recommendations
  - Protection against self-connections
  - Indexed queries for fast connection lookups

- **Real-time Chat & Collaboration**

  - Socket.IO powered real-time messaging
  - Private conversations between connected developers
  - Chat history management
  - Message notifications
  - Online status indicators
  - Typing indicators

- **Premium Features**

  - Premium membership tiers
  - Enhanced platform capabilities for premium users
  - Razorpay integration for secure payments
  - Payment history tracking
  - Membership type tracking

- **Email Communication**

  - AWS SES integration for reliable email delivery
  - Professional email notifications for:
    - Connection requests
    - Message alerts
    - System updates
    - Account notifications

- **Automated Tasks**
  - Cron jobs for scheduled operations
  - Automated system maintenance
  - Regular data cleanup

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Razorpay
- **Email Service**: AWS SES
- **Others**:
  - bcrypt (Password hashing)
  - date-fns (Date manipulation)
  - node-cron (Scheduled tasks)
  - validator (Input validation)
  - cors (Cross-Origin Resource Sharing)

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Razorpay account for payments
- AWS account for SES

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=7777
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=DEV@Tinder$123
   RAZORPAY_KEY_ID=<your-razorpay-key-id>
   RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
   AWS_ACCESS_KEY_ID=<your-aws-access-key>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
   AWS_REGION=<your-aws-region>
   FRONTEND_URL=http://localhost:5173
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## 📁 Project Structure

```
src/
├── app.js              # Application entry point
├── config/
│   └── database.js     # MongoDB configuration
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── models/
│   ├── chat.js         # Chat & message models
│   ├── connectionRequest.js # Developer connections
│   ├── payment.js      # Premium payments
│   └── user.js         # Developer profiles
├── routes/
│   ├── auth.js         # Authentication endpoints
│   ├── chat.js         # Messaging routes
│   ├── payment.js      # Premium features
│   ├── profile.js      # Profile management
│   ├── request.js      # Connection handling
│   └── user.js         # User operations
└── utils/
    ├── constant.js     # System constants
    ├── cronjob.js      # Automated tasks
    ├── razorpay.js     # Payment integration
    ├── sendEmail.js    # Email service
    ├── sesClient.js    # AWS SES setup
    ├── socket.js       # Real-time features
    └── validation.js   # Input validation
```

## 🔒 API Endpoints

### Authentication

- `POST /register` - Register new developer
- `POST /login` - Developer login
- `POST /logout` - Developer logout

### Profile

- `GET /profile` - Get developer profile
- `PUT /profile` - Update profile
  - Update skills
  - Update about section
  - Update profile picture
  - Update personal details

### Developer Network

- `GET /users` - Get potential connections
- `GET /users/:id` - Get specific developer profile

### Connection Management

- `POST /request` - Send connection request
- `GET /requests` - View all connection requests
- `PUT /request/:id` - Accept/Reject/Ignore request

### Chat System

- `GET /chats` - Get all conversations
- `GET /chats/:id` - Get specific conversation
- `POST /chats/:id/messages` - Send message

### Premium Features

- `POST /payment/create` - Initialize premium upgrade
- `POST /payment/verify` - Confirm payment

## 🔌 WebSocket Events

### Client -> Server

- `join` - Join chat room
- `message` - Send message

### Server -> Client

- `message` - Receive message

## 🔐 Security Features

- Strong password validation
- JWT token expiration
- Secure cookie handling
- MongoDB index optimization
- Input validation and sanitization
- Protected routes
- CORS configuration

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Goutam Shetty

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- Socket.IO team
- Razorpay team
- AWS team
