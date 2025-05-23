# Excel File Upload API

A Node.js application that provides an API to upload and process Excel files, built with Express.js and MongoDB.

## Features

- Excel file upload functionality
- Parse Excel files to JSON data
- Store data in MongoDB database
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd uploadExcel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

## Usage

### Development

Run the application in development mode with hot-reload:
```bash
npm run dev
```

### Production

Start the application in production mode:
```bash
npm start
```

## API Endpoints

- `POST /upload` - Upload and process Excel files
