# Tabulr 🗃️ (still in development)

A modern, intuitive MySQL/MariaDB database management tool built with Next.js, TypeScript, and Tailwind CSS. Tabulr provides a sleek web interface for exploring, querying, and managing your database structures with ease.

## Description

Tabulr is a comprehensive database management solution that transforms the way you interact with MySQL and MariaDB databases. Built with modern web technologies, it offers a responsive, feature-rich interface that makes database administration accessible to both developers and database administrators.

Whether you're exploring table structures, running complex queries, or managing database operations, Tabulr provides the tools you need in a clean, intuitive interface.

## Features ✨

### 🔍 **Database Exploration**
- Browse and navigate through multiple databases
- View comprehensive database statistics and metadata
- Real-time database connection status monitoring

### 📊 **Table Management**
- Interactive table listing with detailed metadata
- Dynamic table structure visualization
- Row-level operations (view, edit, delete)
- Pagination support for large datasets

### 🛠️ **Advanced Query Editor**
- Syntax-highlighted SQL editor powered by CodeMirror
- Query formatting and validation
- Query execution time tracking
- Export query results to various formats
- Support for multiple SQL statements

### 🎨 **Modern User Interface**
- Responsive design that works on all devices
- Dark and light theme support
- Collapsible sidebar navigation
- Toast notifications for user feedback
- Loading states and error handling

### 📈 **Data Visualization**
- Interactive data tables with sorting and filtering
- Column type indicators and constraints display
- Real-time data updates
- Export functionality for data analysis

### 🔧 **Database Operations**
- Create, modify, and delete database objects
- Schema inspection and modification tools
- Index and constraint management
- Backup and restore capabilities

### ⚡ **Performance Features**
- Optimized query execution
- Connection pooling and management
- Memory usage monitoring
- Query performance analytics

### 🛡️ **Security & Reliability**
- Secure database connections
- Error handling and recovery
- Connection timeout management
- Data validation and sanitization

### 🔄 **Real-time Updates**
- Live database status monitoring
- Automatic connection recovery
- Real-time query results
- Dynamic UI updates

### 📱 **Cross-platform Compatibility**
- Web-based interface accessible from any device
- Progressive Web App (PWA) capabilities
- Offline functionality for saved queries
- Mobile-responsive design

## Getting Started 🚀

### Prerequisites

- Node.js 18+ 
- MySQL or MariaDB server running locally or remotely
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Estifanos12/tabulr.git
   cd tabulr
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure your database connection**
   
   Create a `.env.local` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to access Tabulr.

### Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Technology Stack 🛠️

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI components
- **Database**: MySQL2 with connection pooling
- **Code Editor**: CodeMirror with SQL syntax highlighting
- **Tables**: TanStack React Table
- **Theming**: next-themes
- **Notifications**: Sonner
- **Icons**: Lucide React

## Contributing 🤝

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


**Made with ❤️ by Estifanos Gashawtena**