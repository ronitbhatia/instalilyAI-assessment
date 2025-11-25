# Setup Guide

Complete step-by-step instructions for setting up the PartSelect Chat Agent.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
  - Check version: `node --version`
  - Download: https://nodejs.org/
  
- **npm**: Version 9.0.0 or higher (comes with Node.js)
  - Check version: `npm --version`

- **DeepSeek API Key**: Required for chat functionality
  - Sign up: https://platform.deepseek.com/
  - Get API key from your dashboard

## Step 1: Clone or Download the Project

If using git:
```bash
git clone <repository-url>
cd InstaLilyAI
```

Or extract the project files to your desired location.

## Step 2: Install Dependencies

Install all required dependencies for the project:

```bash
# From the project root directory

# Option 1: Install all at once (recommended)
npm run install:all

# Option 2: Install manually
npm install                    # Root dependencies
cd frontend && npm install    # Frontend dependencies
cd ../backend && npm install  # Backend dependencies
cd ..
```

**Expected output:** Dependencies will be installed. This may take a few minutes.

## Step 3: Configure Environment Variables

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create the .env file:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Or create manually
   touch .env
   ```

3. **Edit the .env file** with your preferred text editor:
   ```bash
   # On macOS/Linux
   nano .env
   # or
   vim .env
   
   # On Windows
   notepad .env
   ```

4. **Add your configuration:**
   ```env
   # DeepSeek API Configuration
   DEEPSEEK_API_KEY=your_actual_api_key_here
   
   # Server Configuration
   PORT=3001
   ```

   **Important:** Replace `your_actual_api_key_here` with your actual DeepSeek API key.

5. **Save and close the file.**

6. **Return to project root:**
   ```bash
   cd ..
   ```

## Step 4: Verify Installation

Verify that everything is set up correctly:

```bash
# Check Node.js version
node --version  # Should be 18.0.0 or higher

# Check npm version
npm --version   # Should be 9.0.0 or higher

# Verify .env file exists
test -f backend/.env && echo ".env file found" || echo ".env file missing"

# Verify API key is set (should not show the actual key)
grep -q "DEEPSEEK_API_KEY" backend/.env && echo "API key configured" || echo "API key not found"
```

## Step 5: Start the Development Servers

### Option A: Run Both Servers Together (Recommended)

From the project root:
```bash
npm run dev
```

This will start both the backend (port 3001) and frontend (port 3000) servers concurrently.

### Option B: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

## Step 6: Verify Servers Are Running

1. **Check backend health:**
   ```bash
   curl http://localhost:3001/health
   ```
   
   Expected response:
   ```json
   {"status":"ok","service":"PartSelect Chat Agent API"}
   ```

2. **Open the frontend:**
   - Open your web browser
   - Navigate to: http://localhost:3000
   - You should see the PartSelect Chat Assistant interface

## Step 7: Test the Application

Try these test queries in the chat interface:

1. **Product Search:**
   - "I need a water filter for my refrigerator"

2. **Compatibility:**
   - "Will part WP67001234 fit model RF28R7351SG?"

3. **Troubleshooting:**
   - "My ice maker is not working"

4. **Installation:**
   - "How do I install a water filter?"

## Troubleshooting

### Port Already in Use

If you see an error about ports 3000 or 3001 being in use:

**Option 1: Change the ports**

Edit `backend/.env`:
```env
PORT=3002  # Change to available port
```

Edit `frontend/vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to available port
  // ...
}
```

**Option 2: Kill the process using the port**

```bash
# Find process using port 3001
lsof -ti:3001

# Kill it (replace PID with actual process ID)
kill -9 <PID>
```

### DeepSeek API Errors

**Error: "DeepSeek API key not configured"**

- Verify `.env` file exists in `backend/` directory
- Check that `DEEPSEEK_API_KEY` is set in `.env`
- Ensure there are no extra spaces or quotes around the API key
- Restart the backend server after changing `.env`

**Error: "DeepSeek API error: Invalid API key"**

- Verify your API key is correct
- Check that you have credits/access in your DeepSeek account
- Ensure the API key hasn't expired

### Module Not Found Errors

If you see "Cannot find module" errors:

```bash
# Delete node_modules and reinstall
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

### CORS Errors

If you see CORS errors in the browser console:

- Ensure backend is running on the correct port (3001)
- Check that frontend proxy is configured in `vite.config.js`
- Verify backend CORS is enabled in `server.js`

### Frontend Not Loading

- Check that Vite dev server is running
- Verify port 3000 is not blocked by firewall
- Check browser console for errors
- Try clearing browser cache

## Production Build

### Frontend Build

```bash
cd frontend
npm run build
```

Built files will be in `frontend/dist/`

### Backend Production

```bash
cd backend
npm start
```

## Next Steps

- Review `EXAMPLE_QUERIES.md` for more test queries
- Read `ARCHITECTURE.md` for technical details
- Customize product data in `backend/src/data/products.js`
- Add more knowledge base entries in `backend/src/data/knowledgeBase.js`

## Getting Help

If you encounter issues not covered here:

1. Check the browser console for frontend errors
2. Check the terminal output for backend errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
5. Review the main README.md for additional information

## Security Notes

- Never commit `.env` files to version control
- Keep your API keys secure and private
- Rotate API keys if they are exposed
- Use environment-specific configurations for production
