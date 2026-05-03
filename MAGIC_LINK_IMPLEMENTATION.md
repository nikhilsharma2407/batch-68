# Magic Link Login - Implementation

## Overview
Complete implementation of magic link authentication with email delivery. Users can request a passwordless login link that is sent to their registered email address.

## Server-Side Implementation

### Email Configuration (`server/utils/mailUtil.js`)
- Uses Nodemailer with Gmail service
- Requires environment variables:
  - `EMAIL_USERNAME`: Gmail address
  - `EMAIL_PASSWORD`: 16-character App Password (not regular password)

### Generate Magic Link Endpoint (`server/controllers/userController.js`)
**Endpoint**: `POST /user/generate-magic-link`

**Process**:
1. Receives username from request body
2. Finds user in database
3. Generates JWT token with 10-minute expiration
4. Creates magic link URL with token as query parameter
5. Sends email with both plain text and HTML versions
6. Returns success response

**Email Content**:
- Subject: "Your Magic Link for Login"
- Personalized greeting with username
- Styled HTML button with magic link
- Plain text fallback with copyable URL
- Security notice about 10-minute expiration
- Warning to ignore if not requested

### Login with Magic Link Endpoint (`server/controllers/userController.js`)
**Endpoint**: `GET /user/login-with-magic-link?authToken=<token>`

**Process**:
1. Extracts token from query parameter
2. Verifies JWT token (checks expiration and signature)
3. Retrieves user data
4. Sets httpOnly auth cookie for session
5. Returns sanitized user data

## Client-Side Implementation

### API Endpoints (`client/src/apiUtil.js`)
Added two new endpoints:
- `GENERATE_MAGIC_LINK`: `/user/generate-magic-link`
- `LOGIN_WITH_MAGIC_LINK`: `/user/login-with-magic-link`

### Login Component (`client/src/Login.jsx`)
Enhanced with magic link request functionality:

**Features**:
- Toggle between regular login and magic link request
- Simple form requiring only username
- Info alert explaining the magic link process
- Loading state during email sending
- Success/error toast notifications
- Automatic return to login after successful email send

**UI Flow**:
1. User clicks "Login with Magic Link"
2. Enters username
3. Clicks "Generate Magic Link"
4. Receives confirmation that email was sent
5. Returns to login screen

### App Component (`client/src/App.jsx`)
Handles automatic authentication from magic link:

**Magic Link Authentication**:
- Uses TanStack Query for consistent API handling
- Detects `authToken` query parameter in URL
- Automatically authenticates when token is present
- Handles success and error cases separately
- Cleans up URL by removing token after use
- Redirects appropriately (home on success, login on failure)
- Prevents race condition with regular cookie-based auth

## Complete User Flow

### Requesting Magic Link:
1. User navigates to login page
2. Clicks "Login with Magic Link"
3. Enters username
4. Clicks "Generate Magic Link"
5. Receives toast notification: "Magic link sent to your email"
6. Returns to login screen

### Using Magic Link:
1. User checks email inbox
2. Opens email with subject "Your Magic Link for Login"
3. Clicks the blue "Login to Your Account" button (or copies URL)
4. Browser opens with magic link URL
5. App detects token and authenticates automatically
6. User is logged in and redirected to home page
7. Auth cookie is set for persistent session

## Security Features

### Token Security:
- JWT tokens expire after 10 minutes
- Tokens are signed with SECRET_KEY
- One-time use (though technically reusable within 10 minutes)
- Token removed from URL after authentication attempt

### Email Security:
- Sent to user's registered email address only
- Warning message if user didn't request the link
- Clear expiration notice

### Session Security:
- HttpOnly cookies prevent XSS attacks
- Secure token verification on server
- Failed authentication redirects to login

## Environment Variables Required

```env
# Email Configuration
EMAIL_USERNAME=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password

# Application URLs
CLIENT_URL=http://localhost:5173
SECRET_KEY=your-jwt-secret-key
```

## Testing the Feature

### Prerequisites:
1. Set up Gmail App Password:
   - Enable 2FA on Gmail account
   - Generate App Password in Google Account settings
   - Add to `.env` file

2. Ensure user has email in database:
   - User model must have `email` field
   - Email must be valid and accessible

### Test Steps:
1. Start server: `npm start` (in server directory)
2. Start client: `npm run dev` (in client directory)
3. Navigate to login page
4. Click "Login with Magic Link"
5. Enter valid username
6. Click "Generate Magic Link"
7. Check email inbox
8. Click link in email
9. Verify automatic login and redirect

## Error Handling

### Server-Side:
- User not found: Returns error from `UserModel.findUser()`
- Email send failure: Caught and passed to error handler
- Invalid token: Returns 401 with message "This login link is no longer valid"
- Expired token: JWT verification fails, returns error

### Client-Side:
- Missing username: Toast error "Please enter your username"
- Email send failure: Toast error with server message
- Invalid/expired token: Toast error, redirect to login
- Network errors: Handled by TanStack Query

## Dependencies

### Server:
- `nodemailer`: Email sending
- `jsonwebtoken`: Token generation and verification
- `express`: Web framework

### Client:
- `@tanstack/react-query`: API state management
- `react-router`: URL parameter handling
- `react-bootstrap`: UI components
- `react-toastify`: Notifications
- `axios`: HTTP client

## Notes

- Magic links are sent via email, not displayed in UI (more secure)
- Links expire after 10 minutes (configurable in `generateToken()`)
- Email template is responsive and mobile-friendly
- Works with Gmail; other providers may need different configuration
- User must have valid email address in database
