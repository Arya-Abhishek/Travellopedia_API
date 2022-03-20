# Travellopedia_API
**Travellopedia** is a one place web application to search, view, plan journeys specifically adventurous tours and treks in northern part of India.

This is a backend API, of Travellopedia application to manage companies, tours, users, authentication, reviews.


This project consists of fully implementing the backend of such travel and tours website. The frontend/UI will be created in future mainly with Reactjs. Given below are the functionality which is fully implmented in this project.

### Company
- List all companies in the database
   * Pagination
   * Select specific fields in result with query params
   * Limit number of results
   * Filter by fields
- Search companies by radius from zipcode
  * Use a geocoder to get exact location and coords from a single address field
- Get single company
- Create new company
  * Authenticated users only
  * Must have the role "publisher" or "admin"
  * Only one company per publisher (admins can create more)
  * Field validation via Mongoose
- Upload a photo for company
  * Owner only
  * Photo will be uploaded to local filesystem
- Update companies
  * Owner only
  * Validation on update
- Delete company
  * Owner only

### Tours 
- Right now mainly consisting of trekking packages
- List all tours for company
- List all tours in general
  * Pagination, filtering, limiting the results etc
- Get single tour
- Create new tour
  * Authenticated users only
  * Must have the role "publisher" or "admin"
  * Only the owner or an admin can create a tour for a company
  * Publishers can create multiple tours
- Update tour
  * Owner only
- Delete tour
  * Owner only

### Users & Authentication
- Authentication will be done using JWT/cookies
  * JWT and cookie should expire in 30 days, for development but for production can expire in a day or maybe hours
- User registration
  * Register as a "user" or "publisher"
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
- Update user info
  * Authenticated user only
  * Separate route to update password
- Users can only be made admin by updating the database field manually