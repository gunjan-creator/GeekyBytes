# GeekyBytes

**GeekyBytes** is a modern tech blogging platform built with the MERN stack, Vite, and Cloudinary. This application allows users to create, read, update, and delete tech-related blog posts with seamless image integration.

## Features

- **User Authentication:** Secure login and registration with JWT-based authentication.
- **Blog Management:** Create, update, and delete blog posts.
- **Image Integration:** Upload and manage images using Cloudinary.
- **Responsive Design:** Optimized for various devices and screen sizes.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (for database)
- [Cloudinary](https://cloudinary.com/) account (for image storage)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/geekybytes.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd geekybytes
    ```

3. **Install Backend Dependencies**

    ```bash
    cd server
    npm install
    ```

4. **Install Frontend Dependencies**

    ```bash
    cd ../client
    npm install
    ```

5. **Configure Environment Variables**

    Create a `.env` file in the `server` directory and add the following variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

    Create a `.env` file in the `client` directory if needed for frontend-specific environment variables.

6. **Run the Development Servers**

    - Start the backend server:

      ```bash
      cd server
      npm run dev
      ```

    - Start the frontend development server:

      ```bash
      cd ../client
      npm run dev
      ```

7. **Visit the Application**

    Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

1. **Register and Login:** Create an account and log in to start using the platform.
2. **Create a Post:** Use the “Create Post” feature to add new tech blog entries.
3. **Manage Posts:** Edit or delete your posts as needed.
4. **Upload Images:** Use Cloudinary to upload and manage images for your blog posts.

## Deployment

For deploying the app, consider using platforms like [Heroku](https://www.heroku.com/), [Vercel](https://vercel.com/), or [Netlify](https://www.netlify.com/). Ensure that you configure environment variables on the deployment platform accordingly.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Open a pull request with a clear description of your changes.


## Contact

If you have any questions or feedback, please reach out to [ansulluharuka21@gmail.com](mailto:ansulluharuka21@gmail.com).
